import { useState } from 'react';
import { Button } from '../ui/Button';

interface MessageInputProps {
  onSend: (text: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export function MessageInput({
  onSend,
  onTyping,
  onStopTyping,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  let typingTimeout: number;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      onTyping();
    }

    // Clear existing timeout
    if (typingTimeout) window.clearTimeout(typingTimeout);

    // Set new timeout
    typingTimeout = window.setTimeout(() => {
      setIsTyping(false);
      onStopTyping();
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      setIsTyping(false);
      onStopTyping();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t border-gray-700"
    >
      <button
        type="button"
        className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
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
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={message}
        onChange={handleChange}
      />

      <Button type="submit" disabled={!message.trim()}>
        Send
      </Button>
    </form>
  );
}