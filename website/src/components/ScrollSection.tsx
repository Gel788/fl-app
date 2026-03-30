import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Лёгкий scroll-reveal для секций — без перегруза внутренних анимаций */
export function ScrollSection({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0.88, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -6% 0px' }}
      transition={{ duration: reduce ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
