export default function CalendarDecoration() {
    return (
        <div className="absolute right-7 -top-[18px] rotate-[8deg] pointer-events-none">
            <span aria-hidden="true" className="pointer-events-none inline-block td-bob drop-shadow-[0_12px_12px_rgba(0,0,0,.18)]" style={{ "width": "60px", "height": "60px" }}>
                <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                    <rect x="10" y="13" width="44" height="44" rx="8" fill="#fff" stroke="#1b1d22" strokeWidth="1.6" />
                    <path d="M10 25 V21 a8 8 0 0 1 8 -8 H46 a8 8 0 0 1 8 8 V25 Z" fill="#f0512d" stroke="#1b1d22" strokeWidth="1.6" />
                    <rect x="20" y="7" width="5" height="11" rx="2.5" fill="#1b1d22" />
                    <rect x="39" y="7" width="5" height="11" rx="2.5" fill="#1b1d22" />
                    <path d="M32 22.5 c-1.6 -2.4 -5 -1.2 -3.8 1.3 c.7 1.4 3.8 3.5 3.8 3.5 s3.1 -2.1 3.8 -3.5 c1.2 -2.5 -2.2 -3.7 -3.8 -1.3 Z" fill="#fff" transform="translate(0 -3)" />
                    <g>
                        <ellipse cx="23.8" cy="43" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                        <ellipse cx="40.2" cy="43" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                        <circle cx="27" cy="39" r="1.8" fill="#1b1d22" />
                        <circle cx="37" cy="39" r="1.8" fill="#1b1d22" />
                        <path d="M29.4 43 q2.6 2.4 5.2 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </g>
                </svg>
            </span>
        </div>
    );
}
