import { Link } from 'react-router-dom'

function LinkButton({
  to,
  children,
  backgroundColor = 'bg-[#f67232]',
  textColor = 'text-white',
  className = '',
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
        text-base
        font-bold
        shadow-[2px_2px_0_#1a1a1a]
        transition-transform
        hover:-translate-y-[1px]
        ${backgroundColor}
        ${textColor}
        ${className}
      `}
    >
      {children}
    </Link>
  )
}

export default LinkButton