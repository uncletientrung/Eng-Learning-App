import { IconRotateCCW, IconBookOpen } from "./icons";

const ReviewActionButtons = ({ retryHref = "#", sameExamHref = "#" }) => (
    <div className="flex items-center gap-3 flex-wrap pb-2">
        <a
            href={retryHref}
            className="inline-flex items-center gap-2 bg-white text-[#1e3006] font-bold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors text-sm shadow-md"
        >
            <IconRotateCCW /> Làm lại bài
        </a>
        <a
            href={sameExamHref}
            className="inline-flex items-center gap-1.5 bg-emerald-500/30 border border-emerald-300/40 text-white font-bold px-5 py-2.5 rounded-full hover:bg-emerald-500/40 transition-colors text-sm shadow-md"
        >
            <IconBookOpen /> Xem Cùng Đề Bài
        </a>
    </div>
);

export default ReviewActionButtons;