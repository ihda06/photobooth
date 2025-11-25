import { forwardRef, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'
import { getFilterString } from '@/lib/filters'
import { THEMES, ThemeType } from '@/lib/themes'
import Draggable from 'react-draggable'

interface PhotoStripProps {
  className?: string
  id?: string
}

export const PhotoStrip = forwardRef<HTMLDivElement, PhotoStripProps>(({ className, id }, ref) => {
  const { photos, settings, editState } = usePhotoboothStore()
  const [isFlipped, setIsFlipped] = useState(false)
  const nodeRef = useRef<HTMLDivElement>(null)
  
  const currentTheme = THEMES[(editState.stripTheme as ThemeType) || 'classic']

  const filterStyle = {
    filter: getFilterString(editState)
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <div 
        ref={nodeRef} 
        className="cursor-move"
        style={{ perspective: '1000px' }}
        onDoubleClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative transition-transform duration-700"
          style={{ 
            width: '260px',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front Side */}
          <div 
            ref={ref}
            id={id}
            className={cn(
              "p-3 shadow-2xl relative overflow-hidden", 
              currentTheme.bg,
              className
            )}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {currentTheme.decoration}

            <div className={cn("grid relative z-10", {
              'gap-2': settings.gridGap === 'small',
              'gap-4': settings.gridGap === 'medium',
              'gap-6': settings.gridGap === 'large',
            })}>
                {Array.from({ length: settings.gridRows }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square relative overflow-hidden shadow-inner",
                      editState.stripTheme === 'neon' ? 'border-2 border-cyan-400 bg-slate-800' : 'border border-stone-200 bg-stone-100'
                    )}
                  >
                    {photos[i] ? (
                      <img 
                        src={photos[i]} 
                        alt={`Photo ${i + 1}`} 
                        className="w-full h-full object-cover"
                        style={filterStyle}
                      />
                    ) : (
                      <div className={cn(
                        "w-full h-full flex items-center justify-center font-display text-2xl",
                        editState.stripTheme === 'neon' ? 'text-pink-500/50' : 'text-stone-300'
                      )}>
                        {i + 1}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            
            <div className={cn(
              "mt-6 text-center font-display text-xs tracking-widest uppercase relative z-10 break-words px-2",
              currentTheme.text
            )}>
                {editState.footerText}
            </div>
          </div>

          {/* Back Side */}
          <div 
            className={cn(
              "absolute inset-0 shadow-2xl flex flex-col items-center justify-center p-6 text-center",
              currentTheme.bg ? currentTheme.bg : 'bg-white'
            )}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
             <div className="flex-1 flex flex-col items-center justify-center w-full border-4 border-dashed border-stone-300/50 rounded-lg p-4">
                <div className="text-2xl mb-4 opacity-50">💌</div>
                <p className={cn("font-handwriting text-lg leading-relaxed break-words w-full", currentTheme.text)} style={{ fontFamily: 'cursive' }}>
                  {editState.secretMessage || "Secret Message..."}
                </p>
             </div>
             
             <div className="mt-4 opacity-50">
                <p className={cn("text-[10px] uppercase tracking-widest", currentTheme.text)}>
                  {new Date().toLocaleDateString()}
                </p>
             </div>

             {/* Back texture/decoration matches theme */}
             {currentTheme.decoration}
          </div>
        </div>
      </div>
    </Draggable>
  )
})

PhotoStrip.displayName = 'PhotoStrip'
