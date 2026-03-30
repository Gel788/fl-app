import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TechMarquee } from './components/TechMarquee'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Cases } from './components/Cases'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { SplashScreen } from './components/SplashScreen'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <SplashScreen />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[200] -translate-y-16 border border-lime bg-lime px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-base transition focus:translate-y-0 focus:outline-none"
      >
        К контенту
      </a>
      <div className="noise-overlay" aria-hidden />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <Services />
        <Process />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
