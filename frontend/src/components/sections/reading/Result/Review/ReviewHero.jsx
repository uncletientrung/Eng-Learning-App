import ReviewMascot from "./ReviewMascot";

const ReviewHero = ({
                        title = "Reading",
                        tip = "Mới khởi động thôi, còn nhiều tiềm năng lắm 👀",
                    }) => (
    <div className="flex items-start justify-between mb-6 gap-4">
        <div>
            <p className="text-white/75 font-semibold text-lg mb-1">Kết quả bài</p>
            <div className="bg-[#1e3006] text-white font-black text-4xl md:text-5xl px-4 py-1.5 rounded-xl inline-block tracking-tight">
                {title}
            </div>
        </div>
        <ReviewMascot tip={tip} />
    </div>
);

export default ReviewHero;