import PersonalWordSetCard from "./PersonalWordSetCard";
import { useSearchParams } from "react-router-dom";

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
                        background: `linear-gradient(${item.bg} 0%, ${item.bg} 36%, rgba(196, 155, 255, 0.2) 72%)`,
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
            </a>
        ))}
    </div>{!hasResults && <p className="py-12 text-center text-d-mute">{"Kh\u00f4ng t\u00ecm th\u1ea5y b\u1ed9 t\u1eeb ph\u00f9 h\u1ee3p."}</p>}</>);
}
