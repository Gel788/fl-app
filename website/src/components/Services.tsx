import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const items = [
  {
    title: 'Мобильные приложения',
    desc: 'iOS · Android · кроссплатформа. Сторы, пуши, аналитика.',
    span: 'lg:col-span-2 lg:row-span-1',
    num: '01',
  },
  {
    title: 'Веб и SaaS',
    desc: 'Лендинги, кабинеты, высокая скорость и SEO.',
    span: '',
    num: '02',
  },
  {
    title: 'UI / UX',
    desc: 'Исследования, дизайн-системы, прототипы.',
    span: '',
    num: '03',
  },
  {
    title: 'Бэкенд · API',
    desc: 'Масштаб, безопасность, интеграции.',
    span: 'lg:col-span-2',
    num: '04',
  },
  {
    title: 'DevOps',
    desc: 'CI/CD, облака, наблюдаемость.',
    span: '',
    num: '05',
  },
  {
    title: 'Консалтинг',
    desc: 'Аудит, архитектура, миграции.',
    span: '',
    num: '06',
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduce = useReducedMotion()
  const dur = reduce ? 0.01 : 0.45
  const delay = (i: number) => (reduce ? 0 : 0.05 * i)

  return (
    <section id="services" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-base-line pb-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.5 }}
            className="max-w-3xl"
          >
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.35em] text-lime"
              initial={false}
              animate={inView ? { opacity: [0.7, 1] } : {}}
              transition={{ duration: reduce ? 0.01 : 0.6 }}
            >
              Услуги
            </motion.p>
            <h2 className="mt-4 font-display text-display-lg font-bold text-sand">
              Всё, что нужно
              <br />
              <span className="text-sand-muted">чтобы выйти в прод</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: reduce ? 0 : 0.12, duration: reduce ? 0.01 : 0.5 }}
            className="max-w-sm font-mono text-sm leading-relaxed text-sand-dim"
          >
            Собираем команду под задачу. Фикс‑прайс или тайм‑материал — прозрачно в договоре.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-px bg-base-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: delay(i), duration: dur }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -4,
                      transition: { type: 'spring', stiffness: 420, damping: 28 },
                    }
              }
              className={`group relative bg-base p-8 transition-[background-color,box-shadow] duration-300 hover:bg-base-lift hover:shadow-[inset_0_0_0_1px_rgba(223,255,28,0.12)] sm:min-h-[240px] ${item.span}`}
            >
              <span className="font-mono text-[10px] text-lime/80">{item.num}</span>
              <h3 className="mt-6 font-display text-xl font-bold text-sand transition group-hover:text-lime sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-sand-muted">{item.desc}</p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim transition hover:text-lime sm:mt-10"
              >
                Обсудить
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <span
                className="pointer-events-none absolute bottom-6 right-8 font-mono text-5xl font-bold tabular-nums text-base-line transition duration-300 group-hover:text-lime/15 sm:bottom-8"
                aria-hidden
              >
                {item.num}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
