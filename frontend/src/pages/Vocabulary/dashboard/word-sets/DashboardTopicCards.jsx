import PersonalWordSetCard from "./PersonalWordSetCard";
import { useSearchParams } from "react-router-dom";
import { Volume2 } from "lucide-react";

function TopicPreview({ variant, background }) {
    return (
        <div className="relative mt-3.5 min-h-[220px] flex-1">
            <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px) 0 0 / 30px 30px, linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px) 0 0 / 30px 30px", maskImage: "linear-gradient(transparent, black 45%)" }} />
            {variant === "global" ? (
                <div className="absolute inset-x-[10%] top-4 -bottom-5 flex flex-col gap-[9px] rounded-t-[20px] bg-white px-[18px] pt-[18px] text-left" style={{ boxShadow: "0 -6px 24px -12px rgba(27,29,34,0.3)" }}>
                    <div className="flex items-center gap-2.5">
                        <span className="min-w-0 flex-1 truncate text-[22px] font-bold tracking-[-0.02em]">globalization</span>
                        <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-full" style={{ background }}><Volume2 size={15} /></span>
                    </div>
                    <span className="h-[7px] w-[92%] rounded bg-[#e8eaee]" />
                    <span className="h-[7px] w-[70%] rounded bg-[#e8eaee]" />
                    <span className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#8b909b]">Liên quan</span>
                    <div className="flex flex-wrap gap-1.5">
                        <span className="max-w-full truncate rounded-[8px] px-[9px] py-1 text-[12.5px] font-bold" style={{ background }}>disarmament</span>
                        <span className="max-w-full truncate rounded-[8px] bg-[#f1f3f7] px-[9px] py-1 text-[12.5px] font-bold">labor</span>
                    </div>
                </div>
            ) : (
                <div className="absolute left-[11%] right-[11%] top-2 -bottom-3.5 flex flex-col items-center gap-1.5 rounded-t-[20px] bg-white/55 px-3 pt-3">
                    {[
                        { word: "aesthetic", width: "74%", opacity: 0.55, color: "rgb(159,211,239)" },
                        { word: "symphony", width: "82%", opacity: 0.8, color: "rgb(255,186,59)" },
                        { word: "canvas", width: "96%", opacity: 1, color: "rgb(255,122,61)" },
                        { word: "orchestra", width: "86%", opacity: 0.8, color: "rgb(133,135,248)" },
                    ].map(({ word, width, opacity, color }) => (
                        <div key={word} className="flex items-center gap-2.5 rounded-[12px] bg-white px-3 py-[9px] font-bold" style={{ width, opacity, fontSize: word === "canvas" ? 15 : 13.5, boxShadow: word === "canvas" ? "0 12px 24px -10px rgba(27,29,34,0.35)" : "none" }}>
                            <span aria-hidden="true" className="h-[18px] w-[18px] flex-none rounded-[5px]" style={{ background: color }} />
                            <span className="min-w-0 flex-1 truncate text-left">{word}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DashboardTopicCards({ search = "" }) {
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d").toLowerCase();
  const matches = (title) => normalize(title).includes(normalize(search));
  const personalMatches = matches("Bộ từ của bản thân Thêm từ của bạn Cá nhân");
    const [searchParams] = useSearchParams();
    const activeCat = searchParams.get("cat");
    const standardTopics = [
        {
            title: "Môi trường",
            desc: "Biến đổi khí hậu, tài nguyên và phát triển bền vững.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(196, 155, 255)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/forest.webp",
            animationDelay: "0ms",
        },
        {
            title: "Công nghệ",
            desc: "Thuật ngữ công nghệ, AI và chuyển đổi số.",
            meta: "99 từ · 0% thuộc",
            bg: "rgb(159, 211, 239)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/tech.webp",
            animationDelay: "40ms",
        },
        {
            title: "Xã hội & Văn hóa",
            desc: "Cộng đồng, bản sắc và các vấn đề xã hội.",
            meta: "101 từ · 0% thuộc",
            bg: "rgb(191, 230, 195)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/people.webp",
            animationDelay: "80ms",
        },
        {
            title: "Lịch sử & Khảo cổ học",
            desc: "Văn minh, di sản và khám phá khảo cổ học.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(255, 122, 61)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/ruins.webp",
            animationDelay: "120ms",
        },
        {
            title: "Kinh tế & Kinh doanh",
            desc: "Thị trường, thương mại và tài chính.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(255, 186, 59)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/business.webp",
            animationDelay: "160ms",
        },
        {
            title: "Sức khỏe & Y tế",
            desc: "Y học, dịch tễ và lối sống lành mạnh.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(133, 135, 248)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/doctor.webp",
            animationDelay: "200ms",
        },
        {
            title: "Giáo dục & Tâm lý học",
            desc: "Học tập, nhận thức và hành vi con người.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(255, 158, 193)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/students.webp",
            animationDelay: "240ms",
        },
        {
            title: "Đô thị & Kiến trúc",
            desc: "Quy hoạch, xây dựng và không gian sống.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(134, 220, 203)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/city.webp",
            animationDelay: "280ms",
        },
        {
            title: "Truyền thông & Báo chí",
            desc: "Báo chí, mạng xã hội và dư luận.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(196, 155, 255)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/news.webp",
            animationDelay: "320ms",
        },
        {
            title: "Vấn đề Toàn cầu",
            desc: "Toàn cầu hóa, di cư và hợp tác quốc tế.",
            meta: "100 từ · 0% thuộc",
            bg: "rgb(159, 211, 239)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/earth.webp",
            animationDelay: "360ms",
            preview: "global",
        },
        {
            title: "Nghệ thuật & Giải trí",
            desc: "Âm nhạc, điện ảnh và văn hóa đại chúng.",
            meta: "20 từ · 0% thuộc",
            bg: "rgb(191, 230, 195)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/concert.webp",
            animationDelay: "400ms",
            preview: "arts",
        },
    ];
    const idiomTopics = [
        {
            title: "Cảm xúc",
            desc: "Thành ngữ về cảm xúc và tâm trạng.",
            meta: "17 thành ngữ",
            bg: "rgb(255, 182, 193)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/happy.webp",
        },
        {
            title: "Tiền bạc và kinh doanh",
            desc: "Diễn tả sắc thái cảm xúc chân thật và đắt giá trong bài thi.",
            meta: "60 thành ngữ · 0% thuộc",
            bg: "rgb(255, 222, 173)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/money.webp",
        },
        {
            title: "Thời gian",
            desc: "Diễn tả sắc thái cảm xúc chân thật và đắt giá trong bài thi.",
            meta: "60 thành ngữ · 0% thuộc",
            bg: "rgb(191, 230, 195)",
            img: "https://media.theieltsdictionary.com/dashboard/vocab-v1/clock.webp",
        },
    ];
    const currentItems = activeCat === "idioms" ? idiomTopics : standardTopics;
    const filteredItems = currentItems.filter((item) => matches(item.title));
    const hasResults = personalMatches || currentItems.some((item) => matches(item.title));
    return (<><div className="vd-topic-grid">
        <PersonalWordSetCard hidden={!personalMatches || activeCat === "idioms"} />
        {filteredItems.map((item, index) => (
            <a
                key={item.title}
                className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent"
                href="#"
                style={{
                    animationDelay: `${index * 40}ms`,
                    background: item.bg,
                    color: "rgb(27, 29, 34)",
                }}
                data-dashboard-action="set-preview"
                data-set-title={item.title}
            >
                <img
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 block h-full w-full object-cover"
                    src={item.img}
                />
                <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                        background: `linear-gradient(${item.bg} 0%, ${item.bg} 36%, ${item.bg.replace("rgb(", "rgba(").replace(")", ", 0.2)")} 72%)`,
                    }}
                />
                <div className="relative z-[2] flex flex-col items-center gap-2 px-6 pt-[26px]">
                    <h3 className="m-0 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]">
                        {item.title}
                    </h3>
                    <p
                        className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]"
                        style={{ color: "rgba(27, 29, 34, 0.72)" }}
                    >
                        {item.desc}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
                        <span
                            className="text-[12px] font-bold uppercase tracking-[0.04em]"
                            style={{ color: "rgba(27, 29, 34, 0.62)" }}
                        >
                            {item.meta}
                        </span>
                    </div>
                </div>
                {item.preview && <TopicPreview variant={item.preview} background={item.bg} />}
            </a>
        ))}
    </div>{!hasResults && <p className="py-12 text-center text-d-mute">{"Kh\u00f4ng t\u00ecm th\u1ea5y b\u1ed9 t\u1eeb ph\u00f9 h\u1ee3p."}</p>}</>);
}
