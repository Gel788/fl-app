import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const bootLines = [
  { t: 0, text: 'KERNEL_INIT … OK', dim: false },
  { t: 120, text: 'GRAPH_PIPELINE … ARM', dim: false },
  { t: 260, text: 'MODULES … 8 LOADED', dim: true },
  { t: 400, text: 'CASEBUFFER … SYNC', dim: true },
  { t: 540, text: 'RENDER_TARGET … FL_APP', dim: false },
  { t: 680, text: 'READY', dim: false },
] as const

const R = 46
const C = 2 * Math.PI * R

export function SplashScreen() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [lineMask, setLineMask] = useState(0)

  useEffect(() => {
    // По умолчанию сплеш при каждой загрузке / F5. Чтобы отключить: ?nosplash=1
    const skip = new URLSearchParams(window.location.search).get('nosplash') === '1'
    setEnabled(!skip)
  }, [])

  useEffect(() => {
    if (enabled !== true) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [enabled])

  const dismiss = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    if (enabled !== true || !visible) return
    const ms = reduce ? 520 : 3000
    const id = window.setTimeout(dismiss, ms)
    return () => window.clearTimeout(id)
  }, [enabled, visible, reduce, dismiss])

  useEffect(() => {
    if (enabled !== true || !visible) return
    const start = performance.now()
    const dur = reduce ? 380 : 2400
    let frame: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      setProgress(t)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [enabled, visible, reduce])

  useEffect(() => {
    if (enabled !== true || !visible) return
    const step = reduce ? 200 : 95
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setLineMask((m) => Math.min(bootLines.length, m + 1))
      if (i >= bootLines.length) window.clearInterval(id)
    }, step)
    return () => window.clearInterval(id)
  }, [enabled, visible, reduce])

  if (enabled !== true) return null

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setEnabled(false)}>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-live="polite"
          aria-label="Загрузка интерфейса"
          className="fixed inset-0 z-[500] flex items-center justify-center overflow-hidden bg-base"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reduce ? 1 : 1.04,
            filter: reduce ? 'none' : 'blur(12px)',
          }}
          transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[length:48px_48px] bg-grid-fine opacity-[0.35]"
            style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 72%)' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(223,255,28,0.09),transparent_65%)]" />
          <motion.div
            className="pointer-events-none absolute left-0 right-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-lime/50 to-transparent shadow-[0_0_20px_rgba(223,255,28,0.25)]"
            initial={reduce ? false : { top: '14%' }}
            animate={reduce ? undefined : { top: ['14%', '86%'] }}
            transition={reduce ? undefined : { duration: 2.35, ease: 'linear' }}
          />

          <div className="pointer-events-none absolute inset-6 border border-base-line/40 sm:inset-10">
            <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-lime/50" />
            <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-lime/50" />
            <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-lime/50" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-lime/50" />
          </div>

          <div className="relative flex flex-col items-center gap-10 px-6">
            <div className="relative">
              <svg
                className="h-36 w-36 text-lime sm:h-44 sm:w-44"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  className="text-base-line"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-lime"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  transform="rotate(-90 50 50)"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(223,255,28,0.45))' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-base-line bg-base-lift shadow-[0_0_40px_-8px_rgba(223,255,28,0.35)] sm:h-[4.5rem] sm:w-[4.5rem]">
                  <img src="/logo.png" alt="" className="h-full w-full object-contain p-1.5" />
                  {!reduce && (
                    <motion.span
                      className="pointer-events-none absolute inset-0 bg-lime/10 mix-blend-overlay"
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.h2
                className="font-display text-3xl font-extrabold tracking-tight text-sand sm:text-4xl"
                initial={reduce ? false : { opacity: 0.85 }}
                animate={reduce ? undefined : { opacity: [0.85, 1, 0.92, 1] }}
                transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  textShadow: reduce
                    ? undefined
                    : '0 0 40px rgba(223,255,28,0.12), 1px 0 0 rgba(255,80,80,0.08), -1px 0 0 rgba(80,120,255,0.08)',
                }}
              >
                FL App
              </motion.h2>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.45em] text-sand-dim sm:text-[11px]">
                product studio · build
              </p>
            </div>

            <div className="w-full max-w-md font-mono text-[9px] leading-relaxed tracking-wide sm:text-[10px]">
              <div className="mb-2 flex items-center justify-between border-b border-base-line pb-1 text-sand-dim">
                <span>BOOT_LOG</span>
                <span className="text-lime/80">
                  {Math.round(progress * 100).toString().padStart(3, '0')}%
                </span>
              </div>
              <div className="space-y-1.5 text-left">
                {bootLines.map((line, i) => (
                  <motion.p
                    key={line.text}
                    className={
                      line.dim ? 'text-sand-dim/70' : 'text-sand-muted'
                    }
                    initial={{ opacity: 0, x: -6 }}
                    animate={{
                      opacity: i < lineMask ? 1 : 0,
                      x: i < lineMask ? 0 : -6,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lime/60">›</span> {line.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(223,255,28,0.4) 1px, rgba(223,255,28,0.4) 2px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
