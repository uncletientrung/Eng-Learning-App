function SkillCard({ skill }) {
  const Icon = skill.icon

  return (
    <a
      href={skill.path}
      className="
        group relative block h-[320px]
        overflow-hidden rounded-[6px]
        border-[4px] border-black
        bg-white
        shadow-[9px_9px_0_rgba(0,0,0,1)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:shadow-[12px_12px_0_rgba(0,0,0,1)]
        md:h-[400px]
      "
    >
      {/* Background image */}
      <img
        src={skill.image}
        alt={skill.title}
        className="
          absolute inset-0
          h-full w-full
          object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col p-3">
        {/* Icon */}
        <div
          className="
            mt-2 flex h-12 w-12
            items-center justify-center
            rounded-[10px]
            bg-white/90
            text-slate-600
            shadow-sm
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Title */}
        <h3
          className="
            mt-5 whitespace-pre-line
            text-[24px] font-extrabold
            leading-[1.05] text-white
            drop-shadow-sm
          "
        >
          {skill.title}
        </h3>

        {/* Description */}
        <p
          className="
            mt-2 whitespace-normal
            text-[12px] font-semibold
            leading-[1.6] text-white/90
          "
        >
          {skill.description}
        </p>

        {/* Badge */}
        <div className="mt-auto mb-2 flex justify-center">
          <span
            className="
              translate-y-[5px]
              text-[16px] font-black
              tracking-[1px]
              text-white
              drop-shadow-sm
            "
          >
            {skill.badge}
          </span>
        </div>
      </div>
    </a>
  )
}

export default SkillCard
