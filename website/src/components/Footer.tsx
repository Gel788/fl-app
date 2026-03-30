export function Footer() {
  return (
    <footer className="border-t border-base-line bg-base">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid gap-12 border-b border-base-line pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 overflow-hidden rounded-md border border-base-line bg-base-lift">
                <img src="/logo.png" alt="" className="h-full w-full object-contain p-1" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-sand">FL App</span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-sand-dim">product · mobile · web</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand-muted">
              Продуктовая разработка: от идеи до поддержки в продакшене.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand-dim">Навигация</p>
            <nav className="mt-4 flex flex-col gap-3">
              <a href="#services" className="text-sm text-sand transition hover:text-lime">
                Услуги
              </a>
              <a href="#process" className="text-sm text-sand transition hover:text-lime">
                Процесс
              </a>
              <a href="#cases" className="text-sm text-sand transition hover:text-lime">
                Кейсы
              </a>
              <a href="#contact" className="text-sm text-sand transition hover:text-lime">
                Контакты
              </a>
            </nav>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand-dim">Связь</p>
            <a
              href="mailto:hello@flapp.dev"
              className="mt-4 block font-mono text-sm text-sand transition hover:text-lime"
            >
              hello@flapp.dev
            </a>
            <p className="mt-4 text-sm text-sand-muted">Удалённо · по всему миру</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sand-dim">Юридическое</p>
            <p className="mt-4 text-sm text-sand-muted">
              Политика конфиденциальности и обработки данных — по запросу.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-sand-dim">© {new Date().getFullYear()} FL App</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-sand-dim/70">Сделано с вниманием к деталям</p>
        </div>
      </div>
    </footer>
  )
}
