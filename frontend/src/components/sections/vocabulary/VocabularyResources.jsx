import { ArrowRight, ChevronRight, Layers, Zap } from "lucide-react";
import VocabularySun from "./VocabularySun";

export default function VocabularyResources({ onOpenResource }) {
  return (
    <section aria-labelledby="vocabulary-resources-title" className="mt-24 border-t border-slate-200 pt-20 pb-16">
      <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e8efdb] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#52712f]"><Zap size={14} /> Cambridge Resource</div>
          <h2 id="vocabulary-resources-title" className="mb-2 text-4xl font-bold text-slate-900">1500 Từ vựng IELTS Reading</h2>
          <p className="text-lg font-medium text-slate-500">Hệ thống từ vựng cốt lõi được trích xuất từ 15+ tập Cambridge IELTS.</p>
        </div>
        <button type="button" onClick={() => onOpenResource("flashcard")} className="cursor-pointer flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-white px-5 py-2.5 font-bold text-slate-600 shadow-sm transition hover:border-[#6B8D41] hover:text-[#6B8D41]"><Layers size={18} className="text-[#6B8D41]" /> Học Flashcard <ChevronRight size={16} /></button>
      </div>
      <div className="vocabulary-vault relative overflow-hidden rounded-[2.5rem] bg-[#6B8D41] p-8 shadow-lg shadow-[#6B8D41]/20 md:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="vocabulary-vault-copy relative z-10">
          <div className="mb-6 inline-flex rounded-lg bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#6B8D41] shadow-sm">THEIELTSDICTIONARY</div>
          <h3 className="mb-5 text-4xl leading-[1.05] font-bold tracking-tight text-white md:text-[56px]">Kho từ vựng<br />khổng lồ</h3>
          <p className="mb-8 max-w-110 text-[15px] leading-relaxed font-medium text-white/90">Hàng ngàn từ vựng IELTS theo chủ đề, có ví dụ và audio, giúp bạn học nhanh và nhớ lâu hơn.</p>
          <button type="button" onClick={() => onOpenResource("knowledge")} className="cursor-pointer group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-[#6B8D41] shadow-lg transition hover:scale-[1.02] active:scale-95">Truy cập <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></button>
        </div>
        <div className="vocabulary-sun-scene">
          <div className="vocabulary-sun-bubble">Học từ vựng mỗi ngày<br />– tiến bộ hơn mỗi ngày!<br /><span className="mt-0.5 inline-block text-base">✨</span></div>
          <VocabularySun />
        </div>
      </div>
    </section>
  );
}

