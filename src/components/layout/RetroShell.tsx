import React from 'react'
import { cn } from '@/lib/utils'

interface RetroShellProps {
  children: React.ReactNode
  className?: string
}

export function RetroShell({ children, className }: RetroShellProps) {
  return (
    <main className={cn("flex h-screen flex-col items-center justify-center p-2 bg-[#f5f0e6] overflow-hidden relative", className)}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 pointer-events-none"></div>
      <div className="w-full max-w-[95vw] h-full flex flex-col max-h-[98vh] relative z-10">
        <header className="mb-2 text-center shrink-0">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-stone-800 tracking-tighter uppercase drop-shadow-sm">
            Photobooth
          </h1>
        </header>
        
        <div className="relative bg-white rounded-2xl shadow-xl border-4 border-stone-200 overflow-hidden flex-1 flex flex-col min-h-0">
           {/* Decorative top bar */}
           <div className="h-3 bg-stone-200 w-full flex items-center justify-center gap-2 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
           </div>
           
           <div className="p-3 md:p-4 flex-1 overflow-hidden flex flex-col">
             {children}
           </div>
        </div>

        <footer className="mt-2 text-center text-stone-500 text-[10px] font-body shrink-0">
          <p>© {new Date().getFullYear()} Photobooth App. Made with nostalgia.</p>
        </footer>
      </div>
    </main>
  )
}
