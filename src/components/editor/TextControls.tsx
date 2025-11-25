import React from 'react'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'
import { Input } from '@/components/ui/input' // Need to install input
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Type } from 'lucide-react'

const FONTS = [
  { name: 'Sans', value: 'var(--font-body)' },
  { name: 'Display', value: 'var(--font-display)' },
  { name: 'Serif', value: 'serif' },
  { name: 'Mono', value: 'monospace' },
  { name: 'Cursive', value: 'cursive' },
]

const COLORS = [
  '#ffffff', '#000000', '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'
]

export function TextControls() {
  const { editState, updateEditState } = usePhotoboothStore()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Footer Text</Label>
        <div className="flex gap-2">
           <div className="w-8 h-8 flex items-center justify-center bg-stone-200 rounded text-stone-500">
             <Type className="w-4 h-4" />
           </div>
           <input
            type="text"
            value={editState.footerText}
            onChange={(e) => updateEditState({ footerText: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            placeholder="Enter text..."
            maxLength={20}
          />
        </div>
        <p className="text-[10px] text-stone-400">
          Change the text at the bottom of your photo strip.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Secret Message (Back)</Label>
        <div className="flex gap-2">
           <div className="w-8 h-8 flex items-center justify-center bg-stone-200 rounded text-stone-500">
             <Type className="w-4 h-4" />
           </div>
           <textarea
            value={editState.secretMessage}
            onChange={(e) => updateEditState({ secretMessage: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-md text-sm min-h-[80px] resize-none"
            placeholder="Enter a secret message..."
            maxLength={100}
          />
        </div>
        <p className="text-[10px] text-stone-400">
          This message appears on the back of the strip when flipped.
        </p>
      </div>
    </div>
  )
}
