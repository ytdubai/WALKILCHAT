import { useRouter } from 'next/router';
import { Phone, Video } from 'lucide-react';

interface MessageHeaderProps {
  participant: {
    id: string;
    name: string;
    avatar?: string;
    online?: boolean;
  };
  onBack?: () => void;
  isTyping?: boolean;
}

export function MessageHeader({
  participant,
  onBack,
  isTyping,
}: MessageHeaderProps) {
  const router = useRouter();

  const initiateCall = (type: 'voice' | 'video') => {
    router.push(`/call?userId=${participant.id}&type=${type}`);
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={onBack}
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
        )}
        <div>
          <h2 className="text-white font-medium">{participant.name}</h2>
          {isTyping && <p className="text-sm text-gray-400">typing...</p>}
          {participant.online && (
            <div className="flex items-center gap-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-400">Online</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Voice Call Button */}
        <button
          onClick={() => initiateCall('voice')}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
        >
          <Phone size={20} />
        </button>

        {/* Video Call Button */}
        <button
          onClick={() => initiateCall('video')}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
        >
          <Video size={20} />
        </button>
      </div>
    </div>
  );
}