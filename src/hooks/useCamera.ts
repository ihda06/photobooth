"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseCameraProps {
  videoConstraints?: MediaTrackConstraints
}

interface UseCameraReturn {
  stream: MediaStream | null
  error: Error | null
  isLoading: boolean
  startCamera: () => Promise<void>
  stopCamera: () => void
  videoRef: React.RefObject<HTMLVideoElement | null>
}

export function useCamera({ videoConstraints }: UseCameraProps = {}): UseCameraReturn {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setStream(null)
    }
  }, [])

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 1280 }, // Square orientation
          aspectRatio: { ideal: 1 },
          ...videoConstraints,
        },
        audio: false,
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = mediaStream
      setStream(mediaStream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError(err instanceof Error ? err : new Error('Failed to access camera'))
    } finally {
      setIsLoading(false)
    }
  }, [videoConstraints])

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [startCamera, stopCamera])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return { stream, error, isLoading, startCamera, stopCamera, videoRef }
}
