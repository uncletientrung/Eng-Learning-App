import {
  Bell,
  BookOpen,
  History,
  Crown,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ transparentOnTop = false }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationsRef = useRef(null)
  const notificationButtonRef = useRef(null)

  useEffect(() => {
    if (!notificationsOpen) return

    const handlePointerDown = (event) => {
      if (!notificationsRef.current?.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false)
        notificationButtonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [notificationsOpen])
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // kiểm tra ngay khi component mount
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isTransparent = transparentOnTop && !isScrolled

  return (
    <nav
      className={`
        fixed left-0 top-0 z-[100] w-full
        py-6
        transition-all duration-300
        ${isTransparent
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-md shadow-sm'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">

        {/* Logo */}
        <a
          className={`
            flex items-center gap-3
            font-extrabold text-2xl
            tracking-tighter shrink-0
            transition-colors
            ${isTransparent ? 'text-white' : 'text-slate-900'}
          `}
          href="/"
        >
          <div className="relative w-[72px] h-[48px] rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <img
              alt="The IELTS Dictionary Logo"
              className="h-full w-full object-cover"
              src="/assets/logo-finall.png"
            />
          </div>

          <span className="hidden sm:block">
            The IELTS{' '}
            <span
              className={
                isTransparent
                  ? 'text-white'
                  : 'text-slate-900'
              }
            >
              Dictionary
            </span>
          </span>
        </a>

        {/* Center menu */}
        <div className="hidden lg:flex gap-1.5 items-center absolute left-1/2 -translate-x-1/2">
        </div>

        {/* Right actions */}
        <div className="flex gap-2 items-center">

          {/* Notification */}
          <div className="relative" ref={notificationsRef}>
            <button
              ref={notificationButtonRef}
              type="button"
              className="relative w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition-all bg-white/30 hover:bg-white/50 text-slate-800"
              aria-label="Thông báo"
              aria-expanded={notificationsOpen}
              aria-controls="navbar-notifications"
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <Bell size={20} aria-hidden="true" />
            </button>

            {notificationsOpen && (
              <section
                id="navbar-notifications"
                aria-labelledby="navbar-notifications-title"
                className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-100 bg-white text-slate-900 shadow-xl"
              >
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 id="navbar-notifications-title" className="font-bold">Thông báo</h2>
                </div>
                <div className="flex flex-col items-center px-5 py-8 text-center">
                  <Bell size={28} className="mb-3 text-slate-400" aria-hidden="true" />
                  <p className="text-sm font-semibold">Bạn chưa có thông báo mới</p>
                  <p className="mt-1 text-xs text-slate-500">Thông báo của bạn sẽ hiển thị tại đây.</p>
                </div>
              </section>
            )}
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
              <Link
                className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 cursor-pointer"
                to="/vocabulary/dashboard"
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
              </Link>

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
                <div className="w-[1px] h-6 bg-slate-500/20 mx-1 shrink-0" />

                <Link
                  className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-800 hover:text-amber-700 hover:bg-white/50 transition-colors"
                  to="/vocabulary/dashboard?tab=notebook"
                >
                  <BookOpen size={14} aria-hidden="true" />
                  Sổ từ vựng
                </Link>

                <Link
                  className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-800 hover:text-blue-700 hover:bg-white/50 transition-colors"
                  to="/vocabulary/dashboard?tab=history"
                >
                  <History size={14} aria-hidden="true" />
                  Lịch sử
                </Link>
              </div>
            </div>
          </div>

          {/* Premium */}
          <a
            className="tid-pro-frame hidden lg:flex self-stretch shrink-0 items-center gap-2 rounded-full border border-amber-300/80 bg-gradient-to-r from-[#fff7e0] via-[#fffdf4] to-[#fff7e0] px-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-[1px]"
            href="/premium"
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
