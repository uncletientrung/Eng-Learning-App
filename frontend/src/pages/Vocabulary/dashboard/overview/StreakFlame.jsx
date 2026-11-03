import "./streak.css";

export default function StreakFlame({ active = true, face = false, size }) {
  return <span className={`td-streak-flame${active ? " is-lit" : ""}`} style={size ? { width: size, height: size } : undefined} aria-hidden="true">
    {active && <span className="td-streak-glow td-glow" />}
    <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
      <g className={active ? "td-fire" : undefined}>
        <path d="M32 5 C37 15 50 21 50 38 C50 50 42 59 32 59 C22 59 14 50 14 38 C14 29 19 24 22 15 C25.5 21 26 25 28 28 C28 20 29.5 12 32 5 Z" fill={active ? "#ff7627" : "#c3c8d4"} stroke={face ? "#70411f" : "#ff9a31"} strokeWidth={face ? 1.6 : 1} />
        <path className={active ? "td-streak-flame-core" : undefined} d="M32 25 C36 31 43 35 43 44 C43 51 38 56 32 56 C26 56 21 51 21 44 C21 37 27 33 32 25 Z" fill={active ? "#ffd244" : "#e8eaf0"} />
        {face ? <g fill="none" stroke="#553323" strokeWidth="1.5" strokeLinecap="round">
          <path d="M25 42 q2 2 4 0 M35 42 q2 2 4 0 M29.5 47 q2.5 2.5 5 0" />
          <ellipse cx="24" cy="46" rx="2.5" ry="1.4" fill="#f98b74" stroke="none" />
          <ellipse cx="40" cy="46" rx="2.5" ry="1.4" fill="#f98b74" stroke="none" />
        </g> : <path d="M32 39 C34 43 38 46 38 50 A6 6 0 0 1 26 50 C26 46 30 43 32 39 Z" fill={active ? "#fff2ad" : "#f4f5f8"} />}
      </g>
      {active && <g fill="#ffe492">
        <circle className="td-ember" cx="19" cy="21" r="2" />
        <circle className="td-ember" cx="43" cy="16" r="1.5" style={{ animationDelay: "-.8s", "--td-ember-x": "-5px" }} />
      </g>}
    </svg>
  </span>;
}
