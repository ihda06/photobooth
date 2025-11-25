import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CountdownProps {
  seconds: number
  onComplete: () => void
  isActive: boolean
}

export function Countdown({ seconds, onComplete, isActive }: CountdownProps) {
  const [count, setCount] = useState(seconds)

  useEffect(() => {
    if (!isActive) {
      setCount(seconds)
      return
    }

    if (count === 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, isActive, onComplete, seconds])

  return (
    <AnimatePresence>
      {isActive && count > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20">
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-9xl font-display font-bold text-white drop-shadow-lg stroke-black"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
          >
            {count}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
