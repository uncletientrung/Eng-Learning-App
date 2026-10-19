export default function DashboardSkills() {
    return (
        <section data-vd-skills className="td-pop relative isolate rounded-[30px] overflow-hidden bg-[#20b486] text-white px-5 py-[22px] flex flex-col gap-2" style={{ "gridArea": "history" }}>
            <span aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-full" style={{ "width": "220px", "height": "220px", "background": "rgba(255, 255, 255, 0.14)", "right": "-60px", "bottom": "-80px" }} />
            <span aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-full" style={{ "width": "120px", "height": "120px", "background": "rgba(255, 255, 255, 0.1)", "left": "-40px", "top": "-50px" }} />
            <div className="relative flex justify-between items-start gap-2.5">
                <div className="min-w-0 flex flex-col gap-1.5">
                    <h2 className="m-0 text-[28px] leading-none font-bold tracking-[-0.03em]">{"Tổng quan kỹ năng."}</h2>
                    <span className="text-[12.5px] font-bold text-white/85">{"Band TB 5 bài gần nhất · 0 bài đã làm"}</span>
                </div>
                <button type="button" data-dashboard-action="history" className="text-[13.5px] font-extrabold whitespace-nowrap pt-1.5 hover:underline underline-offset-[3px] cursor-pointer">{"Xem tất cả"}</button>
            </div>
            <a className="relative z-[1] flex-[1_0_auto] flex items-center gap-2.5 py-2 pl-2 pr-3.5 rounded-[22px] bg-d-card text-d-ink shadow-[0_20px_30px_-18px_rgba(10,70,50,.5)] transition-transform duration-200 hover:translate-x-1 cursor-pointer opacity-75 hover:opacity-100" href="#" data-dashboard-action="unavailable">
                <span className="relative inline-flex shrink-0 items-center justify-center " style={{ "width": "44px", "height": "44px" }}>
                    <svg viewBox="0 0 100 100" width="44" height="44" className="absolute inset-0" aria-hidden="true">
                        <path d="M99.00 50.00L98.79 51.28L98.17 52.52L97.21 53.72L95.98 54.83L94.62 55.87L93.23 56.85L91.93 57.77L90.85 58.68L90.06 59.62L89.60 60.61L89.50 61.70L89.72 62.91L90.20 64.24L90.86 65.68L91.57 67.22L92.24 68.81L92.74 70.39L92.98 71.90L92.89 73.29L92.44 74.50L91.61 75.50L90.45 76.27L89.02 76.82L87.41 77.18L85.70 77.39L84.01 77.54L82.43 77.70L81.04 77.95L79.88 78.36L78.99 78.99L78.36 79.88L77.95 81.04L77.70 82.43L77.54 84.01L77.39 85.70L77.18 87.41L76.82 89.02L76.27 90.45L75.50 91.61L74.50 92.44L73.29 92.89L71.90 92.98L70.39 92.74L68.81 92.24L67.22 91.57L65.68 90.86L64.24 90.20L62.91 89.72L61.70 89.50L60.61 89.60L59.62 90.06L58.68 90.85L57.77 91.93L56.85 93.23L55.87 94.62L54.83 95.98L53.72 97.21L52.52 98.17L51.28 98.79L50.00 99.00L48.72 98.79L47.48 98.17L46.28 97.21L45.17 95.98L44.13 94.62L43.15 93.23L42.23 91.93L41.32 90.85L40.38 90.06L39.39 89.60L38.30 89.50L37.09 89.72L35.76 90.20L34.32 90.86L32.78 91.57L31.19 92.24L29.61 92.74L28.10 92.98L26.71 92.89L25.50 92.44L24.50 91.61L23.73 90.45L23.18 89.02L22.82 87.41L22.61 85.70L22.46 84.01L22.30 82.43L22.05 81.04L21.64 79.88L21.01 78.99L20.12 78.36L18.96 77.95L17.57 77.70L15.99 77.54L14.30 77.39L12.59 77.18L10.98 76.82L9.55 76.27L8.39 75.50L7.56 74.50L7.11 73.29L7.02 71.90L7.26 70.39L7.76 68.81L8.43 67.22L9.14 65.68L9.80 64.24L10.28 62.91L10.50 61.70L10.40 60.61L9.94 59.62L9.15 58.68L8.07 57.77L6.77 56.85L5.38 55.87L4.02 54.83L2.79 53.72L1.83 52.52L1.21 51.28L1.00 50.00L1.21 48.72L1.83 47.48L2.79 46.28L4.02 45.17L5.38 44.13L6.77 43.15L8.07 42.23L9.15 41.32L9.94 40.38L10.40 39.39L10.50 38.30L10.28 37.09L9.80 35.76L9.14 34.32L8.43 32.78L7.76 31.19L7.26 29.61L7.02 28.10L7.11 26.71L7.56 25.50L8.39 24.50L9.55 23.73L10.98 23.18L12.59 22.82L14.30 22.61L15.99 22.46L17.57 22.30L18.96 22.05L20.12 21.64L21.01 21.01L21.64 20.12L22.05 18.96L22.30 17.57L22.46 15.99L22.61 14.30L22.82 12.59L23.18 10.98L23.73 9.55L24.50 8.39L25.50 7.56L26.71 7.11L28.10 7.02L29.61 7.26L31.19 7.76L32.78 8.43L34.32 9.14L35.76 9.80L37.09 10.28L38.30 10.50L39.39 10.40L40.38 9.94L41.32 9.15L42.23 8.07L43.15 6.77L44.13 5.38L45.17 4.02L46.28 2.79L47.48 1.83L48.72 1.21L50.00 1.00L51.28 1.21L52.52 1.83L53.72 2.79L54.83 4.02L55.87 5.38L56.85 6.77L57.77 8.07L58.68 9.15L59.62 9.94L60.61 10.40L61.70 10.50L62.91 10.28L64.24 9.80L65.68 9.14L67.22 8.43L68.81 7.76L70.39 7.26L71.90 7.02L73.29 7.11L74.50 7.56L75.50 8.39L76.27 9.55L76.82 10.98L77.18 12.59L77.39 14.30L77.54 15.99L77.70 17.57L77.95 18.96L78.36 20.12L78.99 21.01L79.88 21.64L81.04 22.05L82.43 22.30L84.01 22.46L85.70 22.61L87.41 22.82L89.02 23.18L90.45 23.73L91.61 24.50L92.44 25.50L92.89 26.71L92.98 28.10L92.74 29.61L92.24 31.19L91.57 32.78L90.86 34.32L90.20 35.76L89.72 37.09L89.50 38.30L89.60 39.39L90.06 40.38L90.85 41.32L91.93 42.23L93.23 43.15L94.62 44.13L95.98 45.17L97.21 46.28L98.17 47.48L98.79 48.72L99.00 50.00Z" fill="#f08c00" />
                    </svg>
                    <span className="relative flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones w-[18px] h-[18px] text-white" aria-hidden="true">
                            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                    </span>
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-[3px] text-left">
                    <span className="text-[11px] font-bold tracking-[0.1em]" style={{ "color": "rgb(240, 140, 0)" }}>{"NGHE · LISTENING"}</span>
                    <span className="text-[13.5px] font-extrabold leading-[1.25] truncate">{"Chưa có bài gần đây"}</span>
                    <span className="text-[11.5px] font-bold text-d-mute truncate">{"Bắt đầu luyện nghe"}</span>
                </div>
                <div className="shrink-0 w-[68px] flex flex-col items-end gap-1">
                    <span className="text-[22px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">{"—"}</span>
                    <span className="text-[10.5px] font-bold text-d-mute whitespace-nowrap">{"chưa có band"}</span>
                    <span className="w-full h-1.5 rounded bg-d-surf2 overflow-hidden">
                        <span className="block h-full rounded transition-[width] duration-[1200ms] [transition-timing-function:cubic-bezier(.2,.8,.2,1)]" style={{ "width": "0%", "background": "rgb(240, 140, 0)" }} />
                    </span>
                </div>
            </a>
            <a className="relative z-[1] flex-[1_0_auto] flex items-center gap-2.5 py-2 pl-2 pr-3.5 rounded-[22px] bg-d-card text-d-ink shadow-[0_20px_30px_-18px_rgba(10,70,50,.5)] transition-transform duration-200 hover:translate-x-1 cursor-pointer opacity-75 hover:opacity-100" href="/speaking">
                <span className="relative inline-flex shrink-0 items-center justify-center " style={{ "width": "44px", "height": "44px" }}>
                    <svg viewBox="0 0 100 100" width="44" height="44" className="absolute inset-0" aria-hidden="true">
                        <path d="M99.00 50.00L98.79 51.28L98.17 52.52L97.21 53.72L95.98 54.83L94.62 55.87L93.23 56.85L91.93 57.77L90.85 58.68L90.06 59.62L89.60 60.61L89.50 61.70L89.72 62.91L90.20 64.24L90.86 65.68L91.57 67.22L92.24 68.81L92.74 70.39L92.98 71.90L92.89 73.29L92.44 74.50L91.61 75.50L90.45 76.27L89.02 76.82L87.41 77.18L85.70 77.39L84.01 77.54L82.43 77.70L81.04 77.95L79.88 78.36L78.99 78.99L78.36 79.88L77.95 81.04L77.70 82.43L77.54 84.01L77.39 85.70L77.18 87.41L76.82 89.02L76.27 90.45L75.50 91.61L74.50 92.44L73.29 92.89L71.90 92.98L70.39 92.74L68.81 92.24L67.22 91.57L65.68 90.86L64.24 90.20L62.91 89.72L61.70 89.50L60.61 89.60L59.62 90.06L58.68 90.85L57.77 91.93L56.85 93.23L55.87 94.62L54.83 95.98L53.72 97.21L52.52 98.17L51.28 98.79L50.00 99.00L48.72 98.79L47.48 98.17L46.28 97.21L45.17 95.98L44.13 94.62L43.15 93.23L42.23 91.93L41.32 90.85L40.38 90.06L39.39 89.60L38.30 89.50L37.09 89.72L35.76 90.20L34.32 90.86L32.78 91.57L31.19 92.24L29.61 92.74L28.10 92.98L26.71 92.89L25.50 92.44L24.50 91.61L23.73 90.45L23.18 89.02L22.82 87.41L22.61 85.70L22.46 84.01L22.30 82.43L22.05 81.04L21.64 79.88L21.01 78.99L20.12 78.36L18.96 77.95L17.57 77.70L15.99 77.54L14.30 77.39L12.59 77.18L10.98 76.82L9.55 76.27L8.39 75.50L7.56 74.50L7.11 73.29L7.02 71.90L7.26 70.39L7.76 68.81L8.43 67.22L9.14 65.68L9.80 64.24L10.28 62.91L10.50 61.70L10.40 60.61L9.94 59.62L9.15 58.68L8.07 57.77L6.77 56.85L5.38 55.87L4.02 54.83L2.79 53.72L1.83 52.52L1.21 51.28L1.00 50.00L1.21 48.72L1.83 47.48L2.79 46.28L4.02 45.17L5.38 44.13L6.77 43.15L8.07 42.23L9.15 41.32L9.94 40.38L10.40 39.39L10.50 38.30L10.28 37.09L9.80 35.76L9.14 34.32L8.43 32.78L7.76 31.19L7.26 29.61L7.02 28.10L7.11 26.71L7.56 25.50L8.39 24.50L9.55 23.73L10.98 23.18L12.59 22.82L14.30 22.61L15.99 22.46L17.57 22.30L18.96 22.05L20.12 21.64L21.01 21.01L21.64 20.12L22.05 18.96L22.30 17.57L22.46 15.99L22.61 14.30L22.82 12.59L23.18 10.98L23.73 9.55L24.50 8.39L25.50 7.56L26.71 7.11L28.10 7.02L29.61 7.26L31.19 7.76L32.78 8.43L34.32 9.14L35.76 9.80L37.09 10.28L38.30 10.50L39.39 10.40L40.38 9.94L41.32 9.15L42.23 8.07L43.15 6.77L44.13 5.38L45.17 4.02L46.28 2.79L47.48 1.83L48.72 1.21L50.00 1.00L51.28 1.21L52.52 1.83L53.72 2.79L54.83 4.02L55.87 5.38L56.85 6.77L57.77 8.07L58.68 9.15L59.62 9.94L60.61 10.40L61.70 10.50L62.91 10.28L64.24 9.80L65.68 9.14L67.22 8.43L68.81 7.76L70.39 7.26L71.90 7.02L73.29 7.11L74.50 7.56L75.50 8.39L76.27 9.55L76.82 10.98L77.18 12.59L77.39 14.30L77.54 15.99L77.70 17.57L77.95 18.96L78.36 20.12L78.99 21.01L79.88 21.64L81.04 22.05L82.43 22.30L84.01 22.46L85.70 22.61L87.41 22.82L89.02 23.18L90.45 23.73L91.61 24.50L92.44 25.50L92.89 26.71L92.98 28.10L92.74 29.61L92.24 31.19L91.57 32.78L90.86 34.32L90.20 35.76L89.72 37.09L89.50 38.30L89.60 39.39L90.06 40.38L90.85 41.32L91.93 42.23L93.23 43.15L94.62 44.13L95.98 45.17L97.21 46.28L98.17 47.48L98.79 48.72L99.00 50.00Z" fill="#4f7cf7" />
                    </svg>
                    <span className="relative flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic w-[18px] h-[18px] text-white" aria-hidden="true">
                            <path d="M12 19v3" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <rect x="9" y="2" width="6" height="13" rx="3" />
                        </svg>
                    </span>
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-[3px] text-left">
                    <span className="text-[11px] font-bold tracking-[0.1em]" style={{ "color": "rgb(79, 124, 247)" }}>{"NÓI · SPEAKING"}</span>
                    <span className="text-[13.5px] font-extrabold leading-[1.25] truncate">{"Chưa có bài gần đây"}</span>
                    <span className="text-[11.5px] font-bold text-d-mute truncate">{"Bắt đầu luyện nói"}</span>
                </div>
                <div className="shrink-0 w-[68px] flex flex-col items-end gap-1">
                    <span className="text-[22px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">{"—"}</span>
                    <span className="text-[10.5px] font-bold text-d-mute whitespace-nowrap">{"chưa có band"}</span>
                    <span className="w-full h-1.5 rounded bg-d-surf2 overflow-hidden">
                        <span className="block h-full rounded transition-[width] duration-[1200ms] [transition-timing-function:cubic-bezier(.2,.8,.2,1)]" style={{ "width": "0%", "background": "rgb(79, 124, 247)" }} />
                    </span>
                </div>
            </a>
            <a className="relative z-[1] flex-[1_0_auto] flex items-center gap-2.5 py-2 pl-2 pr-3.5 rounded-[22px] bg-d-card text-d-ink shadow-[0_20px_30px_-18px_rgba(10,70,50,.5)] transition-transform duration-200 hover:translate-x-1 cursor-pointer opacity-75 hover:opacity-100" href="#" data-dashboard-action="unavailable">
                <span className="relative inline-flex shrink-0 items-center justify-center " style={{ "width": "44px", "height": "44px" }}>
                    <svg viewBox="0 0 100 100" width="44" height="44" className="absolute inset-0" aria-hidden="true">
                        <path d="M99.00 50.00L98.79 51.28L98.17 52.52L97.21 53.72L95.98 54.83L94.62 55.87L93.23 56.85L91.93 57.77L90.85 58.68L90.06 59.62L89.60 60.61L89.50 61.70L89.72 62.91L90.20 64.24L90.86 65.68L91.57 67.22L92.24 68.81L92.74 70.39L92.98 71.90L92.89 73.29L92.44 74.50L91.61 75.50L90.45 76.27L89.02 76.82L87.41 77.18L85.70 77.39L84.01 77.54L82.43 77.70L81.04 77.95L79.88 78.36L78.99 78.99L78.36 79.88L77.95 81.04L77.70 82.43L77.54 84.01L77.39 85.70L77.18 87.41L76.82 89.02L76.27 90.45L75.50 91.61L74.50 92.44L73.29 92.89L71.90 92.98L70.39 92.74L68.81 92.24L67.22 91.57L65.68 90.86L64.24 90.20L62.91 89.72L61.70 89.50L60.61 89.60L59.62 90.06L58.68 90.85L57.77 91.93L56.85 93.23L55.87 94.62L54.83 95.98L53.72 97.21L52.52 98.17L51.28 98.79L50.00 99.00L48.72 98.79L47.48 98.17L46.28 97.21L45.17 95.98L44.13 94.62L43.15 93.23L42.23 91.93L41.32 90.85L40.38 90.06L39.39 89.60L38.30 89.50L37.09 89.72L35.76 90.20L34.32 90.86L32.78 91.57L31.19 92.24L29.61 92.74L28.10 92.98L26.71 92.89L25.50 92.44L24.50 91.61L23.73 90.45L23.18 89.02L22.82 87.41L22.61 85.70L22.46 84.01L22.30 82.43L22.05 81.04L21.64 79.88L21.01 78.99L20.12 78.36L18.96 77.95L17.57 77.70L15.99 77.54L14.30 77.39L12.59 77.18L10.98 76.82L9.55 76.27L8.39 75.50L7.56 74.50L7.11 73.29L7.02 71.90L7.26 70.39L7.76 68.81L8.43 67.22L9.14 65.68L9.80 64.24L10.28 62.91L10.50 61.70L10.40 60.61L9.94 59.62L9.15 58.68L8.07 57.77L6.77 56.85L5.38 55.87L4.02 54.83L2.79 53.72L1.83 52.52L1.21 51.28L1.00 50.00L1.21 48.72L1.83 47.48L2.79 46.28L4.02 45.17L5.38 44.13L6.77 43.15L8.07 42.23L9.15 41.32L9.94 40.38L10.40 39.39L10.50 38.30L10.28 37.09L9.80 35.76L9.14 34.32L8.43 32.78L7.76 31.19L7.26 29.61L7.02 28.10L7.11 26.71L7.56 25.50L8.39 24.50L9.55 23.73L10.98 23.18L12.59 22.82L14.30 22.61L15.99 22.46L17.57 22.30L18.96 22.05L20.12 21.64L21.01 21.01L21.64 20.12L22.05 18.96L22.30 17.57L22.46 15.99L22.61 14.30L22.82 12.59L23.18 10.98L23.73 9.55L24.50 8.39L25.50 7.56L26.71 7.11L28.10 7.02L29.61 7.26L31.19 7.76L32.78 8.43L34.32 9.14L35.76 9.80L37.09 10.28L38.30 10.50L39.39 10.40L40.38 9.94L41.32 9.15L42.23 8.07L43.15 6.77L44.13 5.38L45.17 4.02L46.28 2.79L47.48 1.83L48.72 1.21L50.00 1.00L51.28 1.21L52.52 1.83L53.72 2.79L54.83 4.02L55.87 5.38L56.85 6.77L57.77 8.07L58.68 9.15L59.62 9.94L60.61 10.40L61.70 10.50L62.91 10.28L64.24 9.80L65.68 9.14L67.22 8.43L68.81 7.76L70.39 7.26L71.90 7.02L73.29 7.11L74.50 7.56L75.50 8.39L76.27 9.55L76.82 10.98L77.18 12.59L77.39 14.30L77.54 15.99L77.70 17.57L77.95 18.96L78.36 20.12L78.99 21.01L79.88 21.64L81.04 22.05L82.43 22.30L84.01 22.46L85.70 22.61L87.41 22.82L89.02 23.18L90.45 23.73L91.61 24.50L92.44 25.50L92.89 26.71L92.98 28.10L92.74 29.61L92.24 31.19L91.57 32.78L90.86 34.32L90.20 35.76L89.72 37.09L89.50 38.30L89.60 39.39L90.06 40.38L90.85 41.32L91.93 42.23L93.23 43.15L94.62 44.13L95.98 45.17L97.21 46.28L98.17 47.48L98.79 48.72L99.00 50.00Z" fill="#20a86f" />
                    </svg>
                    <span className="relative flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check w-[18px] h-[18px] text-white" aria-hidden="true">
                            <path d="M12 21V7" />
                            <path d="m16 12 2 2 4-4" />
                            <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
                        </svg>
                    </span>
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-[3px] text-left">
                    <span className="text-[11px] font-bold tracking-[0.1em]" style={{ "color": "rgb(32, 168, 111)" }}>{"ĐỌC · READING"}</span>
                    <span className="text-[13.5px] font-extrabold leading-[1.25] truncate">{"Chưa có bài gần đây"}</span>
                    <span className="text-[11.5px] font-bold text-d-mute truncate">{"Bắt đầu luyện đọc"}</span>
                </div>
                <div className="shrink-0 w-[68px] flex flex-col items-end gap-1">
                    <span className="text-[22px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">{"—"}</span>
                    <span className="text-[10.5px] font-bold text-d-mute whitespace-nowrap">{"chưa có band"}</span>
                    <span className="w-full h-1.5 rounded bg-d-surf2 overflow-hidden">
                        <span className="block h-full rounded transition-[width] duration-[1200ms] [transition-timing-function:cubic-bezier(.2,.8,.2,1)]" style={{ "width": "0%", "background": "rgb(32, 168, 111)" }} />
                    </span>
                </div>
            </a>
            <a className="relative z-[1] flex-[1_0_auto] flex items-center gap-2.5 py-2 pl-2 pr-3.5 rounded-[22px] bg-d-card text-d-ink shadow-[0_20px_30px_-18px_rgba(10,70,50,.5)] transition-transform duration-200 hover:translate-x-1 cursor-pointer opacity-75 hover:opacity-100" href="/writing">
                <span className="relative inline-flex shrink-0 items-center justify-center " style={{ "width": "44px", "height": "44px" }}>
                    <svg viewBox="0 0 100 100" width="44" height="44" className="absolute inset-0" aria-hidden="true">
                        <path d="M99.00 50.00L98.79 51.28L98.17 52.52L97.21 53.72L95.98 54.83L94.62 55.87L93.23 56.85L91.93 57.77L90.85 58.68L90.06 59.62L89.60 60.61L89.50 61.70L89.72 62.91L90.20 64.24L90.86 65.68L91.57 67.22L92.24 68.81L92.74 70.39L92.98 71.90L92.89 73.29L92.44 74.50L91.61 75.50L90.45 76.27L89.02 76.82L87.41 77.18L85.70 77.39L84.01 77.54L82.43 77.70L81.04 77.95L79.88 78.36L78.99 78.99L78.36 79.88L77.95 81.04L77.70 82.43L77.54 84.01L77.39 85.70L77.18 87.41L76.82 89.02L76.27 90.45L75.50 91.61L74.50 92.44L73.29 92.89L71.90 92.98L70.39 92.74L68.81 92.24L67.22 91.57L65.68 90.86L64.24 90.20L62.91 89.72L61.70 89.50L60.61 89.60L59.62 90.06L58.68 90.85L57.77 91.93L56.85 93.23L55.87 94.62L54.83 95.98L53.72 97.21L52.52 98.17L51.28 98.79L50.00 99.00L48.72 98.79L47.48 98.17L46.28 97.21L45.17 95.98L44.13 94.62L43.15 93.23L42.23 91.93L41.32 90.85L40.38 90.06L39.39 89.60L38.30 89.50L37.09 89.72L35.76 90.20L34.32 90.86L32.78 91.57L31.19 92.24L29.61 92.74L28.10 92.98L26.71 92.89L25.50 92.44L24.50 91.61L23.73 90.45L23.18 89.02L22.82 87.41L22.61 85.70L22.46 84.01L22.30 82.43L22.05 81.04L21.64 79.88L21.01 78.99L20.12 78.36L18.96 77.95L17.57 77.70L15.99 77.54L14.30 77.39L12.59 77.18L10.98 76.82L9.55 76.27L8.39 75.50L7.56 74.50L7.11 73.29L7.02 71.90L7.26 70.39L7.76 68.81L8.43 67.22L9.14 65.68L9.80 64.24L10.28 62.91L10.50 61.70L10.40 60.61L9.94 59.62L9.15 58.68L8.07 57.77L6.77 56.85L5.38 55.87L4.02 54.83L2.79 53.72L1.83 52.52L1.21 51.28L1.00 50.00L1.21 48.72L1.83 47.48L2.79 46.28L4.02 45.17L5.38 44.13L6.77 43.15L8.07 42.23L9.15 41.32L9.94 40.38L10.40 39.39L10.50 38.30L10.28 37.09L9.80 35.76L9.14 34.32L8.43 32.78L7.76 31.19L7.26 29.61L7.02 28.10L7.11 26.71L7.56 25.50L8.39 24.50L9.55 23.73L10.98 23.18L12.59 22.82L14.30 22.61L15.99 22.46L17.57 22.30L18.96 22.05L20.12 21.64L21.01 21.01L21.64 20.12L22.05 18.96L22.30 17.57L22.46 15.99L22.61 14.30L22.82 12.59L23.18 10.98L23.73 9.55L24.50 8.39L25.50 7.56L26.71 7.11L28.10 7.02L29.61 7.26L31.19 7.76L32.78 8.43L34.32 9.14L35.76 9.80L37.09 10.28L38.30 10.50L39.39 10.40L40.38 9.94L41.32 9.15L42.23 8.07L43.15 6.77L44.13 5.38L45.17 4.02L46.28 2.79L47.48 1.83L48.72 1.21L50.00 1.00L51.28 1.21L52.52 1.83L53.72 2.79L54.83 4.02L55.87 5.38L56.85 6.77L57.77 8.07L58.68 9.15L59.62 9.94L60.61 10.40L61.70 10.50L62.91 10.28L64.24 9.80L65.68 9.14L67.22 8.43L68.81 7.76L70.39 7.26L71.90 7.02L73.29 7.11L74.50 7.56L75.50 8.39L76.27 9.55L76.82 10.98L77.18 12.59L77.39 14.30L77.54 15.99L77.70 17.57L77.95 18.96L78.36 20.12L78.99 21.01L79.88 21.64L81.04 22.05L82.43 22.30L84.01 22.46L85.70 22.61L87.41 22.82L89.02 23.18L90.45 23.73L91.61 24.50L92.44 25.50L92.89 26.71L92.98 28.10L92.74 29.61L92.24 31.19L91.57 32.78L90.86 34.32L90.20 35.76L89.72 37.09L89.50 38.30L89.60 39.39L90.06 40.38L90.85 41.32L91.93 42.23L93.23 43.15L94.62 44.13L95.98 45.17L97.21 46.28L98.17 47.48L98.79 48.72L99.00 50.00Z" fill="#e5566b" />
                    </svg>
                    <span className="relative flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pen-line w-[18px] h-[18px] text-white" aria-hidden="true">
                            <path d="M13 21h8" />
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        </svg>
                    </span>
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-[3px] text-left">
                    <span className="text-[11px] font-bold tracking-[0.1em]" style={{ "color": "rgb(229, 86, 107)" }}>{"VIẾT · WRITING"}</span>
                    <span className="text-[13.5px] font-extrabold leading-[1.25] truncate">{"Chưa có bài gần đây"}</span>
                    <span className="text-[11.5px] font-bold text-d-mute truncate">{"Bắt đầu luyện viết"}</span>
                </div>
                <div className="shrink-0 w-[68px] flex flex-col items-end gap-1">
                    <span className="text-[22px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap">{"—"}</span>
                    <span className="text-[10.5px] font-bold text-d-mute whitespace-nowrap">{"chưa có band"}</span>
                    <span className="w-full h-1.5 rounded bg-d-surf2 overflow-hidden">
                        <span className="block h-full rounded transition-[width] duration-[1200ms] [transition-timing-function:cubic-bezier(.2,.8,.2,1)]" style={{ "width": "0%", "background": "rgb(229, 86, 107)" }} />
                    </span>
                </div>
            </a>
        </section>
    );
}
