import {
  Globe,
  MessageSquare,
  Bell,
  BookOpen,
  History,
  Crown,
} from 'lucide-react'

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-[100] w-full bg-transparent py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">

        {/* Logo */}
        <a
          className="flex items-center gap-3 font-extrabold text-2xl tracking-tighter shrink-0 transition-colors text-white"
          href="index.html"
        >
          <div className="relative w-[72px] h-[48px] rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img
              alt="The IELTS Dictionary Logo"
              className="h-full w-full  object-cover"
              src="/assets/logo-finall.png"
            />
          </div>

          <span className="hidden sm:block">
            The IELTS{' '}
            <span className="transition-colors text-white">
              Dictionary
            </span>
          </span>
        </a>

        {/* Center menu */}
        <div className="hidden lg:flex gap-1.5 items-center absolute left-1/2 -translate-x-1/2">
        </div>

        {/* Right actions */}
        <div className="flex gap-2 items-center">

          {/* Language */}
          <div className="relative">
            <button
              aria-label="Ngôn ngữ"
              className="relative h-10 rounded-full px-2.5 flex items-center justify-center gap-1 transition-all bg-white/30 hover:bg-white/50 text-slate-800"
            >
              <Globe
                size={18}
                aria-hidden="true"
              />

              <span className="text-[10px] font-black uppercase tracking-wider leading-none">
                VI
              </span>
            </button>
          </div>

          {/* Community */}
          <a
            className="relative h-10 px-3.5 rounded-full flex items-center gap-1.5 text-xs font-black transition-all bg-white/30 hover:bg-white/50 text-slate-800"
            href="index.htmlpractice/community"
            title="Cộng đồng"
          >
            <MessageSquare
              size={16}
              aria-hidden="true"
              className="text-herb-600"
            />

            <span className="hidden sm:inline">
              Cộng đồng
            </span>
          </a>

          {/* Notification */}
          <div className="relative">
            <button
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/30 hover:bg-white/50 text-slate-800"
              aria-label="Thông báo"
            >
              <Bell
                size={20}
                aria-hidden="true"
              />

              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
                1
              </span>
            </button>
          </div>

          {/* User */}
          <div
            className="relative"
            style={{
              fontFamily:
                'var(--font-nunito), var(--font-inter), sans-serif',
            }}
          >
            <div className="flex items-center transition-all duration-300 rounded-full backdrop-blur-sm border border-transparent hover:border-slate-100 bg-white/30">

              {/* Desktop user */}
              <a
                className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 cursor-pointer"
                href="index.htmldashboard"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-herb-100 flex items-center justify-center text-herb-600 font-bold overflow-hidden shadow-inner border border-herb-50">
                    <img
                      alt="avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/a/ACg8ocKMvzLOPUcVLFPfwsLTjhBKrOfuXrCCz9PtzMGWsn1e_Ar8JA=s96-c"
                    />
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-start leading-none gap-1">
                  <span className="font-black text-[14px] tracking-tight text-slate-900">
                    Đat Huỳnh
                  </span>

                  <div className="flex items-center gap-1.5 opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-herb-500" />

                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Online
                    </span>
                  </div>
                </div>
              </a>

              {/* Mobile user */}
              <button
                className="flex lg:hidden items-center gap-2.5 px-3 py-1.5"
                aria-label="Tài khoản"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-herb-100 flex items-center justify-center text-herb-600 font-bold overflow-hidden shadow-inner border border-herb-50">
                    <img
                      alt="avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/a/ACg8ocKMvzLOPUcVLFPfwsLTjhBKrOfuXrCCz9PtzMGWsn1e_Ar8JA=s96-c"
                    />
                  </div>
                </div>
              </button>

              {/* User menu */}
              <div className="hidden lg:flex items-center pr-2">

                {/* Divider */}
                <div className="w-[1px] h-6 bg-slate-500/20 mx-1 shrink-0" />

                {/* Vocabulary */}
                <a
                  className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-800 hover:text-amber-700 hover:bg-white/50 transition-colors"
                  href="index.htmldashboard?tab=notebook"
                >
                  <BookOpen
                    size={14}
                    aria-hidden="true"
                  />

                  Sổ từ vựng
                </a>

                {/* History */}
                <a
                  className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-800 hover:text-blue-700 hover:bg-white/50 transition-colors"
                  href="index.htmldashboard?tab=history"
                >
                  <History
                    size={14}
                    aria-hidden="true"
                  />

                  Lịch sử
                </a>
              </div>
            </div>
          </div>

          {/* Premium */}
          <a
            className="tid-pro-frame hidden lg:flex self-stretch shrink-0 items-center gap-2 rounded-full border border-amber-300/80 bg-gradient-to-r from-[#fff7e0] via-[#fffdf4] to-[#fff7e0] px-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-[1px]"
            href="index.htmlpremium"
            style={{
              fontFamily:
                'var(--font-nunito), var(--font-inter), sans-serif',
            }}
            title="Nâng cấp Premium"
          >
            <Crown
              size={19}
              aria-hidden="true"
              className="text-amber-500 fill-amber-400 drop-shadow-[0_1px_1px_rgba(120,53,15,0.45)]"
            />

            <span className="tid-pro-text text-[15px] font-black uppercase tracking-[0.1em]">
              Premium
            </span>
          </a>

        </div>
      </div>
    </nav>
  )
}

export default Navbar