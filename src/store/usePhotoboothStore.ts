import { create } from 'zustand'

export type Photo = string // Base64 data URL

export type AppStep = 'camera' | 'review'

export interface FilterSettings {
  filter: string
  brightness: number
  contrast: number
  saturation: number
  hue: number
}

export interface TextOverlay {
  text: string
  x: number
  y: number
  font: string
  color: string
  size: number
}

interface PhotoboothState {
  step: AppStep
  photos: Photo[]
  settings: {
    countdownDuration: 3 | 4 | 5
    gridRows: 2 | 3 | 4
    gridGap: 'small' | 'medium' | 'large'
    borderThickness: 'thin' | 'medium'
  }
  editState: FilterSettings & {
    footerText: string
    secretMessage: string
    stripTheme: 'classic' | 'halloween' | 'retro' | 'neon'
  }
  
  // Actions
  setStep: (step: AppStep) => void
  addPhoto: (photo: Photo) => void
  removePhoto: (index: number) => void
  clearPhotos: () => void
  updateSettings: (settings: Partial<PhotoboothState['settings']>) => void
  updateEditState: (editState: Partial<PhotoboothState['editState']>) => void
  resetEditState: () => void
}

const DEFAULT_EDIT_STATE: FilterSettings & { footerText: string; secretMessage: string; stripTheme: 'classic' } = {
  filter: 'none',
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  footerText: 'Photobooth App',
  secretMessage: 'Secret Message...',
  stripTheme: 'classic',
}

export const usePhotoboothStore = create<PhotoboothState>((set) => ({
  step: 'camera',
  photos: [],
  settings: {
    countdownDuration: 3,
    gridRows: 3,
    gridGap: 'medium',
    borderThickness: 'medium',
  },
  editState: DEFAULT_EDIT_STATE,

  setStep: (step) => set({ step }),
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  removePhoto: (index) => set((state) => ({ photos: state.photos.filter((_, i) => i !== index) })),
  clearPhotos: () => set({ photos: [] }),
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  updateEditState: (newEditState) =>
    set((state) => ({ editState: { ...state.editState, ...newEditState } })),
  resetEditState: () => set({ editState: DEFAULT_EDIT_STATE }),
}))
