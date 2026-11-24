import { useId } from 'react'
import SkillCardDecorations from './SkillCardDecorations'

function SkillCard({ skill, EventOnClick, onMouseEnter, onMouseLeave }) {
  const Icon = skill.icon
  const kind = skill.id
  const artwork = skill.artwork
  const id = useId().replace(/:/g, '')
  const gradientId = `skill-background-${id}`
  const mascotClipId = `skill-mascot-${id}`

  return (
    <button
      type="button"
      onClick={() => EventOnClick(skill)}
      onMouseEnter={() => onMouseEnter?.(true)}
      onMouseLeave={() => onMouseLeave?.(false)}
      onFocus={() => onMouseEnter?.(true)}
      onBlur={() => onMouseLeave?.(false)}
      aria-label={`${skill.title}: ${skill.description} ${skill.badge}`}
      style={{ '--skill-card-accent': artwork.background[0] }}
      className="skill-card relative block aspect-[12/25] w-full cursor-pointer overflow-hidden rounded-[6px] border-4 border-black bg-white p-0 text-left shadow-[9px_9px_0_#000] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[12px_12px_0_#000] focus-visible:-translate-y-1.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <svg className="block h-full w-full" viewBox="0 0 240 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={artwork.background[0]} />
            <stop offset="1" stopColor={artwork.background[1]} />
          </linearGradient>
          {/* The clip follows the original artwork; no regenerated mascot assets. */}
          <clipPath id={mascotClipId}><path d={artwork.mascotOutline} /></clipPath>
        </defs>
        {/* Artwork and copy share one coordinate system so labels stay aligned. */}
        <g className="skill-card__scene">
          <rect width="240" height="500" fill={`url(#${gradientId})`} />
          <SkillCardDecorations kind={kind} />
          <g transform="translate(0 70)">
            <image href={skill.image} width="240" height="430" preserveAspectRatio="none" clipPath={`url(#${mascotClipId})`} />
          </g>
          <foreignObject x="18" y="26" width="48" height="48">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white/90 text-slate-600 shadow-sm">
              <Icon size={28} strokeWidth={1.8} />
            </div>
          </foreignObject>
          <text x="18" y="135" fill="white" fontSize="30" fontWeight="800" letterSpacing="-.6">{skill.title}</text>
          <foreignObject x="18" y="150" width="204" height="100">
            <p style={{ margin: 0, fontSize: 15, fontWeight: 650, lineHeight: 1.6, color: 'rgba(255,255,255,.92)' }}>{skill.description}</p>
          </foreignObject>
          <g className="skill-card__badge">
            <rect x="46" y="449" width="148" height="42" rx="21" fill={artwork.badge} />
            <text x="120" y="470" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="21" fontWeight="800" letterSpacing=".8">{skill.badge}</text>
          </g>
        </g>
      </svg>
    </button>
  )
}

export default SkillCard
