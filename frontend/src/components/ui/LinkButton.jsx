import { Link } from 'react-router-dom'

function LinkButton({
  to,
  children,
  backgroundColor = 'bg-[#f67232]',
  textColor = 'text-white',
}) {
  return (
    <Link
      to={to}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        border-2 border-[#1a1a1a]
        px-5 py-[13px]
        text-base
        font-bold
        shadow-[4px_4px_0_#1a1a1a]
        transition-transform
        hover:-translate-y-[1px]
        ${backgroundColor}
        ${textColor}
      `}
    >
      {children}
    </Link>
  )
}

export default LinkButton