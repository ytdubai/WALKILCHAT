/**
 * Video/Voice Call Service using Daily.co
 * Provides WebRTC-based audio/video calls for WakilChat
 */

import DailyIframe, { DailyCall, DailyParticipant } from '@daily-co/daily-js'

let callFrame: DailyCall | null = null

export interface CallConfig {
  roomUrl: string
  userName: string
  audioOnly?: boolean
  startVideoOff?: boolean
  startAudioOff?: boolean
}

/**
 * Initialize call frame
 */
export function createCallFrame(container: HTMLElement, config: CallConfig): DailyCall {
  if (callFrame) {
    callFrame.destroy()
  }

  callFrame = DailyIframe.createFrame(container, {
    iframeStyle: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      border: '0',
      borderRadius: '8px',
    },
    showLeaveButton: true,
    showFullscreenButton: true,
  })

  return callFrame
}

/**
 * Join a call
 */
export async function joinCall(config: CallConfig): Promise<void> {
  if (!callFrame) {
    throw new Error('Call frame not initialized')
  }

  await callFrame.join({
    url: config.roomUrl,
    userName: config.userName,
    audioSource: !config.startAudioOff,
    videoSource: config.audioOnly ? false : !config.startVideoOff,
  })
}

/**
 * Leave current call
 */
export async function leaveCall(): Promise<void> {
  if (callFrame) {
    await callFrame.leave()
  }
}

/**
 * Destroy call frame
 */
export function destroyCall(): void {
  if (callFrame) {
    callFrame.destroy()
    callFrame = null
  }
}

/**
 * Toggle microphone
 */
export async function toggleAudio(): Promise<boolean> {
  if (!callFrame) return false
  
  const localAudio = callFrame.localAudio()
  await callFrame.setLocalAudio(!localAudio)
  return !localAudio
}

/**
 * Toggle camera
 */
export async function toggleVideo(): Promise<boolean> {
  if (!callFrame) return false
  
  const localVideo = callFrame.localVideo()
  await callFrame.setLocalVideo(!localVideo)
  return !localVideo
}

/**
 * Get call participants
 */
export function getParticipants(): Record<string, DailyParticipant> {
  if (!callFrame) return {}
  return callFrame.participants()
}

/**
 * Get call frame instance
 */
export function getCallFrame(): DailyCall | null {
  return callFrame
}

/**
 * Simple peer-to-peer call (fallback if Daily.co not configured)
 */
export class SimplePeerCall {
  private localStream: MediaStream | null = null
  private remoteStream: MediaStream | null = null
  private peerConnection: RTCPeerConnection | null = null

  async startLocalStream(audioOnly: boolean = false): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: !audioOnly,
    })
    return this.localStream
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!)
      })
    }

    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)
    return offer
  }

  async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (this.peerConnection) {
      await this.peerConnection.setRemoteDescription(answer)
    }
  }

  stopCall(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop())
    }
    if (this.peerConnection) {
      this.peerConnection.close()
    }
    this.localStream = null
    this.remoteStream = null
    this.peerConnection = null
  }
}
