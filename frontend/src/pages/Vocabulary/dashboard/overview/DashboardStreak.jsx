export default function DashboardStreak({ today }) {
  const currentDay = new Date(`${today}T12:00:00+07:00`).getUTCDay();
  const weekdays = Array.from({ length: 7 }, (_, index) => ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][(currentDay + index + 1) % 7]);
  return (
    <section className="td-pop relative isolate rounded-[30px] overflow-hidden bg-[#4f7cf7] text-white min-h-[340px] px-[22px] pt-[22px] pb-[18px] flex flex-col gap-1.5" style={{ "gridArea": "streak" }}>
      <span aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-full" style={{ "width": "300px", "height": "300px", "background": "rgba(255, 255, 255, 0.12)", "left": "50%", "top": "52%", "margin": "-150px 0px 0px -150px" }} />
      <span aria-hidden="true" className="pointer-events-none inline-block td-float absolute right-3 top-3 z-[4] opacity-95" style={{ "width": "70px", "height": "43.4px" }}>
        <svg viewBox="0 0 82 50" width="100%" height="100%" overflow="visible">
          <g transform="translate(0 3)" fill="rgba(27,29,34,.12)">
            <circle cx="24" cy="30" r="14" />
            <circle cx="41" cy="22" r="17" />
            <circle cx="58" cy="30" r="13" />
            <rect x="11" y="28" width="60" height="17" rx="8.5" />
          </g>
          <g transform="translate(0 0)" fill="#ffffff">
            <circle cx="24" cy="30" r="14" />
            <circle cx="41" cy="22" r="17" />
            <circle cx="58" cy="30" r="13" />
            <rect x="11" y="28" width="60" height="17" rx="8.5" />
          </g>
          <circle cx="35" cy="31" r="2" fill="#1b1d22" />
          <circle cx="48" cy="31" r="2" fill="#1b1d22" />
          <ellipse cx="30" cy="36" rx="3" ry="1.7" fill="#ff8f7a" opacity="0.55" />
          <ellipse cx="53" cy="36" rx="3" ry="1.7" fill="#ff8f7a" opacity="0.55" />
          <path d="M38.5 35.5 q3 2.6 6 0" stroke="#1b1d22" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      <span aria-hidden="true" className="absolute pointer-events-none rounded-full td-float " style={{ "width": "7px", "height": "7px", "background": "rgb(255, 192, 46)", "opacity": "0.9", "animationDelay": "-500ms", "left": "22px", "top": "46%" }} />
      <h2 className="relative z-[5] m-0 text-[26px] leading-none font-bold tracking-[-0.03em]">{"Chuỗi ngày học."}</h2>
      <span className="relative z-[5] self-start text-[12px] font-bold bg-white/20 rounded-full px-2.5 py-1">{"Học một bài hôm nay để bắt đầu chuỗi mới"}</span>
      <div className="flex-1 relative min-h-[170px]">
        <div className="absolute left-1/2 top-1/2 isolate" style={{ "width": "276px", "height": "210px", "margin": "-105px 0px 0px -138px", "transform": "scale(1.25)" }}>
          <svg aria-hidden="true" viewBox="0 0 276 210" width="276" height="210" className="absolute inset-0 z-0 overflow-visible pointer-events-none">
            <path d="M 42 105 A 96 60 0 0 1 234 105" stroke="rgba(255,255,255,.45)" fill="none" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
            <path d="M 20 105 A 118 78 0 0 1 256 105" stroke="rgba(255,255,255,.45)" fill="none" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
          </svg>
          <div className="td-bob absolute z-[2]" style={{ "left": "58px", "top": "25px", "width": "160px", "height": "160px" }}>
            <span aria-hidden="true" className="pointer-events-none inline-block absolute inset-0" style={{ "width": "160px", "height": "160px" }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible">
                <g>
                  <path d="M59.6769 32.8159C59.678 32.8171 59.6799 32.8171 59.6811 32.816L61.8572 30.8637C62.089 30.6557 62.0742 30.2881 61.8264 30.0994L59.903 28.635C59.6806 28.4657 59.6418 28.1463 59.8172 27.9287L61.3339 26.0473C61.5293 25.8049 61.4557 25.4444 61.1809 25.2979L59.0489 24.1618C58.8023 24.0304 58.7127 23.7213 58.8509 23.4784L60.046 21.378C60.2 21.1073 60.0696 20.7634 59.7748 20.6629L57.4874 19.8829C57.2229 19.7927 57.085 19.502 57.1824 19.2401L58.0254 16.9754C58.134 16.6836 57.9501 16.3649 57.6431 16.313L55.2598 15.9099C54.9843 15.8633 54.8016 15.5985 54.8557 15.3244L55.324 12.9531C55.3843 12.6477 55.1517 12.3627 54.8403 12.3607L52.424 12.3451C52.1445 12.3433 51.9217 12.1113 51.9312 11.832L52.0134 9.41618C52.024 9.10493 51.7486 8.86096 51.4409 8.90897L49.0527 9.28161C48.7766 9.32469 48.5194 9.13143 48.484 8.85426L48.1772 6.45693C48.1377 6.14803 47.8267 5.95144 47.5307 6.04822L45.2343 6.79906C44.9687 6.88591 44.6838 6.73639 44.6043 6.46846L43.9171 4.15114C43.8286 3.8526 43.4902 3.7084 43.2135 3.85133L41.0662 4.96077C40.8179 5.08904 40.5128 4.98714 40.3914 4.73544L39.3415 2.55843C39.2062 2.27792 38.849 2.18988 38.5989 2.37539L36.6579 3.81485C36.4334 3.9813 36.1159 3.92971 35.9557 3.70078L34.5699 1.72062C34.3914 1.46552 34.0248 1.43592 33.8076 1.65908L32.1221 3.39132C31.9273 3.59157 31.6056 3.59157 31.4108 3.39132L29.7253 1.65908C29.5081 1.43592 29.1415 1.46552 28.963 1.72062L27.5772 3.70078C27.417 3.92971 27.0995 3.9813 26.875 3.81485L24.934 2.37539C24.6839 2.18988 24.3267 2.27792 24.1914 2.55843L23.1415 4.73544C23.0201 4.98714 22.715 5.08904 22.4667 4.96077L20.3194 3.85133C20.0427 3.7084 19.7043 3.8526 19.6158 4.15114L18.9286 6.46846C18.8491 6.73639 18.5642 6.88591 18.2986 6.79906L16.0022 6.04822C15.7062 5.95144 15.3952 6.14803 15.3557 6.45693L15.0489 8.85426C15.0135 9.13143 14.7563 9.32469 14.4802 9.28161L12.092 8.90897C11.7843 8.86096 11.509 9.10494 11.5195 9.41619L11.6017 11.831C11.6112 12.1102 11.3884 12.3423 11.1089 12.3441L8.69253 12.3597C8.38116 12.3617 8.14853 12.6466 8.20887 12.9521L8.67717 15.3232C8.73132 15.5974 8.5485 15.8622 8.27292 15.9087L5.88999 16.3111C5.58287 16.3629 5.39888 16.6816 5.5075 16.9735L6.35053 19.2391C6.44798 19.501 6.31007 19.7917 6.04557 19.8819L3.75809 20.6618C3.46334 20.7623 3.33291 21.1063 3.48691 21.377L4.68194 23.4773C4.82015 23.7202 4.7306 24.0293 4.48392 24.1607L2.35112 25.2969C2.07623 25.4433 2.00261 25.8039 2.19808 26.0464L3.71467 27.9278C3.89004 28.1453 3.85129 28.4647 3.62899 28.634L1.70633 30.0984C1.4586 30.287 1.44382 30.6546 1.6756 30.8626L3.4741 32.4762C3.68213 32.6628 3.69507 32.9844 3.50271 33.1871L1.83956 34.9403C1.62518 35.1662 1.66955 35.5315 1.93178 35.6996L3.96603 37.0036C4.20134 37.1544 4.26573 37.4698 4.10838 37.7008L2.74849 39.6974C2.57317 39.9548 2.67551 40.3082 2.96126 40.4321L5.17856 41.3934C5.43494 41.5045 5.54904 41.8053 5.43086 42.0586L4.40853 44.2492C4.27682 44.5314 4.43456 44.8637 4.73647 44.9401L7.07894 45.533C7.3499 45.6016 7.5108 45.8803 7.43469 46.1493L6.7766 48.4749C6.6918 48.7745 6.90078 49.0774 7.21106 49.1044L9.61794 49.3141C9.89635 49.3383 10.0998 49.5876 10.0679 49.8652L9.7916 52.2658C9.75599 52.5752 10.0108 52.8406 10.3214 52.8175L12.7313 52.6383C13.01 52.6175 13.2509 52.8309 13.2639 53.11L13.3765 55.5234C13.3911 55.8345 13.6851 56.0555 13.9879 55.9829L16.3377 55.4197C16.6094 55.3546 16.8813 55.5265 16.939 55.7999L17.4378 58.1656C17.502 58.4703 17.8278 58.6413 18.1151 58.521L20.3444 57.5873C20.6022 57.4793 20.8982 57.6054 20.999 57.8661L21.8703 60.1202C21.9826 60.4107 22.3315 60.5272 22.5958 60.3624L24.6466 59.0837C24.8838 58.9359 25.1962 59.0129 25.3374 59.2541L26.5587 61.3396C26.7161 61.6083 27.0792 61.6674 27.3137 61.4623L29.1328 59.8713C29.3431 59.6873 29.6638 59.7132 29.8419 59.9286L31.3819 61.7909C31.5804 62.0309 31.9484 62.0309 32.1468 61.7909L33.6867 59.9287C33.8648 59.7133 34.1856 59.6874 34.396 59.8714L36.2142 61.4622C36.4486 61.6673 36.8117 61.6083 36.9692 61.3396L38.1903 59.255C38.3315 59.0139 38.6439 58.9369 38.881 59.0847L40.932 60.3634C41.1962 60.5282 41.5451 60.4117 41.6574 60.1213L42.5287 57.8672C42.6295 57.6065 42.9255 57.4804 43.1833 57.5883L45.4127 58.522C45.7 58.6423 46.0257 58.4714 46.09 58.1666L46.5888 55.801C46.6464 55.5276 46.9183 55.3556 47.1901 55.4207L49.5398 55.9839C49.8426 56.0565 50.1367 55.5244 50.2638 53.1101C50.2769 52.8309 50.5177 52.6175 50.7964 52.6383L53.2063 52.8175C53.5169 52.8406 53.7717 52.5752 53.7361 52.2659L53.4599 49.8652C53.4279 49.5876 53.6314 49.3383 53.9098 49.3141L56.3168 49.1044C56.627 49.0773 56.836 48.7746 56.7513 48.475L56.0939 46.1492C56.0178 45.8803 56.1788 45.6016 56.4497 45.5331L58.7933 44.9401C59.0952 44.8637 59.2529 44.5313 59.1212 44.2491L58.099 42.0586C57.9808 41.8053 58.0949 41.5045 58.3513 41.3934L60.5686 40.432C60.8543 40.3082 60.9567 39.9548 60.7814 39.6974L59.4213 37.6997C59.264 37.4687 59.3284 37.1534 59.5637 37.0026L61.5981 35.6985C61.8603 35.5305 61.9047 35.1652 61.6904 34.9392L59.6769 32.8159Z" fill="#c9d5fb" stroke="#7d8fc9" strokeWidth="0.5" strokeLinejoin="round" />
                </g>
                <circle cx="31.77" cy="31.74" r="23.2" fill="#F3ECD2" stroke="#1f2937" strokeWidth="0.5" />
              </svg>
            </span>
            <div className="absolute rounded-full bg-white shadow-[0_14px_24px_-10px_rgba(20,40,120,.45)] flex flex-col items-center justify-center leading-none text-[#1b1d22]" style={{ "left": "24px", "top": "24px", "width": "112px", "height": "112px" }}>
              <span className="flex items-end gap-px -mt-0.5">
                <span aria-hidden="true" className="pointer-events-none inline-block " style={{ "width": "36px", "height": "36px" }}>
                  <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                    <path d="M32 5 C37 15 50 21 50 38 C50 50 42 59 32 59 C22 59 14 50 14 38 C14 29 19 24 22 15 C25.5 21 26 25 28 28 C28 20 29.5 12 32 5 Z" fill="#c3c8d4" stroke="#1b1d22" strokeWidth="1.6" />
                    <path d="M32 25 C36 31 43 35 43 44 C43 51 38 56 32 56 C26 56 21 51 21 44 C21 37 27 33 32 25 Z" fill="#e8eaf0" />
                    <g>
                      <ellipse cx="24.3" cy="46.5" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                      <ellipse cx="39.7" cy="46.5" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                      <path d="M25.7 42.5 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      <path d="M34.7 42.5 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      <path d="M29.4 46.5 q2.6 2.4 5.2 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </g>
                    <path d="M47 12 h5 l-5 6 h5" stroke="#1b1d22" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
                <span className="font-bold tracking-[-0.05em]" style={{ "fontSize": "46px" }}>{"0"}</span>
              </span>
              <span className="text-[11.5px] font-extrabold text-[#5a5f6b] mt-1.5">{"ngày liên tiếp"}</span>
            </div>
          </div>
          <svg aria-hidden="true" viewBox="0 0 276 210" width="276" height="210" className="absolute inset-0 z-[4] overflow-visible pointer-events-none">
            <path d="M 42 105 A 96 60 0 0 0 234 105" stroke="rgba(255,255,255,.55)" fill="none" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
            <path d="M 20 105 A 118 78 0 0 0 256 105" stroke="rgba(255,255,255,.55)" fill="none" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
          </svg>
          <div aria-hidden="true" className="td-planet" style={{ "width": "58px", "height": "58px", "offsetPath": "path(\"M 42 105 A 96 60 0 0 0 234 105 A 96 60 0 0 0 42 105\")", "animationDuration": "20s", "animationDelay": "-1.6s", "zIndex": "5", "--td-at": "8%", "--td-x": "24.9px", "--td-y": "104.9px" }}>
            <span aria-hidden="true" className="pointer-events-none inline-block " style={{ "width": "58px", "height": "58px" }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                <circle cx="32" cy="32" r="20" fill="#20b486" stroke="#1b1d22" strokeWidth="1.6" />
                <circle cx="45" cy="22.5" r="2.6" fill="#169a72" />
                <circle cx="43.5" cy="45" r="2.2" fill="#169a72" />
                <circle cx="21" cy="45" r="1.5" fill="#169a72" />
                <path d="M17.4 29 a15 15 0 0 1 8.6 -11" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <circle cx="27" cy="33" r="4.4" fill="#fff" fillOpacity="0.35" stroke="#1b1d22" strokeWidth="1.4" />
                <circle cx="37" cy="33" r="4.4" fill="#fff" fillOpacity="0.35" stroke="#1b1d22" strokeWidth="1.4" />
                <path d="M31.4 32.4 q0.6 -0.9 1.2 0 M22.6 32 L18.6 30.4 M41.4 32 L45.4 30.4" stroke="#1b1d22" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <path d="M25.2 33 q1.8 1.8 3.6 0 M35.2 33 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <ellipse cx="23.2" cy="39.4" rx="2.4" ry="1.4" fill="#ff8f7a" opacity="0.7" />
                <ellipse cx="40.8" cy="39.4" rx="2.4" ry="1.4" fill="#ff8f7a" opacity="0.7" />
                <path d="M29.6 40 q2.4 2.2 4.8 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </div>
          <div aria-hidden="true" className="td-planet" style={{ "width": "58px", "height": "58px", "offsetPath": "path(\"M 20 105 A 118 78 0 0 0 256 105 A 118 78 0 0 0 20 105\")", "animationDuration": "20s", "animationDelay": "-6.6s", "zIndex": "5", "--td-at": "33%", "--td-x": "165.8px", "--td-y": "144.4px" }}>
            <span aria-hidden="true" className="pointer-events-none inline-block " style={{ "width": "58px", "height": "58px" }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                <circle cx="30" cy="32" r="19" fill="#ff8a5c" stroke="#1b1d22" strokeWidth="1.6" />
                <circle cx="39.5" cy="20.5" r="2.4" fill="#f06a3a" />
                <circle cx="38" cy="45" r="2" fill="#f06a3a" />
                <path d="M15.6 30 a14.5 14.5 0 0 1 6.4 -10" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <ellipse cx="21.5" cy="35.5" rx="2.6" ry="1.5" fill="#ff5d6c" opacity="0.5" />
                <ellipse cx="38.5" cy="35.5" rx="2.6" ry="1.5" fill="#ff5d6c" opacity="0.5" />
                <path d="M23.7 30 q1.8 1.8 3.6 0 M32.7 30 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <path d="M27.4 36 q2.6 2.4 5.2 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </div>
          <div aria-hidden="true" className="td-planet" style={{ "width": "58px", "height": "58px", "offsetPath": "path(\"M 42 105 A 96 60 0 0 0 234 105 A 96 60 0 0 0 42 105\")", "animationDuration": "20s", "animationDelay": "-11.6s", "zIndex": "1", "--td-at": "57.99999999999999%", "--td-x": "193.1px", "--td-y": "47.1px" }}>
            <span aria-hidden="true" className="pointer-events-none inline-block " style={{ "width": "58px", "height": "58px" }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                <g transform="rotate(-16 32 33)">
                  <path d="M4 33 A28 8.5 0 0 1 60 33" stroke="#1b1d22" strokeWidth="6.4" strokeLinecap="round" fill="none" />
                  <path d="M4 33 A28 8.5 0 0 1 60 33" stroke="#ffc02e" strokeWidth="3.6" strokeLinecap="round" fill="none" />
                </g>
                <circle cx="32" cy="32" r="18" fill="#ff9dbb" stroke="#1b1d22" strokeWidth="1.6" />
                <path d="M17 25.5 q15 -5 30 0" stroke="#ff7fa6" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M25.7 32 q1.8 1.8 3.6 0 M34.7 32 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <ellipse cx="24.3" cy="36" rx="2.6" ry="1.5" fill="#ff5d8f" opacity="0.55" />
                <ellipse cx="39.7" cy="36" rx="2.6" ry="1.5" fill="#ff5d8f" opacity="0.55" />
                <path d="M29.4 36 q2.6 2.4 5.2 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <g transform="rotate(-16 32 33)">
                  <path d="M60 33 A28 8.5 0 0 1 4 33" stroke="#1b1d22" strokeWidth="6.4" strokeLinecap="round" fill="none" />
                  <path d="M60 33 A28 8.5 0 0 1 4 33" stroke="#ffc02e" strokeWidth="3.6" strokeLinecap="round" fill="none" />
                </g>
              </svg>
            </span>
          </div>
          <div aria-hidden="true" className="td-planet" style={{ "width": "58px", "height": "58px", "offsetPath": "path(\"M 20 105 A 118 78 0 0 0 256 105 A 118 78 0 0 0 20 105\")", "animationDuration": "20s", "animationDelay": "-16.6s", "zIndex": "1", "--td-at": "83%", "--td-x": "52.2px", "--td-y": "7.6px" }}>
            <span aria-hidden="true" className="pointer-events-none inline-block " style={{ "width": "58px", "height": "58px" }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%" overflow="visible" strokeLinejoin="round">
                <circle cx="32" cy="35" r="17" fill="#a5e8ff" stroke="#1b1d22" strokeWidth="1.6" />
                <circle cx="40" cy="45" r="2.2" fill="#78cfee" />
                <circle cx="24" cy="45.5" r="1.5" fill="#78cfee" />
                <path d="M14 37 V31 a18 18 0 0 1 36 0 V37" stroke="#1b1d22" strokeWidth="3" strokeLinecap="round" fill="none" />
                <rect x="9" y="29" width="10" height="16" rx="5" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.6" />
                <rect x="45" y="29" width="10" height="16" rx="5" fill="#ffc02e" stroke="#1b1d22" strokeWidth="1.6" />
                <path d="M25.7 34.4 q1.8 1.8 3.6 0 M34.7 34.4 q1.8 1.8 3.6 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <ellipse cx="24.3" cy="39" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                <ellipse cx="39.7" cy="39" rx="2.6" ry="1.5" fill="#ff8f7a" opacity="0.6" />
                <path d="M29.4 39.4 q2.6 2.4 5.2 0" stroke="#1b1d22" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 p-2 rounded-[22px] bg-white/15">
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[0]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[1]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[2]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[3]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[4]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "solid" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[5]}</span>
        </div>
        <div className="relative flex flex-col items-center gap-1 py-1.5 rounded-[15px]" style={{ "background": "transparent" }}>
          <div className="relative z-[2] w-[26px] h-[26px] rounded-full border-2 border-white/70" style={{ "background": "rgba(255, 255, 255, 0.2)", "borderStyle": "dashed" }} />
          <span className="relative z-[2] text-[11px] font-extrabold" style={{ "color": "rgb(255, 255, 255)" }}>{weekdays[6]}</span>
        </div>
      </div>
    </section>
  );
}
