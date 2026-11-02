import { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown'
import { ArrowLeft } from 'lucide-react'
import { useLocation } from "react-router-dom";
import MainLayout from '../../components/layout/MainLayout';
import { topics } from './Mock Data/Topics'
import { sidebarLessons } from './Mock Data/Lessons'
import './css/LessonMainContent.css'
export default function Theory() {
    const location = useLocation();
    const [activeParentId] = useState(location.state?.parent_id)
    const [activeParentTitle] = useState(location.state?.parent_title)
    const [activeParentDescription] = useState(location.state?.parent_description)
    const [activeTopic, setActiveTopic] = useState(topics.filter((topic) => topic.parentId == ("category_" + activeParentId))[0])
    const [filteredLessons, setFilteredLessons] = useState(
                                                    sidebarLessons.filter(
                                                    (lesson) => lesson.topic_id == activeTopic.id
        ));
    const [activeLesson, setActiveLesson] = useState(filteredLessons[0]); // Active sidebar item ID
    const lessonRef = useRef(null);

    useEffect(() => {
        lessonRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activeLesson]);

    return (
        <div className="min-h-screen flex flex-col font-sans antialiased text-[#111]" style={{ fontFamily: 'var(--font-nunito), sans-serif' }}>
            <style>{`
        @keyframes tidCtaBounce {
          0%, 60%, 100% { transform: translateY(0) scale(1); }
          75% { transform: translateY(-8px) scale(1.05); }
          90% { transform: translateY(0) scale(1); }
        }
        .tid-cta { animation: tidCtaBounce 5s ease-in-out infinite; }
        .tid-cta:hover { animation-play-state: paused; transform: scale(1.06); }
        .tid-nav { transition: transform .15s, box-shadow .15s, background .15s; }
        .tid-nav:hover { background: #ffd6e0; transform: translateY(-2px); box-shadow: 3px 3px 0 rgba(0,0,0,0.15); }
        .tid-press { transition: transform .15s; }
        .tid-press:hover { transform: translateY(-2px); }
        .tid-noscroll { scrollbar-width: none; }
        .tid-noscroll::-webkit-scrollbar { display: none; }
      `}</style>
            <MainLayout>
            <main className="flex-1">
                <div
                    className="flex h-[100dvh] flex-col overflow-hidden bg-[#6f8f4b] p-3 pb-24 pt-28"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                >
                    {/* Header */}
                    <header className="mx-auto mb-4 flex w-full max-w-[1500px] flex-none flex-wrap items-center justify-between gap-3 rounded-[20px] border-4 border-[#111] bg-white px-4 py-3.5 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:mb-5 md:px-7 md:py-5">
                        
                        <div className="flex items-center gap-10 w-full">
                            <a
                                className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border-2 border-[#111] bg-[#f4f1e6] text-[#111] transition-transform hover:-translate-y-0.5"
                                aria-label="Quay lại Grammar"
                                href="/grammar"
                            >
                                <ArrowLeft size={16} />
                            </a>

                            <div className="flex min-w-0 flex-col flex-1">
                                <h1 className="font-[family-name:var(--font-quicksand)] text-[17px] font-extrabold leading-tight text-[#111] md:text-[26px]">
                                    {activeParentTitle}
                                </h1>

                                <div className="my-1.5 h-px w-full bg-[#dedacd]" />

                                <p className="font-[family-name:var(--font-quicksand)] text-[13px] leading-relaxed text-[#8a8672] md:text-[20px]">
                                    {activeParentDescription}
                                </p>
                            </div>

                        </div>

                    </header>

                    {/* Content Layout */}
                        <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 items-stretch gap-6 min-h-[600px]">
                        {/* Sidebar Navigation with Click Handlers */}
                        <nav className="tid-noscroll h-full overflow-y-auto rounded-[20px] border-4 border-[#111] bg-white p-3.5 shadow-[8px_8px_0_rgba(0,0,0,0.12)] lg:block lg:w-[300px] lg:flex-none hidden">
                            <div className="border-b border-[#e2e2de] last:border-b-0">
                                <Dropdown
                                        value={activeTopic.id}
                                        parent_id={"category_" + activeParentId}
                                        onChange={(topic) => {
                                            const tmpLessons = sidebarLessons.filter(
                                                (lesson) => lesson.topic_id == topic.id
                                            )
                                            setFilteredLessons(tmpLessons)
                                            setActiveTopic(topic);
                                            setActiveLesson(tmpLessons.length > 0 ? tmpLessons[0] : null);
                                        }}
                                />

                                <div className="flex flex-col gap-0.5 pb-2 pl-2.5 pt-1">
                                    {filteredLessons.map((lesson) => {
                                        const isSelected = activeLesson.id === lesson.id;
                                        return (
                                            <div
                                                key={lesson.id}
                                                onClick={() => {
                                                    setActiveLesson(lesson)
                                                    }
                                                }
                                                className={`tid-nav cursor-pointer rounded-lg px-3 py-2.5 ${isSelected ? 'bg-[#e8f0c9]' : 'bg-transparent'
                                                    }`}
                                            >
                                                <div className="text-[13px] font-semibold text-[#222]">{lesson.title}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </nav>

                        {/* Main Section */}
                        <section
                            ref={lessonRef}
                            className="tid-noscroll h-full min-w-0 flex-1 overflow-y-auto rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[8px_8px_0_rgba(0,0,0,0.12)] md:p-8 block">
                            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
                                <div>
                                        <div className="mb-1 font-[family-name:var(--font-quicksand)] text-[13px] font-bold uppercase tracking-[0.5px] text-[#8a8672]">{activeTopic.title}</div>
                                    <h2 className="font-[family-name:var(--font-quicksand)] text-[20px] font-extrabold text-[#111] md:text-[26px] flex flex-wrap items-center gap-2">
                                        <span>{activeLesson.title}</span>
                                    </h2>
                                </div>

                                {/* Tab Switch Buttons */}
                                <div className="flex flex-none flex-wrap items-center gap-2.5">
                                    <button
                                        className={`tid-press cursor whitespace-nowrap rounded-xl border-[3px] border-[#111] px-5 py-2.5 font-[family-name:var(--font-quicksand)] text-[13px] font-bold 'bg-[rgb(47,95,168)] text-white' : 'bg-white text-[#111]'
                                            }`}
                                    >
                                        LÝ THUYẾT
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Content based on Sidebar Selection and Tab */}
                            <div
                                className="py-10 rounded-xl border-2 border-dashed border-[#111] bg-[#fdfbf7]">
                                {/* <h3 className="text-lg font-bold">Nội dung cho chủ đề: {activeLesson.title}</h3>
                                <p className="text-sm text-[#666] mt-1">Đang được cập nhật dữ liệu hiển thị...</p> */}
                                <article className="grammar-content" dangerouslySetInnerHTML={{ __html: activeLesson.contentHTML }} />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            </MainLayout>
        </div>
    );
}