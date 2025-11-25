import { act } from '@testing-library/react'
import { usePhotoboothStore } from '@/store/usePhotoboothStore'

describe('usePhotoboothStore', () => {
  beforeEach(() => {
    act(() => {
      usePhotoboothStore.setState({
        photos: [],
        step: 'camera',
        editState: {
          filter: 'none',
          brightness: 100,
          contrast: 100,
          saturation: 100,
          hue: 0,
          textOverlay: null,
        }
      })
    })
  })

  it('should add photos correctly', () => {
    const { addPhoto } = usePhotoboothStore.getState()
    
    act(() => {
      addPhoto('data:image/png;base64,test')
    })

    expect(usePhotoboothStore.getState().photos).toHaveLength(1)
    expect(usePhotoboothStore.getState().photos[0]).toBe('data:image/png;base64,test')
  })

  it('should clear photos', () => {
    const { addPhoto, clearPhotos } = usePhotoboothStore.getState()
    
    act(() => {
      addPhoto('test1')
      addPhoto('test2')
      clearPhotos()
    })

    expect(usePhotoboothStore.getState().photos).toHaveLength(0)
  })

  it('should update settings', () => {
    const { updateSettings } = usePhotoboothStore.getState()
    
    act(() => {
      updateSettings({ countdownDuration: 5 })
    })

    expect(usePhotoboothStore.getState().settings.countdownDuration).toBe(5)
  })
})
