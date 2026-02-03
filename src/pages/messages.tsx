import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useAuth } from '../lib/providers/AuthProvider';
import { ConversationList } from '../components/messages/ConversationList';
import { MessageBubble } from '../components/messages/MessageBubble';
import { MessageInput } from '../components/messages/MessageInput';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  sender_id: string;
  created_at: string;
  is_ai_response: boolean;
  read_at: string | null;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    online?: boolean;
  };
  lastMessage: {
    text: string;
    time: Date;
    isRead: boolean;
    sender: string;
  };
  unreadCount?: number;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      loadConversations();
      
      // Subscribe to conversations
      const subscription = supabase
        .channel('conversations')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'conversations',
            filter: `participant_ids=cs.{${user.id}}`,
          },
          () => {
            loadConversations();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user]);

  useEffect(() => {
    if (!selectedConversation) return;

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages:${selectedConversation}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation}`,
        },
        (payload) => {
          if (payload.new) {
            setMessages((prev) => [...prev, payload.new as Message]);
          }
        }
      )
      .subscribe();

    // Load existing messages
    loadMessages(selectedConversation);

    // Mark messages as read
    markMessagesAsRead(selectedConversation);

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, profiles!participant_ids(*)')
      .contains('participant_ids', [user?.id]);

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    const formattedConversations = data.map((conv) => ({
      id: conv.id,
      participant: {
        id: conv.profiles.id,
        name: conv.profiles.full_name,
        avatar: conv.profiles.avatar_url,
        online: false,
      },
      lastMessage: {
        text: conv.last_message || 'New conversation',
        time: new Date(conv.last_message_at || conv.created_at),
        isRead: true,
        sender: conv.last_message_sender_id === user?.id ? 'me' : 'them',
      },
    }));

    setConversations(formattedConversations);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages(data);
  };

  const markMessagesAsRead = async (conversationId: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('sender_id', user?.id)
      .is('read_at', null);

    if (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedConversation || !user) return;

    const message = {
      conversation_id: selectedConversation,
      sender_id: user.id,
      text,
      is_ai_response: false,
    };

    const { error } = await supabase.from('messages').insert([message]);

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Messages - WakilChat</title>
      </Head>

      <div className="h-screen bg-gray-900 flex">
        {/* Conversation List */}
        <div
          className={`w-full md:w-96 bg-gray-800 border-r border-gray-700 ${
            selectedConversation ? 'hidden md:block' : ''
          }`}
        >
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Messages Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  className="md:hidden text-gray-400 hover:text-white"
                  onClick={() => setSelectedConversation(undefined)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-white font-medium">
                    {
                      conversations.find((c) => c.id === selectedConversation)
                        ?.participant.name
                    }
                  </h2>
                  {typingUsers.size > 0 && (
                    <p className="text-sm text-gray-400">typing...</p>
                  )}
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isAIEnabled
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
                onClick={() => setIsAIEnabled(!isAIEnabled)}
              >
                🤖 AI {isAIEnabled ? 'On' : 'Off'}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  text={message.text}
                  time={new Date(message.created_at)}
                  isMe={message.sender_id === user?.id}
                  isRead={!!message.read_at}
                  isAI={message.is_ai_response}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput
              onSend={handleSendMessage}
              onTyping={() => {}}
              onStopTyping={() => {}}
            />
          </div>
        ) : (
          // No conversation selected - show on desktop only
          <div className="flex-1 hidden md:flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-white text-xl font-medium mb-2">
                Your Messages
              </h2>
              <p className="text-gray-400">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}