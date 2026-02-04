import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SimplePeer from 'simple-peer';
import { useAuth } from '../lib/providers/AuthProvider';
import { CallControls } from '../components/call/CallControls';
import { CallTimer } from '../components/call/CallTimer';
import { IncomingCall } from '../components/call/IncomingCall';
import { supabase } from '../lib/supabase';

export default function CallPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { callId, targetId, type = 'voice' } = router.query;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(type === 'video');
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [incomingCall, setIncomingCall] = useState<any>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<any>(null);

  useEffect(() => {
    if (!user || !callId) return;

    // Subscribe to signaling channel
    const channel = supabase
      .channel(`call:${callId}`)
      .on(
        'broadcast',
        { event: 'signal' },
        ({ payload }) => {
          if (payload.targetId === user.id) {
            handleSignal(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      cleanup();
    };
  }, [user, callId]);

  useEffect(() => {
    if (!user || !targetId) return;
    initializeMedia();
  }, [user, targetId]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC peer
      const peer = new SimplePeer({
        initiator: !callId,
        stream,
        trickle: false,
      });

      peer.on('signal', (data) => {
        // Send signaling data through Supabase Realtime
        supabase
          .channel(`call:${callId || 'new'}`)
          .send({
            type: 'broadcast',
            event: 'signal',
            payload: {
              signal: data,
              fromId: user?.id,
              targetId,
            },
          });
      });

      peer.on('stream', (stream) => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
        setCallStartTime(new Date());
      });

      peerRef.current = peer;
    } catch (err) {
      console.error('Failed to access media devices:', err);
      router.push('/messages');
    }
  };

  const handleSignal = (payload: any) => {
    if (payload.type === 'offer') {
      setIncomingCall({
        from: payload.fromId,
        isVideo: type === 'video',
      });
    } else if (peerRef.current) {
      peerRef.current.signal(payload.signal);
    }
  };

  const handleAcceptCall = () => {
    setIncomingCall(null);
    // Accept the WebRTC offer
    if (peerRef.current && incomingCall) {
      peerRef.current.signal(incomingCall.signal);
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
    router.push('/messages');
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    cleanup();
    router.push('/messages');
  };

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
  };

  return (
    <>
      <Head>
        <title>Call - WakilChat</title>
      </Head>

      <div className="fixed inset-0 bg-gray-900">
        {/* Remote Video (full screen) */}
        {remoteStream && type === 'video' && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Local Video (small overlay) */}
        {localStream && type === 'video' && (
          <div className="absolute top-4 right-4 w-48 aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg border border-gray-700"
            />
          </div>
        )}

        {/* Call Timer */}
        {callStartTime && <CallTimer startTime={callStartTime} />}

        {/* Call Controls */}
        <CallControls
          isMuted={isMuted}
          isVideoEnabled={isVideoEnabled}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onEndCall={endCall}
        />

        {/* Incoming Call Dialog */}
        {incomingCall && (
          <IncomingCall
            caller={{
              name: 'Incoming Call', // TODO: Get caller name from profiles
              avatar: undefined,
            }}
            isVideo={type === 'video'}
            onAccept={handleAcceptCall}
            onReject={handleRejectCall}
          />
        )}
      </div>
    </>
  );
}