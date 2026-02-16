/**
 * Translation Service for WakilChat™
 * Supports Amharic ↔ English translation
 * Uses Google Cloud Translation API (with fallback)
 */

import { v2 } from '@google-cloud/translate'

// Initialize Google Translate (will use API key from env)
let translate: v2.Translate | null = null

try {
  if (process.env.GOOGLE_CLOUD_TRANSLATE_KEY) {
    translate = new v2.Translate({
      key: process.env.GOOGLE_CLOUD_TRANSLATE_KEY,
    })
  }
} catch (error) {
  console.error('Google Translate initialization failed:', error)
}

/**
 * Detect language of text
 */
export async function detectLanguage(text: string): Promise<string> {
  if (!translate || !text.trim()) {
    return 'unknown'
  }

  try {
    const [detection] = await translate.detect(text)
    return Array.isArray(detection) ? detection[0].language : detection.language
  } catch (error) {
    console.error('Language detection failed:', error)
    // Fallback: simple heuristic
    const amharicPattern = /[\u1200-\u137F]/
    return amharicPattern.test(text) ? 'am' : 'en'
  }
}

/**
 * Translate text between Amharic and English
 */
export async function translateText(
  text: string,
  targetLang: 'en' | 'am'
): Promise<{ translated: string; sourceLang: string }> {
  if (!text.trim()) {
    return { translated: text, sourceLang: 'unknown' }
  }

  // If no API key, return original text (graceful degradation)
  if (!translate) {
    console.warn('Translation API not configured, returning original text')
    return { translated: text, sourceLang: 'unknown' }
  }

  try {
    const [translations] = await translate.translate(text, targetLang)
    const translatedText = Array.isArray(translations) ? translations[0] : translations

    // Detect source language
    const sourceLang = await detectLanguage(text)

    return {
      translated: translatedText,
      sourceLang,
    }
  } catch (error) {
    console.error('Translation failed:', error)
    return { translated: text, sourceLang: 'unknown' }
  }
}

/**
 * Auto-translate: Detect language and translate to opposite
 */
export async function autoTranslate(text: string): Promise<{
  original: string
  translated: string
  sourceLang: string
  targetLang: string
}> {
  const sourceLang = await detectLanguage(text)
  
  // If Amharic, translate to English; if English, translate to Amharic
  const targetLang = sourceLang === 'am' ? 'en' : 'am'
  
  const { translated } = await translateText(text, targetLang)

  return {
    original: text,
    translated,
    sourceLang,
    targetLang,
  }
}

/**
 * Batch translate multiple texts
 */
export async function batchTranslate(
  texts: string[],
  targetLang: 'en' | 'am'
): Promise<Array<{ original: string; translated: string }>> {
  if (!translate || texts.length === 0) {
    return texts.map(text => ({ original: text, translated: text }))
  }

  try {
    const [translations] = await translate.translate(texts, targetLang)
    const translatedTexts = Array.isArray(translations) ? translations : [translations]

    return texts.map((original, index) => ({
      original,
      translated: translatedTexts[index] || original,
    }))
  } catch (error) {
    console.error('Batch translation failed:', error)
    return texts.map(text => ({ original: text, translated: text }))
  }
}

/**
 * Check if translation service is available
 */
export function isTranslationAvailable(): boolean {
  return translate !== null
}
