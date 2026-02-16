import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { generateProformaInvoice, generateContract, generatePackingList, DocumentData } from '@/lib/documents/generator'
import { z } from 'zod'

const generateDocumentSchema = z.object({
  dealId: z.string().uuid(),
  documentType: z.enum(['PROFORMA_INVOICE', 'CONTRACT', 'PACKING_LIST']),
  paymentTerms: z.string().optional(),
  deliveryTerms: z.string().optional(),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validated = generateDocumentSchema.parse(body)

    // Get deal details
    const deal = await prisma.deal.findUnique({
      where: { id: validated.dealId },
      include: {
        match: {
          include: {
            product: {
              include: {
                user: true,
              },
            },
            buyRequest: true,
            seller: true,
          },
        },
        buyer: true,
      },
    })

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      )
    }

    // Verify user is part of deal
    if (deal.buyerId !== user.id && deal.match.sellerId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Prepare document data
    const documentData: DocumentData = {
      seller: {
        name: `${deal.match.seller.firstName} ${deal.match.seller.lastName}`,
        businessName: deal.match.seller.businessName || undefined,
        email: deal.match.seller.email || undefined,
        phone: deal.match.seller.phone || undefined,
      },
      buyer: {
        name: `${deal.buyer.firstName} ${deal.buyer.lastName}`,
        businessName: deal.buyer.businessName || undefined,
        email: deal.buyer.email || undefined,
        phone: deal.buyer.phone || undefined,
      },
      productTitle: deal.match.product.title,
      productDescription: deal.match.product.description,
      quantity: deal.quantity || deal.match.product.quantity,
      unit: deal.unit || deal.match.product.unit,
      unitPrice: deal.agreedPrice || deal.match.product.price,
      totalPrice: (deal.agreedPrice || deal.match.product.price) * (deal.quantity || 1),
      currency: deal.currency || deal.match.product.currency,
      issueDate: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      deliveryDate: validated.deliveryDate ? new Date(validated.deliveryDate) : undefined,
      paymentTerms: validated.paymentTerms,
      deliveryTerms: validated.deliveryTerms,
      notes: validated.notes,
    }

    // Generate document HTML
    let html: string
    switch (validated.documentType) {
      case 'PROFORMA_INVOICE':
        html = generateProformaInvoice(documentData)
        break
      case 'CONTRACT':
        html = generateContract(documentData)
        break
      case 'PACKING_LIST':
        html = generatePackingList(documentData)
        break
    }

    // Save document record
    const document = await prisma.document.create({
      data: {
        dealId: validated.dealId,
        uploaderId: user.id,
        filename: `${validated.documentType.toLowerCase()}_${Date.now()}.html`,
        originalName: `${validated.documentType.replace(/_/g, ' ')} - ${deal.dealName}`,
        fileUrl: '', // Would store in Supabase Storage in production
        fileType: 'text/html',
        fileSize: Buffer.byteLength(html, 'utf8'),
        documentType: validated.documentType as any,
        description: `Generated ${validated.documentType.replace(/_/g, ' ').toLowerCase()}`,
        status: 'VERIFIED',
      },
    })

    return NextResponse.json({
      document,
      html,
      downloadUrl: `/api/documents/${document.id}/download`,
    }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/documents/generate error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    )
  }
}
