function Button1({
  text,
  textColor = '#fff',
  backgroundColor = '#f67232',
  icon,
  type = 'button',
  onClick,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
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
      "
      style={{
        width: fullWidth ? '100%' : 'auto',
        backgroundColor,
        color: textColor,
        fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      {text}

      {icon && (
        <span className="ml-2">
          {icon}
        </span>
      )}
    </button>
  )
}

export default Button1
    