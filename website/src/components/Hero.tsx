import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '../data/cases'
import { assetUrl } from '../lib/assetUrl'

const ROTATE_MS = 5200

export function Hero() {
  const reduce = useReducedMotion()
  const [caseIndex, setCaseIndex] = useState(0)
  const slides = caseStudies

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(
      () => setCaseIndex((i) => (i + 1) % slides.length),
      ROTATE_MS,
    )
    return () => window.clearInterval(id)
  }, [slides.length])

  const line = {
    hidden: { opacity: 0, y: reduce ? 0 : 36 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduce ? 0 : 0.05 * i,
        duration: reduce ? 0.01 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const phoneTransition = reduce
    ? { duration: 0.01 }
    : { delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }

  const current = slides[caseIndex] ?? slides[0]
  const fade = { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden pt-24 sm:pt-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[length:56px_56px] bg-grid-fine opacity-40"
        style={{ maskImage: 'linear-gradient(180deg, black 55%, transparent)' }}
      />
      <div className="pointer-events-none absolute -right-1/4 top-0 h-[min(90vh,900px)] w-[min(90vh,900px)] rounded-full bg-lime/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-base to-transparent" />

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 pt-8 sm:gap-16 sm:px-8 lg:grid-cols-[1fr_minmax(280px,420px)] lg:items-end lg:gap-8 lg:pb-28">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={line}
            className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-sand-dim"
          >
            <span className="h-px w-8 bg-lime" />
            Москва · удалённо
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={line}
            className="font-display text-display-xl font-extrabold text-sand"
          >
            Продукты,
            <br />
            <span className="text-sand-muted">которые</span>{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-lime">работают</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-3 bg-lime/20 sm:-bottom-2 sm:h-4"
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={line}
            className="mt-10 max-w-xl text-pretty text-lg leading-relaxed text-sand-muted sm:text-xl"
          >
            Мобильные приложения и веб — от стратегии до релиза. Без воды в смете и сметы вместо ТЗ.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={line}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              Начать диалог
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#cases" className="btn-ghost">
              Работы
            </a>
          </motion.div>

          <motion.dl
            custom={4}
            initial="hidden"
            animate="show"
            variants={line}
            className="mt-20 grid grid-cols-3 gap-4 border-t border-base-line pt-10 sm:gap-8"
          >
            {[
              { k: '50+', v: 'релизов' },
              { k: '8 лет', v: 'в продакшене' },
              { k: 'SLA', v: 'поддержка' },
            ].map((row) => (
              <div key={row.v}>
                <dt className="font-display text-2xl font-bold tabular-nums text-sand sm:text-3xl">{row.k}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sand-dim sm:text-xs">
                  {row.v}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : 0.45 }}
            className="relative mt-12 border border-base-line bg-base-card p-5 lg:hidden"
          >
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-sand-dim">
              <span>preview</span>
              <span className="text-lime">●</span>
            </div>
            <a
              href="#cases"
              className="relative mt-4 block aspect-[21/9] overflow-hidden rounded-lg border border-base-line/40 bg-base"
              aria-label="Перейти к кейсам"
            >
              <AnimatePresence mode="wait" initial={false}>
                {current && (
                  <motion.img
                    key={current.id}
                    src={assetUrl(current.cover)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={{ opacity: reduce ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: reduce ? 1 : 0 }}
                    transition={fade}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-base via-base/60 to-transparent px-3 py-2">
                <p className="truncate font-mono text-[9px] uppercase tracking-wider text-sand-muted">
                  {current?.title ?? ''}
                </p>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={phoneTransition}
          className="relative hidden lg:block"
        >
          <div className="absolute -left-8 top-12 z-10 max-w-[200px] border border-base-line bg-base-card/95 p-4 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-sand-dim shadow-2xl backdrop-blur-sm">
            <span className="text-lime">●</span> live
            <br />
            pipeline
            {current && (
              <span className="mt-3 block max-h-8 overflow-hidden text-[9px] normal-case leading-snug tracking-normal text-sand-muted">
                {current.title}
              </span>
            )}
          </div>

          <a
            href="#cases"
            className="relative mx-auto block aspect-[10/16] w-full max-w-[320px] overflow-hidden rounded-[2rem] border-2 border-base-line bg-base-lift shadow-[0_0_0_1px_rgba(223,255,28,0.08),0_40px_80px_-20px_rgba(0,0,0,0.8)] transition hover:border-lime/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            aria-label="Открыть раздел с кейсами"
          >
            <div className="absolute inset-x-16 top-0 h-6 rounded-b-2xl bg-base" />
            <div
              className="absolute inset-3 top-8 overflow-hidden rounded-3xl"
              style={{
                backgroundColor: '#141210',
                backgroundImage:
                  'linear-gradient(145deg, #1a1814 0%, #0c0b09 45%, #1f1c17 100%), repeating-linear-gradient(-12deg, transparent, transparent 3px, rgba(223,255,28,0.06) 3px, rgba(223,255,28,0.06) 4px)',
              }}
            >
              <div className="absolute inset-0 z-[2] bg-gradient-to-br from-lime/10 via-transparent to-transparent" />
              <div
                className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-12deg, transparent, transparent 3px, rgba(223,255,28,0.5) 3px, rgba(223,255,28,0.5) 4px)',
                }}
              />
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait" initial={false}>
                  {current && (
                    <motion.img
                      key={current.id}
                      src={assetUrl(current.cover)}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      initial={{ opacity: reduce ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: reduce ? 1 : 0 }}
                      transition={fade}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-base via-base/90 to-transparent" />
              <div className="absolute bottom-16 left-0 right-0 z-[3] flex justify-center gap-1">
                {slides.map((c, i) => (
                  <span
                    key={c.id}
                    className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                      i === caseIndex ? 'bg-lime' : 'bg-white/25'
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <div className="absolute bottom-8 left-5 right-5 z-[3] space-y-2">
                {current && (
                  <p className="truncate text-center font-mono text-[9px] uppercase tracking-wider text-sand-muted">
                    {current.title}
                  </p>
                )}
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-sand-dim">
                  <span>build</span>
                  <span className="text-lime">ok</span>
                </div>
              </div>
            </div>
          </a>

          <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full border border-lime/30 bg-lime/10 blur-2xl" />

          <p className="mt-8 max-w-[280px] font-mono text-[11px] leading-relaxed text-sand-dim">
            Визуальная метафора: продукт в руке — код и дизайн внутри одного контура.
          </p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-40">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-sand-dim">scroll</span>
        <motion.div
          animate={reduce ? false : { y: [0, 8, 0] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 justify-center rounded-full border border-base-line pt-2"
        >
          <div className="h-2 w-0.5 rounded-full bg-lime/80" />
        </motion.div>
      </div>
    </section>
  )
}
