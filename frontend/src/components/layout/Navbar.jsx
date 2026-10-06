import {
  Globe,
  MessageSquare,
  BookOpen,
  History,
  Crown,
} from 'lucide-react'

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-[100] w-full bg-transparent py-6">
      <div
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
          px-6 lg:px-8
        "
      >
        {/* Logo */}
        <a
          href="/"
          className="
            flex shrink-0 items-center gap-3
            text-2xl font-extrabold
            tracking-tighter text-white
          "
        >
          <div
            className="
              relative h-[48px] w-[72px]
              overflow-hidden rounded-xl
              border border-slate-100
              shadow-sm
            "
          >
            <img
              src="/assets/logo-finall.png"
              alt="The IELTS Dictionary Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="hidden sm:block">
            The IELTS{' '}
            <span className="text-white">
              Dictionary
            </span>
          </span>
        </a>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="
              flex h-10 items-center
              justify-center gap-1
              rounded-full bg-white/30
              px-2.5 text-slate-800
              transition-all hover:bg-white/50
            "
          >
            <Globe size={18} />

            <span className="text-[10px] font-black uppercase">
              VI
            </span>
          </button>

          <a
            href="/community"
            className="
              flex h-10 items-center gap-1.5
              rounded-full bg-white/30
              px-3.5 text-xs font-black
              text-slate-800
              transition-all hover:bg-white/50
            "
          >
            <MessageSquare
              size={16}
              className="text-green-700"
            />

            Cộng đồng
          </a>

          <a
            href="/vocabulary"
            className="
              hidden md:flex
              items-center gap-1.5
              rounded-xl px-2.5 py-1.5
              text-[12px] font-bold
              text-slate-800
              hover:bg-white/50
            "
          >
            <BookOpen size={14} />
            Sổ từ vựng
          </a>

          <a
            href="/history"
            className="
              hidden md:flex
              items-center gap-1.5
              rounded-xl px-2.5 py-1.5
              text-[12px] font-bold
              text-slate-800
              hover:bg-white/50
            "
          >
            <History size={14} />
            Lịch sử
          </a>

          <a
            href="/premium"
            className="
              hidden lg:flex
              items-center gap-2
              rounded-full
              border border-amber-300/80
              bg-gradient-to-r
              from-[#fff7e0]
              via-[#fffdf4]
              to-[#fff7e0]
              px-5
              transition-transform
              hover:-translate-y-[1px]
            "
          >
            <Crown
              size={19}
              className="fill-amber-400 text-amber-500"
            />

            <span className="text-[15px] font-black uppercase tracking-[0.1em]">
              Premium
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar