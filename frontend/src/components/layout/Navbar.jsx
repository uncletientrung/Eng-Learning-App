import {
  Bell,
  BookOpen,
  History,
  Crown,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, subscribeAuth } from '../../services/authApi'
import { useDueFolders, dueFolderLink } from '../../pages/Vocabulary/dashboard/flashcard/useDueFolders'

function AccountAvatar({ initial }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-[#71a534] text-[20px] leading-none font-semibold text-white" aria-hidden="true">
      {initial}
    </span>
  )
}

function Navbar({ transparentOnTop = false }) {
  const [user, setUser] = useState(getCurrentUser)
  const displayName = user?.name?.trim() || user?.email || 'Khách'
  const avatarInitial = displayName.charAt(0).toLocaleUpperCase('vi-VN')
  const accountLink = user ? '/vocabulary/dashboard' : '/login'
  const { folders: dueFolders } = useDueFolders()
  const dueWordCount = dueFolders.reduce((count, folder) => count + folder.dueWords.length, 0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationsRef = useRef(null)
  const notificationButtonRef = useRef(null)

  useEffect(() => subscribeAuth(() => setUser(getCurrentUser())), [])

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
              {dueWordCount > 0 && <span aria-label="Có từ đến hạn ôn tập" className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500" />}
            </button>

            {notificationsOpen && (
              <section
                id="navbar-notifications"
                aria-labelledby="navbar-notifications-title"
                className="fixed left-6 right-6 top-[88px] overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-900 shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[465px] sm:max-w-[calc(100vw-3rem)]"
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <h2 id="navbar-notifications-title" className="text-[22px] font-bold">Thông báo</h2>
                  <button type="button" aria-label="Đóng thông báo" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100" onClick={() => { setNotificationsOpen(false); notificationButtonRef.current?.focus() }}><X size={19} /></button>
                </div>
                {dueWordCount > 0 ? <Link
                  to={dueFolderLink(dueFolders[0].id)}
                  onClick={() => setNotificationsOpen(false)}
                  className="flex gap-4 bg-[#fffdec] px-6 py-5 transition-colors hover:bg-[#fff8d4]"
                >
                  <span aria-hidden="true" className="pt-0.5 text-[23px]">📚</span>
                  <div className="min-w-0">
                    <p className="text-[17px] font-bold text-[#526236]">Đến giờ ôn từ vựng</p>
                    <p className="mt-0.5 text-sm font-medium text-[#6b7e9d]">Có {dueFolders.length} bộ từ cần ôn tập — Ôn ngay →</p>
                  </div>
                </Link> : <div className="flex flex-col items-center px-5 py-8 text-center">
                  <Bell size={28} className="mb-3 text-slate-400" aria-hidden="true" />
                  <p className="text-sm font-semibold">Bạn chưa có thông báo mới</p>
                  <p className="mt-1 text-xs text-slate-500">Thông báo của bạn sẽ hiển thị tại đây.</p>
                </div>}
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
            <div className="flex items-center rounded-full border border-white/20 bg-white/30 backdrop-blur-sm transition-colors duration-300 hover:bg-white/40">

              {/* Desktop user */}
              <Link
                className="hidden lg:flex items-center gap-3 py-2 pl-2 pr-4 cursor-pointer"
                to={accountLink}
              >
                <AccountAvatar initial={avatarInitial} />

                <div className="flex min-w-0 flex-col items-center gap-0.5 text-center">
                  <span className="block max-w-36 truncate text-[14px] leading-[18px] font-extrabold tracking-tight text-[#243528]" title={displayName}>
                    {displayName}
                  </span>

                  <span className="inline-flex items-center justify-center gap-1.5 text-[10px] leading-3 font-bold tracking-[0.08em] text-slate-800 uppercase opacity-60">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${user ? 'bg-[#6a8042]' : 'bg-slate-400'}`} aria-hidden="true" />
                    {user ? 'Online' : 'Chưa đăng nhập'}
                  </span>
                </div>
              </Link>

              {/* Mobile user */}
              <Link
                className="flex lg:hidden items-center p-2"
                to={accountLink}
                aria-label={user ? `Tài khoản ${displayName}` : 'Đăng nhập'}
              >
                <AccountAvatar initial={avatarInitial} />
              </Link>

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
