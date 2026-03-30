import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useCallback, useMemo, useState } from 'react'
import type { CaseStudy } from '../data/cases'
import { assetUrl } from '../lib/assetUrl'

const LOAD_MS = 780

function CaseLoadOverlay({
  title,
  progress,
  line,
  reduce,
}: {
  title: string
  progress: number
  line: string
  reduce: boolean | null
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-[35] flex flex-col bg-base"
    >
      <div className="pointer-events-none absolute inset-0 bg-[length:32px_32px] bg-grid-fine opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(223,255,28,0.06),transparent_65%)]" />
      <div className="relative flex flex-1 flex-col items-center justify-center px-8 py-12">
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-sand-dim">case dossier</p>
        <p className="mt-4 max-w-md text-center font-display text-xl font-bold text-sand sm:text-2xl">{title}</p>
        <div className="mt-10 h-1 w-full max-w-sm overflow-hidden rounded-full bg-base-line">
          <motion.div
            className="h-full rounded-full bg-lime"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(223,255,28,0.35)',
            }}
          />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-wide text-lime/90">{Math.round(progress)}%</p>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-sand-dim">{line}</p>
        <div className="mt-10 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-lime"
              animate={reduce ? { opacity: 0.7 } : { opacity: [0.2, 1, 0.2] }}
              transition={reduce ? undefined : { duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function uniqImages(c: CaseStudy): string[] {
  return [...new Set([c.cover, ...c.gallery].filter(Boolean))]
}

type Props = {
  caseStudy: CaseStudy
  onClose: () => void
}

const loadLines = [
  'FETCH_METADATA …',
  'DECODE_PREVIEW …',
  'ASSEMBLE_VIEW …',
  'READY',
] as const

export function CaseDetailModal({ caseStudy: c, onClose }: Props) {
  const reduce = useReducedMotion()
  const images = useMemo(() => uniqImages(c), [c])
  const d = c.detail
  const [phase, setPhase] = useState<'loading' | 'ready'>(() => (reduce ? 'ready' : 'loading'))
  const [progress, setProgress] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    if (reduce) {
      setPhase('ready')
      setProgress(100)
      return
    }
    setPhase('loading')
    setProgress(0)
    setLineIdx(0)
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / LOAD_MS)
      setProgress(t * 100)
      setLineIdx(Math.min(loadLines.length - 1, Math.floor(t * loadLines.length)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setPhase('ready')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [c.id, reduce])

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onKey])

  const summary = d?.summary ?? c.desc
  const lead = d?.lead

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.22 }}
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-detail-title"
    >
      <motion.button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-base/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: reduce ? 0.01 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[min(94dvh,920px)] w-full max-w-5xl flex-col overflow-hidden border border-base-line bg-base shadow-[0_0_0_1px_rgba(223,255,28,0.06),0_40px_100px_-24px_rgba(0,0,0,0.85)] sm:max-h-[min(92dvh,880px)] sm:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <CaseLoadOverlay
              key={`load-${c.id}`}
              title={c.title}
              progress={progress}
              line={loadLines[lineIdx] ?? loadLines[0]}
              reduce={reduce}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={false}
          animate={{
            opacity: phase === 'ready' ? 1 : 0,
            filter:
              reduce || phase === 'ready' ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`flex min-h-0 flex-1 flex-col ${phase === 'loading' ? 'pointer-events-none' : ''}`}
          aria-hidden={phase === 'loading'}
          aria-busy={phase === 'loading'}
        >
        <header className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-base-line bg-base/95 px-4 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            {c.logo && (
              <img
                src={assetUrl(c.logo)}
                alt=""
                className="h-8 w-auto max-w-[120px] object-contain object-left sm:h-9"
              />
            )}
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-lime">{c.tag}</p>
              <h2 id="case-detail-title" className="truncate font-display text-lg font-bold text-sand sm:text-xl">
                {c.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 border border-base-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-sand transition hover:border-lime hover:text-lime"
            onClick={onClose}
          >
            Закрыть
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="relative aspect-[21/9] min-h-[180px] w-full bg-base-lift sm:aspect-[24/9]">
            <img
              src={assetUrl(c.cover)}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent" />
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent} opacity-35 mix-blend-screen`}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              {d?.role && (
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand-dim">{d.role}</p>
              )}
              {lead && (
                <p className="mt-3 max-w-3xl text-balance text-base font-medium leading-relaxed text-sand sm:text-lg">
                  {lead}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-12 lg:gap-0">
            <div className="border-b border-base-line p-6 sm:p-10 lg:col-span-7 lg:border-r lg:border-base-line">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sand-dim">О проекте</p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-sand-muted sm:text-lg">{summary}</p>

              {(d?.challenges?.length || d?.solution?.length) ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {d.challenges && d.challenges.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Вызовы</p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sand-muted">
                        {d.challenges.map((x) => (
                          <li key={x} className="border-l border-base-line pl-3">
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {d.solution && d.solution.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Решение</p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sand-muted">
                        {d.solution.map((x) => (
                          <li key={x} className="border-l border-lime/25 pl-3">
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <aside className="flex flex-col gap-6 p-6 sm:p-10 lg:col-span-5 lg:bg-base-lift/40">
              {d?.metrics && d.metrics.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sand-dim">Эффект</p>
                  <div className="mt-4 flex flex-col gap-2">
                    {d.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="border border-base-line bg-base px-4 py-3 transition hover:border-lime/30"
                      >
                        <p className="font-display text-2xl font-bold tabular-nums text-lime sm:text-3xl">{m.value}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sand-dim">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {d?.stack && d.stack.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sand-dim">Стек</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {d.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-base-line bg-base px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-sand-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href="#contact"
                className="mt-2 inline-flex w-full items-center justify-center border border-lime bg-lime py-3 font-mono text-xs font-semibold uppercase tracking-widest text-fg transition hover:bg-lime-glow sm:w-auto sm:px-6"
                onClick={onClose}
              >
                Похожий проект
              </a>
            </aside>
          </div>

          {images.length > 0 && (
            <div className="border-t border-base-line bg-base p-6 sm:p-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sand-dim">Материалы</p>
                  <p className="mt-2 font-display text-xl font-bold text-sand">Экраны и превью</p>
                </div>
                <span className="font-mono text-[10px] text-sand-dim">{images.length} кадра</span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {images.map((src, i) => (
                  <motion.div
                    key={`${src}-${i}`}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.4 }}
                    className="group overflow-hidden border border-base-line bg-base-lift"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={assetUrl(src)}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                    </div>
                    <p className="px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-sand-dim">
                      Кадр {String(i + 1).padStart(2, '0')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
