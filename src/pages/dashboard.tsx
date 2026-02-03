import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('User')
  const [stats, setStats] = useState({
    totalMessages: 0,
    activeChats: 0,
    aiResponses: 0
  })
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Marketing Strategy Discussion', time: '2 hours ago' },
    { id: 2, title: 'Product Launch Planning', time: '5 hours ago' },
    { id: 3, title: 'Customer Support Analysis', time: '1 day ago' }
  ])

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      totalMessages: 150,
      activeChats: 3,
      aiResponses: 127
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <Head><title>Dashboard - WakilChat</title></Head>
      <div className="min-h-screen bg-gray-900 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {userName}</h1>
            <p className="text-gray-400">Here's an overview of your WakilChat activity</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-gray-300">Total Messages</span>
            </div>
            <span className="text-3xl font-bold text-white">{stats.totalMessages}</span>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-gray-300">Active Chats</span>
            </div>
            <span className="text-3xl font-bold text-white">{stats.activeChats}</span>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">AI Responses</span>
            </div>
            <span className="text-3xl font-bold text-white">{stats.aiResponses}</span>
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Conversations</h2>
          <div className="space-y-4">
            {conversations.map(conv => (
              <div key={conv.id} className="flex justify-between items-center hover:bg-gray-700 p-3 rounded-lg cursor-pointer">
                <span className="text-white">{conv.title}</span>
                <span className="text-gray-400 text-sm">{conv.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}