"use client"

import { useRef, useCallback } from 'react'

/**
 * Hook to play camera shutter sound effect
 * Plays the camera-shutter.mp3 audio file when taking a picture
 */
export function useShutterSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playShutter = useCallback(() => {
    try {
      // Initialize audio element on first use
      if (!audioRef.current) {
        audioRef.current = new Audio('/camera-shutter.mp3')
        audioRef.current.volume = 0.7
        audioRef.current.preload = 'auto'
      }

      // Reset to beginning and play
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.warn('Failed to play shutter sound:', error)
      })
    } catch (error) {
      console.warn('Failed to play shutter sound:', error)
    }
  }, [])

  return { playShutter }
}
