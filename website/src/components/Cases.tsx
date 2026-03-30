import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { caseStudies, type CaseStudy } from '../data/cases'
import { assetUrl } from '../lib/assetUrl'
import { CaseDetailModal } from './CaseDetailModal'

function CaseCard({
  c,
  index,
  inView,
  reduce,
  onOpenDetail,
}: {
  c: CaseStudy
  index: number
  inView: boolean
  reduce: boolean | null
  onOpenDetail: (c: CaseStudy) => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reduce ? 0 : 0.04 * index, duration: reduce ? 0.01 : 0.45 }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -5,
              transition: { type: 'spring', stiffness: 380, damping: 26 },
            }
      }
      className="group flex flex-col overflow-hidden border border-base-line bg-base transition-colors duration-300 hover:border-lime/40 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75),inset_0_0_0_1px_rgba(223,255,28,0.1)]"
    >
      <button
        type="button"
        className="relative aspect-[16/10] w-full overflow-hidden bg-base-lift text-left outline-none"
        onClick={() => onOpenDetail(c)}
        aria-label={`Подробнее: ${c.title}`}
      >
        <img
          src={assetUrl(c.cover)}
          alt=""
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent opacity-90`}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent} opacity-40 mix-blend-screen`}
        />
        {c.logo && (
          <img
            src={assetUrl(c.logo)}
            alt=""
            className="absolute left-4 top-4 h-8 max-w-[140px] object-contain object-left drop-shadow-md sm:h-9"
            loading="lazy"
          />
        )}
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-lime">
          {c.tag}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-bold text-sand sm:text-2xl">{c.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-sand-muted">{c.desc}</p>

        {c.gallery.length > 0 && (
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {c.gallery.slice(0, 4).map((thumb, i) => (
              <button
                key={`${thumb}-${i}`}
                type="button"
                className="relative h-11 w-16 shrink-0 overflow-hidden border border-base-line bg-base-lift transition hover:border-lime/50"
                onClick={() => onOpenDetail(c)}
                aria-label={`${c.title}: превью ${i + 1}`}
              >
                <img src={assetUrl(thumb)} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenDetail(c)}
          className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim transition hover:text-lime"
        >
          Подробнее
          <span aria-hidden>↗</span>
        </button>
      </div>
    </motion.article>
  )
}

function FeaturedCase({
  c,
  index,
  inView,
  reduce,
  onOpenDetail,
}: {
  c: CaseStudy
  index: number
  inView: boolean
  reduce: boolean | null
  onOpenDetail: (c: CaseStudy) => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reduce ? 0 : 0.02 * index, duration: reduce ? 0.01 : 0.55 }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -3,
              transition: { type: 'spring', stiffness: 360, damping: 28 },
            }
      }
      className="group relative overflow-hidden border border-base-line bg-base transition-shadow duration-300 hover:border-lime/35 hover:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.8)] md:col-span-2 xl:col-span-2"
    >
      <div className="grid lg:grid-cols-12 lg:gap-0">
        <button
          type="button"
          className="relative aspect-[16/11] overflow-hidden bg-base-lift text-left lg:col-span-7 lg:aspect-auto lg:min-h-[340px]"
          onClick={() => onOpenDetail(c)}
          aria-label={`Подробнее: ${c.title}`}
        >
          <img
            src={assetUrl(c.cover)}
            alt=""
            className="h-full w-full object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.03]"
            loading="eager"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base/80 via-transparent to-transparent lg:from-base/60" />
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent} opacity-30 mix-blend-screen`}
          />
          {c.logo && (
            <img
              src={assetUrl(c.logo)}
              alt=""
              className="absolute left-6 top-6 h-10 max-w-[180px] object-contain object-left sm:h-11"
            />
          )}
        </button>

        <div className="flex flex-col justify-center border-t border-base-line p-8 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:border-base-line">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-lime">{c.tag}</p>
          <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-sand sm:text-4xl">{c.title}</h3>
          <p className="mt-4 text-base leading-relaxed text-sand-muted">{c.desc}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {c.gallery.slice(0, 3).map((thumb, i) => (
              <button
                key={`${thumb}-${i}`}
                type="button"
                onClick={() => onOpenDetail(c)}
                className="relative h-14 w-24 overflow-hidden border border-base-line bg-base-lift transition hover:border-lime/50"
                aria-label="Превью экрана"
              >
                <img src={assetUrl(thumb)} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenDetail(c)}
            className="mt-8 inline-flex w-fit items-center gap-3 border border-lime bg-lime px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-base transition hover:bg-lime-glow"
          >
            Детальный просмотр
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export function Cases() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null)

  const openDetail = useCallback((c: CaseStudy) => {
    setActiveCase(c)
  }, [])

  return (
    <section id="cases" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.45 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime">Кейсы</p>
            <motion.div
              className="mt-3 h-px max-w-[120px] origin-left bg-gradient-to-r from-lime/90 to-transparent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: reduce ? 0.01 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            />
            <h2 className="mt-5 font-display text-display-lg font-bold text-sand">
              Реальные
              <br />
              <span className="text-sand-muted">продукты</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-sand-muted sm:text-base">
              Превью, логотипы и детальный разбор: задачи, решение, стек и материалы.
            </p>
          </motion.div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex w-fit items-center gap-2 border border-base-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-sand transition hover:border-lime hover:text-lime active:scale-[0.98]"
          >
            Запросить оценку
            <span aria-hidden>→</span>
          </motion.a>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((c, i) =>
            c.featured ? (
              <FeaturedCase
                key={c.id}
                c={c}
                index={i}
                inView={inView}
                reduce={reduce}
                onOpenDetail={openDetail}
              />
            ) : (
              <CaseCard
                key={c.id}
                c={c}
                index={i}
                inView={inView}
                reduce={reduce}
                onOpenDetail={openDetail}
              />
            ),
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeCase && (
          <CaseDetailModal
            key={activeCase.id}
            caseStudy={activeCase}
            onClose={() => setActiveCase(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
