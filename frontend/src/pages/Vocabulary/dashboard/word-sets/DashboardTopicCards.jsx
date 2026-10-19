import PersonalWordSetCard from "./PersonalWordSetCard";

export default function DashboardTopicCards({ search = "" }) {
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d").toLowerCase();
  const matches = (title) => normalize(title).includes(normalize(search));
  const personalMatches = matches("Bộ từ của bản thân Thêm từ của bạn Cá nhân");
  const hasResults = personalMatches || ["Môi trường", "Công nghệ", "Xã hội & Văn hóa", "Lịch sử & Khảo cổ học", "Kinh tế & Kinh doanh", "Sức khỏe & Y tế", "Giáo dục & Tâm lý học", "Đô thị & Kiến trúc", "Truyền thông & Báo chí", "Vấn đề Toàn cầu", "Nghệ thuật & Giải trí"].some(matches);
  return (<><div className="vd-topic-grid">
    <PersonalWordSetCard hidden={!personalMatches} />
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "0ms", "background": "rgb(196, 155, 255)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Môi trường" hidden={!matches("Môi trường")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/forest.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(196, 155, 255) 0%, rgb(196, 155, 255) 36%, rgba(196, 155, 255, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Môi trường"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Biến đổi khí hậu, tài nguyên và phát triển bền vững."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute left-[11%] right-[11%] top-2 -bottom-3.5 flex flex-col items-center gap-1.5 rounded-t-[20px] px-3 pt-3" style={{ "background": "rgba(255, 255, 255, 0.55)" }}>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "74%", "opacity": "0.55", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(159, 211, 239)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"arid"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "82%", "opacity": "0.8", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(255, 186, 59)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"biosphere"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "96%", "opacity": "1", "fontSize": "15px", "boxShadow": "rgba(27, 29, 34, 0.35) 0px 12px 24px -10px" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(255, 122, 61)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"drought"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "86%", "opacity": "0.8", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(133, 135, 248)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"forest"}</span>
          </div>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "40ms", "background": "rgb(159, 211, 239)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Công nghệ" hidden={!matches("Công nghệ")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/tech.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(159, 211, 239) 0%, rgb(159, 211, 239) 36%, rgba(159, 211, 239, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Công nghệ"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Thuật ngữ công nghệ, AI và chuyển đổi số."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"99 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute inset-x-0 top-10 flex flex-nowrap justify-center gap-1.5 px-3.5">
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "transform": "translateY(0px) rotate(-6deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"C"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(31, 111, 150)", "color": "rgb(255, 255, 255)", "transform": "translateY(10px) rotate(4deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"O"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "transform": "translateY(-4px) rotate(-3deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"N"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "transform": "translateY(8px) rotate(5deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"V"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(31, 111, 150)", "color": "rgb(255, 255, 255)", "transform": "translateY(-2px) rotate(-4deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"E"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "transform": "translateY(10px) rotate(3deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"R"}</span>
          <span className="flex h-[44px] w-[38px] flex-none items-center justify-center rounded-[9px] text-[21px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "transform": "translateY(0px) rotate(-5deg)", "boxShadow": "rgba(27, 29, 34, 0.22) 0px 4px 0px, rgba(27, 29, 34, 0.35) 0px 12px 18px -10px" }}>{"T"}</span>
        </div>
        <div className="absolute inset-x-0 bottom-[22px] flex flex-wrap justify-center gap-2 px-[18px]">
          <span className="max-w-[46%] truncate rounded-full px-3 py-[5px] text-[12.5px] font-bold" style={{ "background": "rgba(255, 255, 255, 0.7)" }}>{"cybersecurity"}</span>
          <span className="max-w-[46%] truncate rounded-full px-3 py-[5px] text-[12.5px] font-bold" style={{ "background": "rgba(255, 255, 255, 0.7)" }}>{"scalability"}</span>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "80ms", "background": "rgb(191, 230, 195)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Xã hội & Văn hóa" hidden={!matches("Xã hội & Văn hóa")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/people.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(191, 230, 195) 0%, rgb(191, 230, 195) 36%, rgba(191, 230, 195, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Xã hội & Văn hóa"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Cộng đồng, bản sắc và các vấn đề xã hội."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"101 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <span className="absolute left-1/2 -bottom-[170px] -ml-[170px] h-[340px] w-[340px] rounded-full" style={{ "background": "rgba(255, 255, 255, 0.22)" }} />
        <span className="absolute left-1/2 -bottom-[120px] -ml-[120px] h-[240px] w-[240px] rounded-full" style={{ "background": "rgba(255, 255, 255, 0.32)" }} />
        <span className="absolute left-1/2 -bottom-[70px] -ml-[70px] h-[140px] w-[140px] rounded-full bg-white" style={{ "boxShadow": "rgba(27, 29, 34, 0.25) 0px 10px 30px -8px" }} />
        <div className="absolute inset-x-0 bottom-3.5 flex flex-col items-center gap-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2c8a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <span className="text-[13px] font-bold" style={{ "color": "rgb(44, 138, 74)" }}>{"0%"}</span>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "120ms", "background": "rgb(255, 122, 61)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Lịch sử & Khảo cổ học" hidden={!matches("Lịch sử & Khảo cổ học")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/ruins.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(255, 122, 61) 0%, rgb(255, 122, 61) 36%, rgba(255, 122, 61, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Lịch sử & Khảo cổ học"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Văn minh, di sản và khám phá khảo cổ học."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute inset-x-[18px] top-2.5 bottom-4 flex flex-col justify-end gap-2">
          <span className="max-w-[86%] self-start truncate rounded-[18px_18px_18px_4px] bg-white px-3.5 py-[9px] text-[14px] font-bold" style={{ "boxShadow": "rgba(27, 29, 34, 0.35) 0px 8px 16px -10px" }}>{"Nghĩa của “artifact”?"}</span>
          <span className="max-w-[86%] self-end truncate rounded-[18px_18px_4px_18px] px-3.5 py-[9px] text-[14px] font-bold text-white" style={{ "background": "rgb(27, 29, 34)" }}>{"Xem cùng “heirloom”"}</span>
          <span className="flex gap-1 self-start rounded-[18px_18px_18px_4px] bg-white px-3.5 py-3">
            <span className="h-[7px] w-[7px] rounded-full" style={{ "background": "rgb(178, 58, 14)", "opacity": "1" }} />
            <span className="h-[7px] w-[7px] rounded-full" style={{ "background": "rgb(178, 58, 14)", "opacity": "0.6" }} />
            <span className="h-[7px] w-[7px] rounded-full" style={{ "background": "rgb(178, 58, 14)", "opacity": "0.3" }} />
          </span>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "160ms", "background": "rgb(255, 186, 59)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Kinh tế & Kinh doanh" hidden={!matches("Kinh tế & Kinh doanh")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/business.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(255, 186, 59) 0%, rgb(255, 186, 59) 36%, rgba(255, 186, 59, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Kinh tế & Kinh doanh"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Thị trường, thương mại và tài chính."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute left-[12%] -bottom-[30px] flex h-[170px] w-[44%] -rotate-[9deg] flex-col gap-2 rounded-[14px] bg-[#f4f4f6] px-3.5 py-[18px]" style={{ "boxShadow": "rgba(27, 29, 34, 0.35) 0px 10px 24px -12px" }}>
          <span className="h-2 w-[70%] rounded bg-[#d6d8de]" />
          <span className="h-2 w-1/2 rounded bg-[#d6d8de]" />
        </div>
        <div className="absolute right-[12%] -bottom-[30px] flex h-[170px] w-[44%] rotate-[9deg] flex-col items-end gap-2 rounded-[14px] bg-[#f4f4f6] px-3.5 py-[18px]" style={{ "boxShadow": "rgba(27, 29, 34, 0.35) 0px 10px 24px -12px" }}>
          <span className="h-2 w-[60%] rounded bg-[#d6d8de]" />
          <span className="h-2 w-[40%] rounded bg-[#d6d8de]" />
        </div>
        <div className="absolute left-1/2 -bottom-6 -ml-[25%] flex h-[200px] w-1/2 flex-col items-start gap-[9px] rounded-[16px_30px_16px_16px] bg-white px-4 py-[18px] text-left" style={{ "boxShadow": "rgba(27, 29, 34, 0.4) 0px 16px 30px -12px" }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ "background": "rgb(255, 186, 59)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column" aria-hidden="true">
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </span>
          <span className="w-full truncate text-[15px] font-bold">{"monopoly"}</span>
          <span className="h-2 w-[85%] rounded bg-[#e4e6ea]" />
          <span className="h-2 w-[60%] rounded bg-[#e4e6ea]" />
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "200ms", "background": "rgb(133, 135, 248)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Sức khỏe & Y tế" hidden={!matches("Sức khỏe & Y tế")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/doctor.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(133, 135, 248) 0%, rgb(133, 135, 248) 36%, rgba(133, 135, 248, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Sức khỏe & Y tế"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Y học, dịch tễ và lối sống lành mạnh."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute left-1/2 top-[18px] -ml-[85px] flex h-[170px] w-[170px] items-center justify-center rounded-full" style={{ "background": "conic-gradient(rgb(61, 63, 192) 0deg, rgb(61, 63, 192) 3%, rgba(255, 255, 255, 0.55) 0deg)", "boxShadow": "rgba(27, 29, 34, 0.4) 0px 16px 30px -14px" }}>
          <div className="flex h-[124px] w-[124px] flex-col items-center justify-center gap-0.5 rounded-full bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3d3fc0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope" aria-hidden="true">
              <path d="M11 2v2" />
              <path d="M5 2v2" />
              <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
              <path d="M8 15a6 6 0 0 0 12 0v-3" />
              <circle cx="20" cy="10" r="2" />
            </svg>
            <span className="text-[22px] font-bold tracking-[-0.02em]">{"0%"}</span>
            <span className="text-[11px] font-bold text-[#8b909b]">{"Đã thuộc"}</span>
          </div>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "240ms", "background": "rgb(255, 158, 193)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Giáo dục & Tâm lý học" hidden={!matches("Giáo dục & Tâm lý học")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/students.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(255, 158, 193) 0%, rgb(255, 158, 193) 36%, rgba(255, 158, 193, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Giáo dục & Tâm lý học"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Học tập, nhận thức và hành vi con người."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute inset-x-[8%] top-[26px] -bottom-4 grid grid-cols-2 gap-2.5 rounded-t-[22px] bg-white p-3.5 text-left">
          <div className="flex flex-col gap-1 rounded-[14px] bg-[#f4f5f7] p-3">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-[11px] font-bold text-[#8b909b]">{"Đã thuộc"}</span>
              <span className="flex gap-[3px]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(229, 72, 42)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(229, 72, 42)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(229, 72, 42)" }} />
              </span>
            </div>
            <span className="text-[24px] font-bold tracking-[-0.02em]">{"0%"}</span>
            <div className="mt-auto h-[22px] overflow-hidden rounded-[6px] bg-[#dfe1e6]">
              <div className="h-full bg-[#e5482a]" style={{ "width": "3%" }} />
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-[14px] bg-[#f4f5f7] p-3">
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-[11px] font-bold text-[#8b909b]">{"Tổng từ"}</span>
              <span className="flex gap-[3px]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(255, 179, 31)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(255, 179, 31)" }} />
                <span className="h-1.5 w-1.5 rounded-full" style={{ "background": "rgb(255, 179, 31)" }} />
              </span>
            </div>
            <span className="text-[24px] font-bold tracking-[-0.02em]">{"100"}</span>
            <div className="mt-auto h-[22px] rounded-[6px] bg-[#ffb31f]" />
          </div>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "280ms", "background": "rgb(134, 220, 203)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Đô thị & Kiến trúc" hidden={!matches("Đô thị & Kiến trúc")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/city.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(134, 220, 203) 0%, rgb(134, 220, 203) 36%, rgba(134, 220, 203, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Đô thị & Kiến trúc"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Quy hoạch, xây dựng và không gian sống."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 top-0 h-[210px] w-full">
          <polyline points="24,14 64,37 28,60 66,83" fill="none" stroke="#1b1d22" strokeOpacity=".35" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute flex max-w-[48%] items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-bold" style={{ "left": "10%", "top": "14px", "boxShadow": "rgba(27, 29, 34, 0.4) 0px 8px 16px -10px" }}>
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[12px] font-bold" style={{ "background": "rgb(22, 128, 107)", "color": "rgb(255, 255, 255)", "border": "1.5px solid rgb(22, 128, 107)" }}>{"1"}</span>
          <span className="truncate">{"urbanization"}</span>
        </span>
        <span className="absolute flex max-w-[48%] items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-bold" style={{ "left": "50%", "top": "62px", "boxShadow": "rgba(27, 29, 34, 0.4) 0px 8px 16px -10px" }}>
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[12px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "border": "1.5px solid rgb(22, 128, 107)" }}>{"2"}</span>
          <span className="truncate">{"pedestrian"}</span>
        </span>
        <span className="absolute flex max-w-[48%] items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-bold" style={{ "left": "14%", "top": "110px", "boxShadow": "rgba(27, 29, 34, 0.4) 0px 8px 16px -10px" }}>
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[12px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "border": "1.5px solid rgb(22, 128, 107)" }}>{"3"}</span>
          <span className="truncate">{"pavement"}</span>
        </span>
        <span className="absolute flex max-w-[48%] items-center gap-2 whitespace-nowrap rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-bold" style={{ "left": "52%", "top": "158px", "boxShadow": "rgba(27, 29, 34, 0.4) 0px 8px 16px -10px" }}>
          <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[12px] font-bold" style={{ "background": "rgb(255, 255, 255)", "color": "rgb(27, 29, 34)", "border": "1.5px solid rgb(22, 128, 107)" }}>{"4"}</span>
          <span className="truncate">{"pillar"}</span>
        </span>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "320ms", "background": "rgb(196, 155, 255)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Truyền thông & Báo chí" hidden={!matches("Truyền thông & Báo chí")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/news.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(196, 155, 255) 0%, rgb(196, 155, 255) 36%, rgba(196, 155, 255, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Truyền thông & Báo chí"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Báo chí, mạng xã hội và dư luận."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <span className="absolute left-1/2 -bottom-[150px] -ml-[150px] h-[300px] w-[300px] rounded-full" style={{ "background": "rgba(255, 255, 255, 0.25)" }} />
        <span className="absolute left-1/2 -bottom-[95px] -ml-[95px] h-[190px] w-[190px] rounded-full" style={{ "background": "rgba(255, 255, 255, 0.35)" }} />
        <span className="absolute max-w-[44%] truncate whitespace-nowrap rounded-[4px] border-[1.5px] bg-white px-3 py-1.5 text-[13.5px] font-bold" style={{ "left": "6%", "top": "6%", "transform": "rotate(-5deg)", "borderColor": "rgb(27, 29, 34)", "boxShadow": "rgb(27, 29, 34) 3px 3px 0px" }}>{"broadcast"}</span>
        <span className="absolute max-w-[44%] truncate whitespace-nowrap rounded-[4px] border-[1.5px] bg-white px-3 py-1.5 text-[13.5px] font-bold" style={{ "left": "52%", "top": "2%", "transform": "rotate(6deg)", "borderColor": "rgb(27, 29, 34)", "boxShadow": "rgb(27, 29, 34) 3px 3px 0px" }}>{"press release"}</span>
        <span className="absolute max-w-[44%] truncate whitespace-nowrap rounded-[4px] border-[1.5px] bg-white px-3 py-1.5 text-[13.5px] font-bold" style={{ "left": "10%", "top": "40%", "transform": "rotate(4deg)", "borderColor": "rgb(27, 29, 34)", "boxShadow": "rgb(27, 29, 34) 3px 3px 0px" }}>{"periodical"}</span>
        <span className="absolute max-w-[44%] truncate whitespace-nowrap rounded-[4px] border-[1.5px] bg-white px-3 py-1.5 text-[13.5px] font-bold" style={{ "left": "50%", "top": "52%", "transform": "rotate(-4deg)", "borderColor": "rgb(27, 29, 34)", "boxShadow": "rgb(27, 29, 34) 3px 3px 0px" }}>{"pundit"}</span>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "360ms", "background": "rgb(159, 211, 239)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Vấn đề Toàn cầu" hidden={!matches("Vấn đề Toàn cầu")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/earth.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(159, 211, 239) 0%, rgb(159, 211, 239) 36%, rgba(159, 211, 239, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Vấn đề Toàn cầu"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Toàn cầu hóa, di cư và hợp tác quốc tế."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"100 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute inset-x-[10%] top-4 -bottom-5 flex flex-col gap-[9px] rounded-t-[20px] bg-white px-[18px] pt-[18px] text-left" style={{ "boxShadow": "rgba(27, 29, 34, 0.3) 0px -6px 24px -12px" }}>
          <div className="flex items-center gap-2.5">
            <span className="min-w-0 flex-1 truncate text-[22px] font-bold tracking-[-0.02em]">{"globalization"}</span>
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full" style={{ "background": "rgb(159, 211, 239)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume2 lucide-volume-2" aria-hidden="true">
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
              </svg>
            </span>
          </div>
          <span className="h-[7px] w-[92%] rounded bg-[#e8eaee]" />
          <span className="h-[7px] w-[70%] rounded bg-[#e8eaee]" />
          <span className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#8b909b]">{"Liên quan"}</span>
          <div className="flex flex-wrap gap-1.5">
            <span className="max-w-full truncate rounded-[8px] px-[9px] py-1 text-[12.5px] font-bold" style={{ "background": "rgb(159, 211, 239)" }}>{"disarmament"}</span>
            <span className="max-w-full truncate rounded-[8px] bg-[#f1f3f7] px-[9px] py-1 text-[12.5px] font-bold">{"labor"}</span>
          </div>
        </div>
      </div>
    </a>
    <a className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent" href="#" style={{ "animationDelay": "400ms", "background": "rgb(191, 230, 195)", "color": "rgb(27, 29, 34)" }} data-dashboard-action="set-preview" data-set-title="Nghệ thuật & Giải trí" hidden={!matches("Nghệ thuật & Giải trí")}>
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-20 block h-full w-full object-cover" src="https://media.theieltsdictionary.com/dashboard/vocab-v1/concert.webp" />
      <span aria-hidden="true" className="absolute inset-0 -z-10" style={{ "background": "linear-gradient(rgb(191, 230, 195) 0%, rgb(191, 230, 195) 36%, rgba(191, 230, 195, 0.2) 72%)" }} />
      <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">{"Nghệ thuật & Giải trí"}</h3>
        <p className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]" style={{ "color": "rgba(27, 29, 34, 0.72)" }}>{"Âm nhạc, điện ảnh và văn hóa đại chúng."}</p>
        <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[12px] font-bold uppercase tracking-[0.04em]" style={{ "color": "rgba(27, 29, 34, 0.62)" }}>{"20 từ · 0% thuộc"}</span>
        </div>
      </div>
      <div className="relative mt-3.5 min-h-[220px] flex-1">
        <span aria-hidden="true" className="absolute inset-0" style={{ "background": "linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px, linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px) 0px 0px / 30px 30px", "maskImage": "linear-gradient(transparent, rgb(0, 0, 0) 45%)" }} />
        <div className="absolute left-[11%] right-[11%] top-2 -bottom-3.5 flex flex-col items-center gap-1.5 rounded-t-[20px] px-3 pt-3" style={{ "background": "rgba(255, 255, 255, 0.55)" }}>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "74%", "opacity": "0.55", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(159, 211, 239)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"aesthetic"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "82%", "opacity": "0.8", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(255, 186, 59)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"symphony"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "96%", "opacity": "1", "fontSize": "15px", "boxShadow": "rgba(27, 29, 34, 0.35) 0px 12px 24px -10px" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(255, 122, 61)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"canvas"}</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ "width": "86%", "opacity": "0.8", "fontSize": "13.5px", "boxShadow": "none" }}>
            <span className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ "background": "rgb(133, 135, 248)" }} />
            <span className="min-w-0 flex-1 truncate text-left">{"orchestra"}</span>
          </div>
        </div>
      </div>
    </a>
  </div>{!hasResults && <p className="py-12 text-center text-d-mute">{"Kh\u00f4ng t\u00ecm th\u1ea5y b\u1ed9 t\u1eeb ph\u00f9 h\u1ee3p."}</p>}</>);
}
