import { IconArrowLeft } from "./icons";

const ReviewHeader = ({ backHref = "#" }) => (
    <div className="flex items-center justify-between mb-8">
        <a
            href={backHref}
            className="inline-flex items-center text-white/70 hover:text-white text-sm font-bold transition-colors"
        >
            <IconArrowLeft />
            Quay về
        </a>
        <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            Báo Cáo Kết Quả
        </div>
    </div>
);

export default ReviewHeader;