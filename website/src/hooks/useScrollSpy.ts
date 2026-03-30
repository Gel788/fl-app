import { useEffect, useState } from 'react'

/** Секции, совпадающие с якорями в шапке */
const SECTION_IDS = ['services', 'process', 'cases', 'contact'] as const

export type ScrollSpySection = (typeof SECTION_IDS)[number] | null

const HEADER_OFFSET = 104

export function useScrollSpy(): ScrollSpySection {
  const [active, setActive] = useState<ScrollSpySection>(null)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY + HEADER_OFFSET
      let current: ScrollSpySection = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= y + 2) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return active
}
