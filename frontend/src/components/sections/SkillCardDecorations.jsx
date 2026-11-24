import './SkillCardAnimations.css'

const writingPath = 'M69 304q10-16 22-3t23-2q9-9 21-5'

function Listening() {
  return (
    <>
      <path d="M62 298v-28a58 58 0 0 1 116 0v28" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
      <rect x="49" y="276" width="30" height="51" rx="14" />
      <rect x="161" y="276" width="30" height="51" rx="14" />
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <g className="skill-card__sound-wave skill-card__sound-wave--near"><path d="M36 279q-16 21 0 43M204 279q16 21 0 43" /></g>
        <g className="skill-card__sound-wave skill-card__sound-wave--far"><path d="M23 266q-26 34 0 68M217 266q26 34 0 68" /></g>
      </g>
      <path className="skill-card__music-note" d="M159 207v29a9 7 0 1 1-6-7v-31l23-6v11Z" />
    </>
  )
}

function Reading() {
  return (
    <g transform="translate(120 215) rotate(-10 0 62)">
      <g className="skill-card__book">
        <g className="skill-card__book-back">
          <rect x="6" y="5" width="82" height="124" rx="8" opacity=".55" />
          <path d="M82 12v109M85 15v105" fill="none" stroke="var(--skill-card-accent)" strokeWidth="1.5" opacity=".45" />
        </g>
        <g className="skill-card__book-cover">
          <rect width="80" height="124" rx="8" />
          <rect width="10" height="124" rx="5" opacity=".6" />
          <g className="skill-card__book-cover-title" fill="none" stroke="var(--skill-card-accent)" strokeWidth="5" strokeLinecap="round">
            <path d="M22 32h42M22 47h32" />
          </g>
        </g>
        <g className="skill-card__book-pages">
          <path d="M0 9c-22-16-47-18-74-12v119c28-4 53 0 74 14Z" />
          <path d="M0 9c22-16 47-18 74-12v119c-28-4-53 0-74 14Z" />
          <g fill="none" stroke="var(--skill-card-accent)" strokeWidth="3.5" strokeLinecap="round" opacity=".65">
            <path d="M-59 28q23-2 44 8M-59 45q23-2 44 8M-59 62q23-2 35 6M15 36q21-10 44-8M15 53q21-10 44-8M15 70q17-8 35-7" />
            <path d="M0 10v117" strokeWidth="2" />
          </g>
          <path className="skill-card__book-page" d="M0 9c14-18 31-25 49-27v119c-18 5-35 15-49 29Z" opacity=".6" />
        </g>
      </g>
    </g>
  )
}

function Speaking() {
  return (
    <>
      <g className="skill-card__speech-main">
        <path d="M53 234h82a20 20 0 0 1 20 20v32a20 20 0 0 1-20 20H87l-27 23 6-23H53a20 20 0 0 1-20-20v-32a20 20 0 0 1 20-20Z" />
        <g fill="var(--skill-card-accent)">
          <circle cx="66" cy="270" r="6" /><circle cx="94" cy="270" r="6" /><circle cx="122" cy="270" r="6" />
        </g>
      </g>
      <g className="skill-card__hello-bubble">
        <path d="M137 199h64a15 15 0 0 1 15 15v26a15 15 0 0 1-15 15h-13l5 15-23-15h-33a15 15 0 0 1-15-15v-26a15 15 0 0 1 15-15Z" />
        <text x="169" y="228" dominantBaseline="central" textAnchor="middle" fill="var(--skill-card-accent)" fontWeight="800" fontSize="21">Hello!</text>
      </g>
    </>
  )
}

function Writing() {
  return (
    <>
      <g className="skill-card__writing" transform="rotate(-12 108 274)">
        <rect x="49" y="218" width="113" height="130" rx="13" />
        <g fill="none" stroke="var(--skill-card-accent)" strokeWidth="6" strokeLinecap="round">
          <path d="M69 243h68M69 261h59M69 279h48" />
          <path className="skill-card__written-line" d={writingPath} pathLength="1" />
        </g>
        <g className="skill-card__pen-motion" style={{ offsetPath: `path('${writingPath}')` }}>
          <g transform="rotate(32)" stroke="var(--skill-card-accent)" strokeWidth="2.5">
            <rect x="-6" y="-80" width="12" height="60" rx="6" />
            <path d="m-6-17 6 17 6-17Z" />
            <path d="M-6-29H6" fill="none" stroke="var(--skill-card-accent)" strokeWidth="4" />
          </g>
        </g>
      </g>
    </>
  )
}

function Vocabulary() {
  return (
    <>
      <g className="skill-card__letter-tile skill-card__letter-tile--one">
        <g transform="rotate(-14 80 251)">
          <rect x="46" y="218" width="68" height="68" rx="12" />
          <text x="80" y="253" dominantBaseline="central" textAnchor="middle" fontWeight="800" fontSize="36" fill="var(--skill-card-accent)">Aa</text>
        </g>
      </g>
      <g className="skill-card__letter-tile skill-card__letter-tile--two">
        <g transform="rotate(10 164 263)">
          <rect x="132" y="231" width="64" height="64" rx="12" />
          <text x="164" y="264" dominantBaseline="central" textAnchor="middle" fontWeight="800" fontSize="42" fill="var(--skill-card-accent)">V</text>
        </g>
      </g>
      <path d="M80 301h25a12 12 0 1 1 22 0h27v24a12 12 0 1 0 0 22v25H80Z" opacity=".7" />
    </>
  )
}

function Grammar() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3">
      <polygon className="skill-card__hexagon skill-card__hexagon--outer" points="120,207 183,243 183,315 120,351 57,315 57,243" />
      <polygon className="skill-card__hexagon skill-card__hexagon--inner" points="120,230 163,255 163,304 120,329 77,304 77,255" opacity=".6" />
      <path d="m57 243 63 36 63-36M120 279v72" opacity=".4" />
      <circle cx="120" cy="207" r="5" fill="currentColor" stroke="none" />
      <circle cx="183" cy="315" r="5" fill="currentColor" stroke="none" />
      <circle cx="57" cy="315" r="5" fill="currentColor" stroke="none" />
    </g>
  )
}

const decorations = { listening: Listening, reading: Reading, writing: Writing, speaking: Speaking, vocabulary: Vocabulary, grammar: Grammar }

export default function SkillCardDecorations({ kind }) {
  const Decoration = decorations[kind]
  if (!Decoration) return null
  return <g className={`skill-card__decorations skill-card__decorations--${kind}`} fill="currentColor" color="white" opacity=".45"><Decoration /></g>
}
