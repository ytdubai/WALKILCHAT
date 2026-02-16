'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useSocket } from '@/lib/socket/client'
import { createClient } from '@/lib/supabase/client'

type Message = {
  id: string
  content: string
  senderId: string
  createdAt: string
  sender: {
    id: string
    firstName: string | null
    lastName: string | null
    avatar: string | null
  }
}

type Deal = {
  id: string
  dealName: string
  status: string
  stage: string
  match: {
    product: {
      title: string
      price: number
      currency: string
    }
    seller: {
      id: string
      firstName: string | null
      lastName: string | null
      businessName: string | null
    }
  }
  buyer: {
    id: string
    firstName: string | null
    lastName: string | null
    businessName: string | null
  }
}

export default function DealChatPage() {
  const params = useParams()
  const dealId = params.id as string
  const { socket, isConnected } = useSocket()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [translationEnabled, setTranslationEnabled] = useState(true)
  const [translatedMessages, setTranslatedMessages] = useState<Record<string, string>>({})
  const [translating, setTranslating] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadDeal()
    loadMessages()
    getCurrentUser()
  }, [dealId])

  useEffect(() => {
    if (socket && dealId) {
      // Join deal room
      socket.emit('join:deal', dealId)

      // Listen for new messages
      socket.on('message:new', (message: Message) => {
        setMessages(prev => [...prev, message])
      })

      // Listen for typing indicators
      socket.on('typing:user', ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
        if (userId !== currentUserId) {
          setOtherUserTyping(isTyping)
        }
      })

      return () => {
        socket.emit('leave:deal', dealId)
        socket.off('message:new')
        socket.off('typing:user')
      }
    }
  }, [socket, dealId, currentUserId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getCurrentUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) setCurrentUserId(user.id)
  }

  const loadDeal = async () => {
    try {
      const response = await fetch(`/api/deals/${dealId}`)
      const data = await response.json()
      setDeal(data)
    } catch (error) {
      console.error('Failed to load deal:', error)
    }
  }

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/deals/${dealId}/messages`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleTyping = () => {
    if (!isTyping && socket && currentUserId) {
      setIsTyping(true)
      socket.emit('typing:start', { dealId, userId: currentUserId })
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      if (socket && currentUserId) {
        socket.emit('typing:stop', { dealId, userId: currentUserId })
      }
    }, 2000)
  }

  const translateMessage = async (messageId: string, text: string) => {
    if (translatedMessages[messageId]) {
      // Toggle off translation (show original)
      setTranslatedMessages(prev => {
        const newState = { ...prev }
        delete newState[messageId]
        return newState
      })
      return
    }

    setTranslating(messageId)
    try {
      // Detect if Amharic or English, translate to opposite
      const amharicPattern = /[\u1200-\u137F]/
      const isAmharic = amharicPattern.test(text)
      const targetLang = isAmharic ? 'en' : 'am'

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      })

      if (response.ok) {
        const data = await response.json()
        setTranslatedMessages(prev => ({
          ...prev,
          [messageId]: data.translated,
        }))
      }
    } catch (error) {
      console.error('Translation failed:', error)
    } finally {
      setTranslating(null)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !socket || !currentUserId) return

    socket.emit('message:send', {
      dealId,
      senderId: currentUserId,
      content: newMessage.trim(),
      contentType: 'TEXT',
    })

    setNewMessage('')
    setIsTyping(false)
    if (socket) {
      socket.emit('typing:stop', { dealId, userId: currentUserId })
    }
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 flex-shrink-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/deals" className="text-muted-foreground hover:text-foreground">
              ← Back
            </Link>
            <div>
              <h1 className="font-semibold">{deal.dealName}</h1>
              <div className="text-xs text-muted-foreground">
                {deal.match.product.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${deal.status === 'NEGOTIATING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
              ${deal.status === 'AGREEMENT_REACHED' ? 'bg-green-500/20 text-green-500' : ''}
            `}>
              {deal.status.replace(/_/g, ' ')}
            </div>

            <button
              onClick={() => setTranslationEnabled(!translationEnabled)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${translationEnabled
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-secondary text-muted-foreground border border-border'
                }
              `}
              title="Toggle auto-translation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {translationEnabled ? 'Translation ON' : 'Translation OFF'}
            </button>

            {isConnected ? (
              <div className="w-2 h-2 bg-green-500 rounded-full" title="Connected" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" title="Disconnected" />
            )}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="container mx-auto max-w-4xl">
          {messages.map(message => {
            const isOwn = message.senderId === currentUserId
            const hasTranslation = translatedMessages[message.id]
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`
                  max-w-[70%] rounded-lg p-4
                  ${isOwn
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                  }
                `}>
                  {!isOwn && (
                    <div className="text-xs font-medium mb-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </div>
                  )}
                  
                  <div className="text-sm mb-2">
                    {hasTranslation ? translatedMessages[message.id] : message.content}
                  </div>

                  {hasTranslation && (
                    <div className="text-xs opacity-70 mb-2 pb-2 border-t border-current/20 pt-2">
                      Original: {message.content}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className={`text-xs ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>

                    {translationEnabled && (
                      <button
                        onClick={() => translateMessage(message.id, message.content)}
                        disabled={translating === message.id}
                        className={`text-xs flex items-center gap-1 ${
                          isOwn ? 'text-primary-foreground/70 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                        } transition-colors disabled:opacity-50`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        {translating === message.id ? '...' : hasTranslation ? 'Original' : 'Translate'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {otherUserTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-secondary text-foreground rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-card/50 flex-shrink-0">
        <div className="container mx-auto max-w-4xl p-4">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value)
                handleTyping()
              }}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
