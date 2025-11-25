import React from 'react'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export function ColorGrading() {
  const { editState, updateEditState } = usePhotoboothStore()

  const handleChange = (key: keyof typeof editState, value: number[]) => {
    updateEditState({ [key]: value[0] })
  }

  return (
    <div className="space-y-6">
      <h4 className="font-display text-sm text-stone-500 uppercase tracking-wider">Adjustments</h4>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs font-bold text-stone-600">Brightness</Label>
          <span className="text-xs text-stone-400">{editState.brightness}%</span>
        </div>
        <Slider 
          value={[editState.brightness]} 
          min={50} 
          max={150} 
          step={1} 
          onValueChange={(v) => handleChange('brightness', v)} 
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs font-bold text-stone-600">Contrast</Label>
          <span className="text-xs text-stone-400">{editState.contrast}%</span>
        </div>
        <Slider 
          value={[editState.contrast]} 
          min={50} 
          max={150} 
          step={1} 
          onValueChange={(v) => handleChange('contrast', v)} 
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs font-bold text-stone-600">Saturation</Label>
          <span className="text-xs text-stone-400">{editState.saturation}%</span>
        </div>
        <Slider 
          value={[editState.saturation]} 
          min={0} 
          max={200} 
          step={1} 
          onValueChange={(v) => handleChange('saturation', v)} 
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label className="text-xs font-bold text-stone-600">Hue</Label>
          <span className="text-xs text-stone-400">{editState.hue}°</span>
        </div>
        <Slider 
          value={[editState.hue]} 
          min={-180} 
          max={180} 
          step={1} 
          onValueChange={(v) => handleChange('hue', v)} 
        />
      </div>
    </div>
  )
}
