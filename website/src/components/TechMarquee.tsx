import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const tech = [
  'TypeScript',
  'React',
  'React Native',
  'Node',
  'PostgreSQL',
  'Kubernetes',
  'AWS',
  'Figma',
  'Swift',
  'Kotlin',
  'GraphQL',
  'Terraform',
]

export function TechMarquee() {
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const row = [...tech, ...tech]

  if (reduce) {
    return (
      <div className="border-y border-base-line bg-base-lift py-6">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-center gap-x-8 gap-y-3 px-4 sm:px-8">
          {tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[12px] font-medium uppercase tracking-[0.28em] text-sand-dim"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden border-y border-base-line bg-base-lift py-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-base-lift to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-base-lift to-transparent" />
      <p className="sr-only">Стек: {tech.join(', ')}</p>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: paused ? 120 : 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-mono text-[13px] font-medium uppercase tracking-[0.35em] text-sand-dim"
          >
            {t}
            <span className="mx-6 text-lime/40">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
