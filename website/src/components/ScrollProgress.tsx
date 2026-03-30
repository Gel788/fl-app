import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-lime shadow-[0_0_12px_rgba(223,255,28,0.35)]"
      style={{ scaleX }}
    />
  )
}
