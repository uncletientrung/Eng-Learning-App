import { Plus } from "lucide-react";
import { useNotebookFolders } from "../notebook/notebookStorage";

export default function PersonalWordSetCard({ hidden = false }) {
  const folders = useNotebookFolders();
  const wordCount = folders.reduce((total, folder) => total + folder.wordCount, 0);
  return (
    <button
      type="button"
      data-dashboard-action="notebook"
      hidden={hidden}
      className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] bg-[#232833] text-center text-white select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent active:scale-[0.98]"
    >
      <div className="flex flex-col items-center gap-2 px-6 pt-[26px]">
        <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em]">Bộ từ của bản thân</h3>
        <p className="m-0 text-[14.5px] font-medium leading-[1.45] text-[#c4c8d0]">Tự thêm và ôn tập từ vựng của riêng bạn.</p>
        <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-[#9aa0ab]">Cá nhân · {wordCount} từ</span>
      </div>
      <div className="relative mt-3.5 flex min-h-[220px] flex-1 items-center justify-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px) 0 0 / 30px 30px, linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px) 0 0 / 30px 30px",
            maskImage: "linear-gradient(transparent, #000 45%)",
          }}
        />
        <span className="relative flex flex-col items-center gap-2.5 rounded-[22px] border-2 border-dashed border-white/45 px-[34px] py-[26px] text-[14.5px] font-bold transition-colors duration-200 group-hover:border-[#ffc02e] group-hover:bg-[#ffc02e] group-hover:text-[#1b1d22] group-focus-visible:border-[#ffc02e] group-focus-visible:bg-[#ffc02e] group-focus-visible:text-[#1b1d22]">
          <Plus size={28} aria-hidden="true" />
          Thêm từ của bạn
        </span>
      </div>
    </button>
  );
}
