import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const reduce = useReducedMotion()
  const light = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center border border-base-line bg-base-lift text-sand transition hover:border-lime/40 hover:text-lime"
      aria-label={light ? 'Включить тёмную тему' : 'Включить светлую тему'}
      title={light ? 'Тёмная тема' : 'Светлая тема'}
    >
      <motion.span
        className="relative flex h-5 w-5 items-center justify-center"
        animate={reduce ? undefined : { rotate: light ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {light ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.span>
    </button>
  )
}
