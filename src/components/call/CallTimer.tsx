import { useEffect, useState } from 'react';

interface CallTimerProps {
  startTime: Date;
}

export function CallTimer({ startTime }: CallTimerProps) {
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date().getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setDuration(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
      {duration}
    </div>
  );
}