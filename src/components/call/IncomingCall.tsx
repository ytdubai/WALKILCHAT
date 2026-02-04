import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../../lib/components/Avatar';

interface IncomingCallProps {
  caller: {
    name: string;
    avatar?: string;
  };
  isVideo: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingCall({
  caller,
  isVideo,
  onAccept,
  onReject,
}: IncomingCallProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 text-center">
        <div className="mb-6">
          <Avatar
            src={caller.avatar}
            fallback={caller.name}
            size="xl"
            className="mx-auto"
          />
          <h2 className="text-xl font-bold text-white mt-4">{caller.name}</h2>
          <p className="text-gray-400">
            Incoming {isVideo ? 'video' : 'voice'} call...
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="primary"
            fullWidth
            onClick={onReject}
            className="!bg-red-600 hover:!bg-red-700"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={onAccept}
            className="!bg-green-600 hover:!bg-green-700"
          >
            Accept
          </Button>
        </div>
      </Card>
    </div>
  );
}