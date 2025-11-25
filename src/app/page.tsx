"use client"

import { useRef, useState } from 'react'
import { RetroShell } from '@/components/layout/RetroShell'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'
import { Camera, Download, Trash2, RotateCcw, Share2 } from 'lucide-react'
import { useCamera } from '@/hooks/useCamera'
import { CameraPreview } from '@/components/camera/CameraPreview'
import { Countdown } from '@/components/camera/Countdown'
import { captureVideoFrame } from '@/lib/camera-utils'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FilterControls } from '@/components/editor/FilterControls'
import { ColorGrading } from '@/components/editor/ColorGrading'
import { TextControls } from '@/components/editor/TextControls'
import { PhotoStrip } from '@/components/editor/PhotoStrip'
import { downloadPhotoStrip } from '@/lib/download-utils'
import { ThemeSelector } from '@/components/editor/ThemeSelector'
import { useShutterSound } from '@/hooks/useShutterSound'

export default function Home() {
  const { photos, addPhoto, clearPhotos, settings } = usePhotoboothStore()
  const { stream, error, isLoading, videoRef } = useCamera()
  const { playShutter } = useShutterSound()
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const photoStripRef = useRef<HTMLDivElement>(null)

  const handleStartCapture = () => {
    if (photos.length >= settings.gridRows) return // Max photos reached
    setIsCountingDown(true)
  }

  const handleCountdownComplete = () => {
    setIsCountingDown(false)
    if (videoRef.current) {
      // Play shutter sound effect
      playShutter()
      
      const photoData = captureVideoFrame(videoRef.current)
      if (photoData) {
        addPhoto(photoData)
      }
    }
  }

  const handleDownload = async () => {
    if (!photoStripRef.current) return
    setIsDownloading(true)
    try {
      await downloadPhotoStrip(photoStripRef.current, 'png', `photobooth-${Date.now()}`)
    } catch (e) {
      console.error(e)
    } finally {
      setIsDownloading(false)
    }
  }

  const isFull = photos.length >= settings.gridRows

  return (
    <RetroShell>

      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-4 h-full min-h-0">
        {/* Left Main Column: Creation Zone */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          
          {/* Top Section: Controls & Camera */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
            {/* Controls Panel */}
            <div className="bg-stone-200 p-4 rounded-xl border-4 border-stone-300 h-full min-h-0 flex flex-col shadow-inner relative overflow-hidden">
               {/* Metallic Texture */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none"></div>
               
               {/* Screws */}
               <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-stone-400 border border-stone-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-full h-[1px] bg-stone-600 rotate-45"></div></div>
               <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-stone-400 border border-stone-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-full h-[1px] bg-stone-600 rotate-45"></div></div>
               <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-stone-400 border border-stone-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-full h-[1px] bg-stone-600 rotate-45"></div></div>
               <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-stone-400 border border-stone-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center"><div className="w-full h-[1px] bg-stone-600 rotate-45"></div></div>

               <h2 className="font-display font-bold text-stone-700 mb-4 uppercase tracking-wider text-sm text-center bg-stone-300/50 py-1 rounded border border-stone-400/30 backdrop-blur-sm relative z-10">
                 Studio Controls
               </h2>
               <Tabs defaultValue="filters" className="w-full flex-1 flex flex-col min-h-0 relative z-10">
                  <TabsList className="w-full bg-stone-300/50 p-1 mb-4 h-9 shrink-0 border border-stone-400/30">
                    <TabsTrigger value="filters" className="flex-1 text-xs data-[state=active]:bg-stone-100 data-[state=active]:shadow-sm">Filters</TabsTrigger>
                    <TabsTrigger value="color" className="flex-1 text-xs data-[state=active]:bg-stone-100 data-[state=active]:shadow-sm">Color</TabsTrigger>
                    <TabsTrigger value="text" className="flex-1 text-xs data-[state=active]:bg-stone-100 data-[state=active]:shadow-sm">Text</TabsTrigger>
                  </TabsList>
                  <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                    <TabsContent value="filters" className="mt-0">
                      <FilterControls />
                    </TabsContent>
                    <TabsContent value="color" className="mt-0">
                      <ColorGrading />
                    </TabsContent>
                    <TabsContent value="text" className="mt-0">
                      <TextControls />
                    </TabsContent>
                  </div>
               </Tabs>
            </div>

            {/* Camera Panel */}
            <div className="flex flex-col gap-4 h-full min-h-0 items-center justify-center">
              <div className="relative shrink-0 w-[240px] mx-auto">
                {/* Camera Body Styling */}
                <div className="absolute -inset-3 bg-[#2a2a2a] rounded-[20px] shadow-2xl border border-stone-600">
                   <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] rounded-[18px]"></div>
                   <div className="absolute inset-1 border-2 border-[#4a4a4a] rounded-[16px]"></div>
                </div>

                {/* Camera Lens/Screen Container */}
                <div className="relative aspect-square bg-black rounded-xl overflow-hidden border-[6px] border-[#1a1a1a] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center z-10 ring-1 ring-white/10">
                  <CameraPreview 
                    videoRef={videoRef}
                    stream={stream}
                    error={error}
                    isLoading={isLoading}
                  />
                  <Countdown 
                    seconds={settings.countdownDuration}
                    isActive={isCountingDown}
                    onComplete={handleCountdownComplete}
                  />
                </div>
                
                <div className="absolute -bottom-8 left-0 right-0 text-center z-10">
                   <span className="text-[10px] font-display font-bold tracking-[0.2em] text-stone-400 uppercase drop-shadow-md">
                     RetroCam 3000
                   </span>
                </div>
              </div>
              
              <div className="w-[240px] flex gap-2 mt-4 shrink-0 z-20">
                  <button 
                    onClick={handleStartCapture}
                    disabled={isLoading || !!error || isFull || isCountingDown}
                    className={cn(
                      "flex-1 py-3 rounded-lg font-bold shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 text-sm border-2 border-red-900",
                      isFull 
                        ? "bg-stone-300 text-stone-500 cursor-not-allowed border-stone-400 shadow-none translate-y-[4px]"
                        : "bg-red-600 text-white hover:bg-red-500"
                    )}
                  >
                     <Camera className="w-4 h-4" />
                     {isCountingDown ? 'Ready!' : isFull ? 'Full' : 'Capture'}
                  </button>
                  
                  {photos.length > 0 && (
                    <button 
                      onClick={clearPhotos}
                      className="px-3 py-3 bg-stone-200 text-stone-700 rounded-lg font-bold hover:bg-stone-100 transition-all border-2 border-stone-400 shadow-[0_4px_0_rgb(120,113,108)] active:shadow-none active:translate-y-[4px]"
                      title="Clear Photos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
               </div>
            </div>
          </div>

          {/* Bottom Section: Theme Selector */}
          <div className="bg-stone-100 p-3 rounded-xl border-2 border-stone-200 shrink-0">
             <ThemeSelector />
          </div>
        </div>

        {/* Right Main Column: Result */}
        <div className="bg-[#e8e4d9] rounded-xl border-4 border-[#d6d3c9] p-2 flex flex-col items-center relative overflow-hidden h-full min-h-0 shadow-inner">
           {/* Cork Texture */}
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] pointer-events-none"></div>
           
           {/* Pin */}
           <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md z-20 border border-red-600"></div>

           <div className="flex-1 flex items-center justify-center w-full min-h-0 overflow-hidden relative z-10">
             <div className="relative transition-transform hover:scale-[0.72] duration-300 scale-[0.7] origin-center shadow-xl rotate-1">
                <PhotoStrip ref={photoStripRef} />
             </div>
           </div>

           {/* Download Actions */}
           <div className="w-full flex gap-2 z-10 shrink-0 mt-2">
              <button 
                onClick={handleDownload}
                disabled={photos.length === 0 || isDownloading}
                className={cn(
                  "flex-1 py-2 rounded-lg font-bold shadow-[0_2px_0_rgb(41,37,36)] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center gap-2 text-xs md:text-sm border-2 border-stone-800",
                  photos.length === 0
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed border-stone-400 shadow-none"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                )}
              >
                 {isDownloading ? (
                   <>Downloading...</>
                 ) : (
                   <>
                     <Download className="w-4 h-4" />
                     Download
                   </>
                 )}
              </button>
           </div>
        </div>
      </div>
    </RetroShell>
  )
}
