import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, Loader2 } from 'lucide-react'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'
import { getFilterString } from '@/lib/filters'
import { THEMES, ThemeType } from '@/lib/themes'

interface CameraPreviewProps {
  className?: string
  videoRef: React.RefObject<HTMLVideoElement | null>
  stream: MediaStream | null
  error: Error | null
  isLoading: boolean
}

export function CameraPreview({ className, videoRef, stream, error, isLoading }: CameraPreviewProps) {
  const { editState } = usePhotoboothStore()
  
  const filterStyle = {
    filter: getFilterString(editState)
  }

  const currentTheme = THEMES[(editState.stripTheme as ThemeType) || 'classic']

  return (
    <div className={cn(
      "relative w-full h-full bg-black overflow-hidden flex items-center justify-center rounded-lg transition-colors duration-300", 
      currentTheme.bg,
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-stone-900/80">
          <Loader2 className="w-10 h-10 animate-spin mb-2 text-stone-400" />
          <p className="font-mono text-sm">Initializing Camera...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-stone-900 p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Camera Error</h3>
          <p className="text-stone-400 mb-4">{error.message}</p>
          <p className="text-xs text-stone-500">Please allow camera access to use this app.</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 transition-[filter] duration-200" // Mirror effect
        style={filterStyle}
      />
      
      {/* Theme Decoration Overlay */}
      {currentTheme.decoration}

      {/* Viewfinder Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30 p-4">
        {/* REC Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
          <span className="text-[10px] font-mono font-bold text-white tracking-widest">REC</span>
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/50 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/50 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/50 rounded-br-lg"></div>

        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-50">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white"></div>
        </div>

        {/* Grid Lines (Subtle) */}
        <div className="absolute inset-0 w-full h-full border-2 border-white/10 grid grid-cols-3 grid-rows-3">
            <div className="border-r border-b border-white/10"></div>
            <div className="border-r border-b border-white/10"></div>
            <div className="border-b border-white/10"></div>
            <div className="border-r border-b border-white/10"></div>
            <div className="border-r border-b border-white/10"></div>
            <div className="border-b border-white/10"></div>
            <div className="border-r border-white/10"></div>
            <div className="border-r border-white/10"></div>
            <div></div>
        </div>
      </div>
    </div>
  )
}
