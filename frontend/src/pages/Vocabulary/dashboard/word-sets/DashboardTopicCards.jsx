import PersonalWordSetCard from "./PersonalWordSetCard";
import { Link, useSearchParams } from "react-router-dom";

const artwork = {
  "Môi trường & Sinh thái": ["rgb(196, 155, 255)", "forest"],
  "Khoa học & Công nghệ": ["rgb(159, 211, 239)", "tech"],
  "Xã hội & Văn hóa": ["rgb(191, 230, 195)", "people"],
  "Lịch sử & Khảo cổ học": ["rgb(255, 122, 61)", "ruins"],
  "Kinh tế & Kinh doanh": ["rgb(255, 186, 59)", "business"],
  "Sức khỏe & Y tế": ["rgb(133, 135, 248)", "doctor"],
  "Giáo dục & Tâm lý học": ["rgb(255, 158, 193)", "students"],
  "Đô thị & Kiến trúc": ["rgb(134, 220, 203)", "city"],
  "Truyền thông & Báo chí": ["rgb(196, 155, 255)", "news"],
  "Vấn đề Toàn cầu": ["rgb(159, 211, 239)", "earth"],
  "Nghệ thuật & Giải trí": ["rgb(191, 230, 195)", "concert"],
};

export default function DashboardTopicCards({ search = "", topics = [] }) {
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d").toLowerCase();
  const matches = (title) => normalize(title).includes(normalize(search));
  const personalMatches = matches("Bộ từ của bản thân Thêm từ của bạn Cá nhân");
    const [searchParams] = useSearchParams();
    const activeCat = searchParams.get("cat");
    const standardTopics = topics.map((topic) => {
        const [bg, image] = artwork[topic.name] || ["rgb(191, 230, 195)", null];
        return {
            id: topic.id,
            title: topic.name,
            desc: topic.description,
            meta: `${topic.wordCount} từ`,
            bg,
            img: image ? `https://media.theieltsdictionary.com/dashboard/vocab-v1/${image}.webp` : null,
        };
    });
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
    const isIdioms = activeCat === "idioms";
    const Card = isIdioms ? "a" : Link;
    const currentItems = isIdioms ? idiomTopics : standardTopics;
    const filteredItems = currentItems.filter((item) => matches(item.title));
    const hasResults = personalMatches || currentItems.some((item) => matches(item.title));
    return (<><div className="vd-topic-grid">
        <PersonalWordSetCard hidden={!personalMatches || activeCat === "idioms"} />
        {filteredItems.map((item, index) => (
            <Card
                key={item.id ?? item.title}
                className="td-pop group relative isolate flex min-h-[400px] w-full flex-col overflow-hidden rounded-[26px] text-center select-none cursor-pointer transition-transform duration-200 hover:-translate-y-[5px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-d-accent"
                {...(isIdioms ? {
                    href: "#",
                    "data-dashboard-action": "set-preview",
                    "data-set-title": item.title,
                } : { to: `/vocabulary/flashcard?folder=${encodeURIComponent(item.id)}` })}
                style={{
                    animationDelay: `${index * 40}ms`,
                    background: item.bg,
                    color: "rgb(27, 29, 34)",
                }}
            >
                {item.img && <img
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 block h-full w-full object-cover"
                    src={item.img}
                />}
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
                    {item.desc && <p
                        className="m-0 max-w-[300px] text-[14.5px] font-medium leading-[1.45] [text-wrap:pretty]"
                        style={{ color: "rgba(27, 29, 34, 0.72)" }}
                    >
                        {item.desc}
                    </p>}
                    <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2">
                        <span
                            className="text-[12px] font-bold uppercase tracking-[0.04em]"
                            style={{ color: "rgba(27, 29, 34, 0.62)" }}
                        >
                            {item.meta}
                        </span>
                    </div>
                </div>
            </Card>
        ))}
    </div>{!hasResults && <p className="py-12 text-center text-d-mute">{"Kh\u00f4ng t\u00ecm th\u1ea5y b\u1ed9 t\u1eeb ph\u00f9 h\u1ee3p."}</p>}</>);
}
