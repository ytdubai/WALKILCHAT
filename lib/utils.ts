import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Ethiopian format: +251 9XX XXX XXX
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('251')) {
    const number = cleaned.slice(3)
    return `+251 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
  }
  
  if (cleaned.startsWith('0')) {
    const number = cleaned.slice(1)
    return `+251 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
  }
  
  return `+251 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
}

export function validateEthiopianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  
  // Should be 12 digits starting with 251 or 10 digits starting with 09
  if (cleaned.startsWith('251')) {
    return cleaned.length === 12 && cleaned[3] === '9'
  }
  
  if (cleaned.startsWith('09')) {
    return cleaned.length === 10
  }
  
  return false
}

export function formatCurrency(amount: number, currency: string = 'ETB'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return formatDate(date)
}
