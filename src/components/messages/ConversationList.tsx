import { useState } from 'react';
import { Avatar } from '../../lib/components/Avatar';
import { formatDistanceToNow } from 'date-fns';

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

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            className={`w-full text-left p-4 flex items-center gap-4 hover:bg-gray-700/50 transition-colors ${
              selectedId === conv.id ? 'bg-gray-700' : ''
            }`}
            onClick={() => onSelect(conv.id)}
          >
            <div className="relative">
              <Avatar
                src={conv.participant.avatar}
                fallback={conv.participant.name}
                size="lg"
              />
              {conv.participant.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium truncate">
                  {conv.participant.name}
                </span>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(conv.lastMessage.time, { addSuffix: true })}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-400 truncate">
                  {conv.lastMessage.sender === 'me' && 'You: '}
                  {conv.lastMessage.text}
                </span>
                {conv.unreadCount ? (
                  <span className="ml-2 bg-purple-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {conv.unreadCount}
                  </span>
                ) : conv.lastMessage.isRead && conv.lastMessage.sender === 'me' ? (
                  <span className="ml-2 text-purple-400">✓✓</span>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}