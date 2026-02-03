import { useRouter } from 'next/router';
import { Button } from '../../lib/components/Button';

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

  const startCall = (type: 'voice' | 'video') => {
    const callId = Math.random().toString(36).substr(2, 9);
    router.push(
      `/call?callId=${callId}&targetId=${participant.id}&type=${type}`
    );
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
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
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="w-10 h-10 rounded-full"
          onClick={() => startCall('voice')}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </Button>

        <Button
          variant="secondary"
          className="w-10 h-10 rounded-full"
          onClick={() => startCall('video')}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}