import { NextResponse } from 'next/server'
import { translateText, detectLanguage, isTranslationAvailable } from '@/lib/translation/translate'
import { z } from 'zod'

const translateSchema = z.object({
  text: z.string().min(1),
  targetLang: z.enum(['en', 'am']),
})

export async function POST(request: Request) {
  try {
    if (!isTranslationAvailable()) {
      return NextResponse.json(
        { 
          error: 'Translation service not configured',
          text: '', // Return empty to signal unavailable
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const validated = translateSchema.parse(body)

    const result = await translateText(validated.text, validated.targetLang)

    return NextResponse.json({
      original: validated.text,
      translated: result.translated,
      sourceLang: result.sourceLang,
      targetLang: validated.targetLang,
    })
  } catch (error: any) {
    console.error('POST /api/translate error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}

// GET: Check translation service status
export async function GET() {
  return NextResponse.json({
    available: isTranslationAvailable(),
    supportedLanguages: ['en', 'am'],
  })
}
