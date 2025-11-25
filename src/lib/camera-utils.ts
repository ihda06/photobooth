export function captureVideoFrame(video: HTMLVideoElement): string | null {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return null
  
  // Flip horizontally if the video is mirrored (user facing)
  // We assume the video element has transform: scaleX(-1) CSS, so we need to draw it flipped?
  // Actually, if we draw it directly it will be the raw feed (unmirrored).
  // Users usually expect the saved photo to be mirrored if the preview was mirrored (like a mirror),
  // OR unmirrored (like a real camera).
  // Standard selfie behavior: Preview is mirrored, Photo is usually unmirrored (true life) or mirrored (what you see).
  // Let's stick to "What You See Is What You Get" for a photobooth.
  
  ctx.translate(canvas.width, 0)
  ctx.scale(-1, 1)
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  return canvas.toDataURL('image/jpeg', 0.9)
}
