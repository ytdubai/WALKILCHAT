import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
      else window.location.href = '/login'
    })

    // Load messages
    loadMessages()

    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const loadMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(50)
    if (data) setMessages(data)
  }

  const sendMessage = async () => {
    if (!input.trim() || !user) return
    setLoading(true)
    
    await supabase.from('messages').insert({
      user_id: user.id,
      content: input,
      sender_name: user.user_metadata?.name || 'You'
    })
    
    setInput('')
    setLoading(false)

    // AI auto-reply (simple for now)
    setTimeout(async () => {
      await supabase.from('messages').insert({
        user_id: 'ai',
        content: `Thanks for your message! This is WakilChat AI. You said: "${input}"`,
        sender_name: 'Wakil AI'
      })
    }, 1000)
  }

  return (
    <>
      <Head><title>Chat - WakilChat</title></Head>
      <div className="h-screen bg-gray-900 flex flex-col">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">WakilChat</h1>
          <button onClick={() => { supabase.auth.signOut(); window.location.href = '/login' }} className="text-gray-400 hover:text-white">Logout</button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && <p className="text-gray-500 text-center">No messages yet. Say hi!</p>}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.user_id === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.user_id === user?.id ? 'bg-purple-600' : 'bg-gray-700'} text-white`}>
                <p className="text-xs text-gray-300 mb-1">{m.sender_name}</p>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 p-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..." className="flex-1 bg-gray-700 text-white rounded-full px-4 py-3" />
          <button onClick={sendMessage} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold">
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </>
  )
}
