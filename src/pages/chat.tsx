import { useState } from 'react'
import Head from 'next/head'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to WakilChat!', sent: false },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), text: input, sent: true }])
    setInput('')
  }

  return (
    <>
      <Head><title>Chat - WakilChat</title></Head>
      <div className="h-screen bg-gray-900 flex flex-col">
        <header className="bg-gray-800 p-4">
          <h1 className="text-xl font-bold text-white">WakilChat</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.sent ? 'bg-purple-600' : 'bg-gray-700'} text-white`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()}
            placeholder="Type a message..." className="flex-1 bg-gray-700 text-white rounded-full px-4 py-3" />
          <button onClick={send} className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Send</button>
        </div>
      </div>
    </>
  )
}
