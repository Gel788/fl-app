import { LayoutGroup, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useScrollSpy, type ScrollSpySection } from '../hooks/useScrollSpy'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { href: '#services', label: 'Услуги', id: 'services' as const },
  { href: '#process', label: 'Процесс', id: 'process' as const },
  { href: '#cases', label: 'Кейсы', id: 'cases' as const },
  { href: '#contact', label: 'Связь', id: 'contact' as const },
] satisfies ReadonlyArray<{ href: string; label: string; id: NonNullable<ScrollSpySection> }>

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeSection = useScrollSpy()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-base-line bg-base/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-8">
        <a href="#main" className="group flex items-center gap-3 rounded-sm" aria-label="FL App — на главную">
          <div className="relative h-10 w-10 overflow-hidden rounded-md border border-base-line bg-base-lift transition group-hover:border-lime/30">
            <img src="/logo.png" alt="" className="h-full w-full object-contain p-1" />
          </div>
          <div className="leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-sand sm:text-xl">FL App</span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim">
              product studio
            </span>
          </div>
        </a>

        <LayoutGroup>
          <nav className="hidden items-center gap-8 md:flex lg:gap-10" aria-label="Основная навигация">
            {nav.map((item) => {
              const active = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    active ? 'text-lime' : 'text-sand-muted hover:text-sand'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-lime shadow-[0_0_12px_rgba(223,255,28,0.45)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden border border-lime bg-lime px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-fg transition hover:bg-lime-glow active:scale-[0.98] sm:inline-flex"
          >
            Бриф
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-base-line bg-base-lift transition hover:border-lime/30 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-5 bg-sand transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-5 bg-sand transition ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-5 bg-sand transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto border-t border-base-line bg-base md:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Мобильное меню">
            {nav.map((item) => {
              const active = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`border-b border-base-line py-4 font-mono text-sm uppercase tracking-widest transition ${
                    active ? 'border-lime/30 text-lime' : 'text-sand hover:text-lime'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}
            <a
              href="#contact"
              className="mt-4 border border-lime bg-lime py-4 text-center font-mono text-sm font-medium uppercase tracking-widest text-fg"
              onClick={() => setOpen(false)}
            >
              Бриф
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
