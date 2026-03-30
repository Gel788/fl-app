import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { n: 'I', title: 'Исследование', text: 'Бизнес, аудитория, метрики, ограничения.' },
  { n: 'II', title: 'Дизайн', text: 'Прототипы, UI, согласование без бесконечных правок.' },
  { n: 'III', title: 'Разработка', text: 'Спринты, ревью, тесты, документация.' },
  { n: 'IV', title: 'Запуск', text: 'Релиз, мониторинг, итерации по данным.' },
]

export function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24 border-t border-base-line bg-base-lift py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0.01 : 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-lime">Процесс</p>
          <h2 className="mt-4 font-display text-display-lg font-bold text-sand">Четыре фазы — один контур ответственности</h2>
        </motion.div>

        <div className="relative mb-14 hidden lg:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-base-line" />
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div
                key={step.n}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-lime/50 bg-base font-mono text-xs font-medium text-lime shadow-[0_0_0_4px] shadow-base-lift"
              >
                {step.n}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: reduce ? 0 : 0.08 * i, duration: reduce ? 0.01 : 0.45 }}
              className="group relative border-t border-base-line pt-10 transition-colors hover:bg-base/30 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 first:lg:border-l-0 first:lg:pl-0"
            >
              <div className="font-mono text-xs text-sand-dim lg:hidden">{step.n}</div>
              <h3 className="mt-4 font-display text-lg font-bold text-sand lg:mt-0">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand-muted">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
