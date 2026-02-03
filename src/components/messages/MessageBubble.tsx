import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
  text: string;
  time: Date;
  isMe: boolean;
  isRead?: boolean;
  isAI?: boolean;
}

export function MessageBubble({
  text,
  time,
  isMe,
  isRead,
  isAI,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex flex-col ${
        isMe ? 'items-end' : 'items-start'
      } max-w-[75%]`}
    >
      <div
        className={`rounded-2xl px-4 py-2 ${
          isMe
            ? 'bg-purple-600 text-white'
            : isAI
            ? 'bg-purple-900/30 text-white border border-purple-500/20'
            : 'bg-gray-700 text-white'
        }`}
      >
        {text}
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
        <time>{formatDistanceToNow(time, { addSuffix: true })}</time>
        {isMe && (
          <span className={isRead ? 'text-purple-400' : ''}>
            {isRead ? '✓✓' : '✓'}
          </span>
        )}
      </div>
    </div>
  );
}