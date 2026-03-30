import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-24 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0.01 : 0.5 }}
          className="overflow-hidden border border-base-line bg-base-card shadow-[0_0_0_1px_rgba(42,38,34,0.5)]"
        >
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-base-line bg-lime p-10 sm:p-14 lg:border-b-0 lg:border-r">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.35em] text-base/70">Контакт</p>
              <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-base sm:text-4xl md:text-5xl">
                Расскажите,
                <br />
                что строите
              </h2>
              <p className="mt-8 max-w-sm font-mono text-sm leading-relaxed text-base/75">
                Ответ за один рабочий день. Без рассылок и «прогрева».
              </p>
              <a
                href="mailto:hello@flapp.dev"
                className="mt-10 inline-flex items-center gap-3 border-2 border-base bg-base px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-lime transition hover:bg-base-lift active:scale-[0.98]"
              >
                hello@flapp.dev
              </a>
            </div>

            <div className="p-8 sm:p-12 lg:p-14">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0.01 : 0.35 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center border-2 border-lime bg-lime/10">
                    <svg className="h-8 w-8 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold text-sand">Принято</p>
                  <p className="mt-2 font-mono text-sm text-sand-dim">Свяжемся по почте.</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim">
                        Имя
                      </span>
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="field-underline"
                        placeholder="Имя или компания"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim">
                        Email
                      </span>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        className="field-underline"
                        placeholder="you@domain.com"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-sand-dim">
                      Задача
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="field-box"
                      placeholder="Продукт, сроки, бюджет — в свободной форме"
                    />
                  </label>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Отправить
                  </button>
                  <p className="font-mono text-[10px] leading-relaxed text-sand-dim">
                    Нажимая кнопку, вы соглашаетесь на обработку данных.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
