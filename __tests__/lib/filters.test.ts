import { getFilterString } from '@/lib/filters';

describe('getFilterString', () => {
  it('should return correct filter string for default values', () => {
    const settings = {
      filter: 'none',
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    };

    expect(getFilterString(settings)).toBe('brightness(100%) contrast(100%) saturate(100%) hue-rotate(0deg)');
  });

  it('should include base filter if selected', () => {
    const settings = {
      filter: 'sepia(100%)',
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    };

    expect(getFilterString(settings)).toBe(
      'sepia(100%) brightness(100%) contrast(100%) saturate(100%) hue-rotate(0deg)'
    );
  });

  it('should handle adjustments', () => {
    const settings = {
      filter: 'none',
      brightness: 120,
      contrast: 90,
      saturation: 150,
      hue: 180,
    };

    expect(getFilterString(settings)).toBe('brightness(120%) contrast(90%) saturate(150%) hue-rotate(180deg)');
  });
});
