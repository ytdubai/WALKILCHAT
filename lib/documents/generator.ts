/**
 * AI Document Generation for WakilChat™
 * Generates trade documents: Proforma Invoices, Contracts, Packing Lists
 */

export interface DocumentData {
  // Parties
  seller: {
    name: string
    businessName?: string
    address?: string
    phone?: string
    email?: string
  }
  buyer: {
    name: string
    businessName?: string
    address?: string
    phone?: string
    email?: string
  }
  
  // Product/Deal Details
  productTitle: string
  productDescription?: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  currency: string
  
  // Dates
  issueDate: Date
  validUntil?: Date
  deliveryDate?: Date
  
  // Additional
  paymentTerms?: string
  deliveryTerms?: string
  notes?: string
}

/**
 * Generate Proforma Invoice (HTML)
 */
export function generateProformaInvoice(data: DocumentData): string {
  const invoiceNumber = `PI-${Date.now()}`
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Proforma Invoice - ${invoiceNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #D4A853;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #D4A853;
      margin: 0;
    }
    .parties {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .party {
      flex: 1;
    }
    .party h3 {
      color: #D4A853;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #D4A853;
      color: white;
    }
    .total {
      text-align: right;
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
      color: #D4A853;
    }
    .terms {
      margin-top: 30px;
      padding: 15px;
      background-color: #f9f9f9;
      border-left: 3px solid #D4A853;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>PROFORMA INVOICE</h1>
    <p><strong>Invoice No:</strong> ${invoiceNumber}</p>
    <p><strong>Date:</strong> ${data.issueDate.toLocaleDateString()}</p>
    ${data.validUntil ? `<p><strong>Valid Until:</strong> ${data.validUntil.toLocaleDateString()}</p>` : ''}
  </div>

  <div class="parties">
    <div class="party">
      <h3>SELLER</h3>
      <p><strong>${data.seller.businessName || data.seller.name}</strong></p>
      ${data.seller.address ? `<p>${data.seller.address}</p>` : ''}
      ${data.seller.phone ? `<p>Phone: ${data.seller.phone}</p>` : ''}
      ${data.seller.email ? `<p>Email: ${data.seller.email}</p>` : ''}
    </div>

    <div class="party">
      <h3>BUYER</h3>
      <p><strong>${data.buyer.businessName || data.buyer.name}</strong></p>
      ${data.buyer.address ? `<p>${data.buyer.address}</p>` : ''}
      ${data.buyer.phone ? `<p>Phone: ${data.buyer.phone}</p>` : ''}
      ${data.buyer.email ? `<p>Email: ${data.buyer.email}</p>` : ''}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>${data.productTitle}</strong>
          ${data.productDescription ? `<br><small>${data.productDescription}</small>` : ''}
        </td>
        <td>${data.quantity} ${data.unit}</td>
        <td>${data.unitPrice.toLocaleString()} ${data.currency}</td>
        <td><strong>${data.totalPrice.toLocaleString()} ${data.currency}</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="total">
    TOTAL: ${data.totalPrice.toLocaleString()} ${data.currency}
  </div>

  ${data.paymentTerms || data.deliveryTerms ? `
  <div class="terms">
    ${data.paymentTerms ? `<p><strong>Payment Terms:</strong> ${data.paymentTerms}</p>` : ''}
    ${data.deliveryTerms ? `<p><strong>Delivery Terms:</strong> ${data.deliveryTerms}</p>` : ''}
    ${data.deliveryDate ? `<p><strong>Expected Delivery:</strong> ${data.deliveryDate.toLocaleDateString()}</p>` : ''}
  </div>
  ` : ''}

  ${data.notes ? `
  <div class="terms">
    <p><strong>Additional Notes:</strong></p>
    <p>${data.notes}</p>
  </div>
  ` : ''}

  <div class="footer">
    <p>Generated via WakilChat™ - Africa's Voice, Amplified</p>
    <p>This proforma invoice is for estimation purposes and subject to final agreement</p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate Sales Contract (HTML)
 */
export function generateContract(data: DocumentData): string {
  const contractNumber = `CONTRACT-${Date.now()}`
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sales Contract - ${contractNumber}</title>
  <style>
    body {
      font-family: 'Times New Roman', serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #D4A853;
      border-bottom: 2px solid #D4A853;
      padding-bottom: 10px;
    }
    .section {
      margin: 20px 0;
    }
    .section-title {
      font-weight: bold;
      color: #D4A853;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .signatures {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
    }
    .signature-block {
      text-align: center;
    }
    .signature-line {
      border-top: 1px solid #333;
      margin-top: 50px;
      padding-top: 5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SALES CONTRACT</h1>
    <p><strong>Contract No:</strong> ${contractNumber}</p>
    <p><strong>Date:</strong> ${data.issueDate.toLocaleDateString()}</p>
  </div>

  <div class="section">
    <p>This Sales Contract ("Agreement") is entered into on ${data.issueDate.toLocaleDateString()}, 
    between:</p>
  </div>

  <div class="section">
    <p class="section-title">SELLER:</p>
    <p>${data.seller.businessName || data.seller.name}</p>
    ${data.seller.address ? `<p>${data.seller.address}</p>` : ''}
    <p>(hereinafter referred to as "Seller")</p>
  </div>

  <div class="section">
    <p class="section-title">BUYER:</p>
    <p>${data.buyer.businessName || data.buyer.name}</p>
    ${data.buyer.address ? `<p>${data.buyer.address}</p>` : ''}
    <p>(hereinafter referred to as "Buyer")</p>
  </div>

  <div class="section">
    <p class="section-title">1. PRODUCT DESCRIPTION:</p>
    <p><strong>Product:</strong> ${data.productTitle}</p>
    ${data.productDescription ? `<p><strong>Description:</strong> ${data.productDescription}</p>` : ''}
    <p><strong>Quantity:</strong> ${data.quantity} ${data.unit}</p>
  </div>

  <div class="section">
    <p class="section-title">2. PRICE AND PAYMENT:</p>
    <p><strong>Unit Price:</strong> ${data.unitPrice.toLocaleString()} ${data.currency} per ${data.unit}</p>
    <p><strong>Total Contract Value:</strong> ${data.totalPrice.toLocaleString()} ${data.currency}</p>
    ${data.paymentTerms ? `<p><strong>Payment Terms:</strong> ${data.paymentTerms}</p>` : ''}
  </div>

  <div class="section">
    <p class="section-title">3. DELIVERY:</p>
    ${data.deliveryDate ? `<p><strong>Expected Delivery Date:</strong> ${data.deliveryDate.toLocaleDateString()}</p>` : ''}
    ${data.deliveryTerms ? `<p><strong>Delivery Terms:</strong> ${data.deliveryTerms}</p>` : ''}
  </div>

  <div class="section">
    <p class="section-title">4. GENERAL TERMS:</p>
    <ul>
      <li>The Seller warrants that the goods are of merchantable quality and fit for the purpose intended.</li>
      <li>The Buyer agrees to inspect the goods upon delivery and report any defects within 7 days.</li>
      <li>Both parties agree to comply with all applicable laws and regulations.</li>
      <li>This agreement shall be governed by the laws of Ethiopia.</li>
    </ul>
  </div>

  ${data.notes ? `
  <div class="section">
    <p class="section-title">5. ADDITIONAL TERMS:</p>
    <p>${data.notes}</p>
  </div>
  ` : ''}

  <div class="signatures">
    <div class="signature-block">
      <div class="signature-line">
        <p><strong>SELLER</strong></p>
        <p>${data.seller.businessName || data.seller.name}</p>
      </div>
    </div>

    <div class="signature-block">
      <div class="signature-line">
        <p><strong>BUYER</strong></p>
        <p>${data.buyer.businessName || data.buyer.name}</p>
      </div>
    </div>
  </div>

  <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
    <p>Generated via WakilChat™</p>
    <p>This is a legally binding document. Please review carefully before signing.</p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate Packing List (HTML)
 */
export function generatePackingList(data: DocumentData): string {
  const packingListNumber = `PL-${Date.now()}`
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Packing List - ${packingListNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #D4A853;
      padding-bottom: 20px;
    }
    h1 { color: #D4A853; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #D4A853;
      color: white;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>PACKING LIST</h1>
    <p><strong>Packing List No:</strong> ${packingListNumber}</p>
    <p><strong>Date:</strong> ${data.issueDate.toLocaleDateString()}</p>
  </div>

  <p><strong>Shipper:</strong> ${data.seller.businessName || data.seller.name}</p>
  <p><strong>Consignee:</strong> ${data.buyer.businessName || data.buyer.name}</p>
  ${data.deliveryDate ? `<p><strong>Shipment Date:</strong> ${data.deliveryDate.toLocaleDateString()}</p>` : ''}

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Remarks</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${data.productTitle}</td>
        <td>${data.quantity}</td>
        <td>${data.unit}</td>
        <td>${data.notes || '-'}</td>
      </tr>
    </tbody>
  </table>

  <p><strong>Total Packages:</strong> 1</p>
  <p><strong>Total Quantity:</strong> ${data.quantity} ${data.unit}</p>

  <div style="margin-top: 40px; font-size: 12px; color: #666;">
    <p>Generated via WakilChat™</p>
  </div>
</body>
</html>
  `.trim()
}
