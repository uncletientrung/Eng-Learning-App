import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Dropdown from './Dropdown';
import { getGrammarCategories, getGrammarSections, getGrammarTopics } from '../../services/grammarAPI';
import './css/LessonMainContent.css';

const selectClass = 'mt-2 w-full cursor-pointer rounded-xl border-2 border-[#222] bg-[#fff7d9] px-3 py-3 text-sm font-bold text-[#222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557539] disabled:cursor-not-allowed disabled:opacity-60';

export default function Theory() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const categoryId = Number(searchParams.get('category') ?? location.state?.parent_id);
    const validCategoryId = Number.isSafeInteger(categoryId) && categoryId > 0;
    const [category, setCategory] = useState(null);
    const [topics, setTopics] = useState([]);
    const [activeTopic, setActiveTopic] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [activeLesson, setActiveLesson] = useState(null);
    const [topicsLoading, setTopicsLoading] = useState(true);
    const [lessonsLoading, setLessonsLoading] = useState(false);
    const [topicsError, setTopicsError] = useState('');
    const [lessonsError, setLessonsError] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchTopics() {
            setCategory(null);
            setTopics([]);
            setActiveTopic(null);
            setLessons([]);
            setActiveLesson(null);
            setTopicsError('');

            if (!validCategoryId) {
                setTopicsError('Không tìm thấy chủ đề ngữ pháp. Vui lòng quay lại và chọn một chủ đề.');
                setTopicsLoading(false);
                return;
            }

            setTopicsLoading(true);
            try {
                const [categories, result] = await Promise.all([
                    getGrammarCategories(),
                    getGrammarTopics(categoryId),
                ]);
                if (cancelled) return;
                if (!Array.isArray(categories) || !Array.isArray(result)) {
                    throw new Error('Dữ liệu chủ đề ngữ pháp không hợp lệ.');
                }

                const selectedCategory = categories.find((item) => item.id === categoryId);
                if (!selectedCategory) {
                    setTopicsError('Không tìm thấy chủ đề ngữ pháp. Vui lòng quay lại và chọn một chủ đề.');
                    return;
                }

                setCategory(selectedCategory);
                setTopics(result);
                setActiveTopic(result[0] ?? null);
            } catch (error) {
                if (!cancelled) {
                    console.error('Lỗi tải chủ đề ngữ pháp:', error);
                    setTopicsError('Không thể tải chủ đề ngữ pháp. Vui lòng thử lại sau.');
                }
            } finally {
                if (!cancelled) setTopicsLoading(false);
            }
        }

        fetchTopics();
        return () => { cancelled = true; };
    }, [categoryId, validCategoryId]);

    useEffect(() => {
        let cancelled = false;

        async function fetchLessons() {
            setLessons([]);
            setActiveLesson(null);
            setLessonsError('');

            if (!activeTopic?.id) {
                setLessonsLoading(false);
                return;
            }

            setLessonsLoading(true);
            try {
                const result = await getGrammarSections(activeTopic.id);
                if (cancelled) return;
                if (!Array.isArray(result)) throw new Error('Dữ liệu bài học ngữ pháp không hợp lệ.');
                setLessons(result);
                setActiveLesson(result[0] ?? null);
            } catch (error) {
                if (!cancelled) {
                    console.error('Lỗi tải bài học ngữ pháp:', error);
                    setLessonsError('Không thể tải nội dung ngữ pháp. Vui lòng thử lại sau.');
                }
            } finally {
                if (!cancelled) setLessonsLoading(false);
            }
        }

        fetchLessons();
        return () => { cancelled = true; };
    }, [activeTopic?.id]);

    const lessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson?.id);

    function selectLesson(lesson, scrollToContent = false) {
        setActiveLesson(lesson);
        if (scrollToContent) contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <MainLayout>
            <main
                className="min-h-screen bg-[#6f8f4b] px-4 pb-16 pt-28 text-[#111] sm:px-6"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            >
                <div className="mx-auto max-w-[1400px]">
                    <header className="mb-5 rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[6px_6px_0_rgba(0,0,0,0.15)] sm:p-6">
                        <Link to="/grammar" className="inline-flex items-center gap-2 text-sm font-bold text-[#526b36] hover:underline">
                            <ArrowLeft size={16} aria-hidden="true" /> Tất cả chủ đề
                        </Link>
                        <p className="mt-4 text-xs font-extrabold uppercase tracking-[2px] text-[#7b806b]">Grammar reference</p>
                        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                            {category?.name || 'Ngữ pháp IELTS'}
                        </h1>
                        {category?.description && <p className="mt-2 max-w-4xl text-sm leading-6 text-[#555]">{category.description}</p>}
                    </header>

                    {topicsLoading ? (
                        <div className="rounded-[20px] border-4 border-[#111] bg-white p-8 text-center font-semibold" role="status">Đang tải chủ đề ngữ pháp...</div>
                    ) : topicsError ? (
                        <div className="rounded-[20px] border-4 border-[#111] bg-white p-8 text-center" role="alert">
                            <p className="font-semibold text-[#9b2c2c]">{topicsError}</p>
                            <Link to="/grammar" className="mt-4 inline-flex items-center gap-2 font-bold text-[#526b36] hover:underline">
                                <ArrowLeft size={16} aria-hidden="true" /> Quay lại danh sách
                            </Link>
                        </div>
                    ) : topics.length === 0 ? (
                        <div className="rounded-[20px] border-4 border-[#111] bg-white p-8 text-center font-semibold" role="status">Chủ đề này chưa có bài học.</div>
                    ) : (
                        <div className="grid items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
                            <nav aria-label="Danh sách bài học" className="rounded-[20px] border-4 border-[#111] bg-white p-4 shadow-[6px_6px_0_rgba(0,0,0,0.15)]">
                                <div className="flex items-center gap-2 text-sm font-extrabold">
                                    <BookOpen size={18} aria-hidden="true" /> Nội dung học
                                </div>
                                <label htmlFor="grammar-topic" className="mt-4 block text-xs font-bold uppercase tracking-wide text-[#74786a]">Chủ đề</label>
                                <Dropdown
                                    value={activeTopic?.id ?? ''}
                                    options={topics}
                                    onChange={setActiveTopic}
                                />

                                <label htmlFor="grammar-lesson" className="mt-4 block text-xs font-bold uppercase tracking-wide text-[#74786a] lg:hidden">Bài học</label>
                                <select
                                    id="grammar-lesson"
                                    value={activeLesson?.id ?? ''}
                                    onChange={(event) => selectLesson(lessons.find((lesson) => lesson.id === Number(event.target.value)) ?? null)}
                                    disabled={lessonsLoading || lessons.length === 0}
                                    className={`${selectClass} lg:hidden`}
                                >
                                    {lessonsLoading ? <option value="">Đang tải bài học...</option>
                                        : lessons.length === 0 ? <option value="">Chưa có bài học</option>
                                            : lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
                                </select>

                                <div className="mt-4 hidden lg:block">
                                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#74786a]">Bài học {lessons.length > 0 && `· ${lessons.length} bài`}</p>
                                    {lessonsLoading ? <p className="px-3 py-2 text-sm text-[#555]" role="status">Đang tải bài học...</p>
                                        : lessonsError ? <p className="px-3 py-2 text-sm text-[#9b2c2c]" role="alert">{lessonsError}</p>
                                            : lessons.length === 0 ? <p className="px-3 py-2 text-sm text-[#555]">Chưa có bài học.</p>
                                                : <ol className="space-y-1">
                                                    {lessons.map((lesson, index) => (
                                                        <li key={lesson.id}>
                                                            <button
                                                                type="button"
                                                                onClick={() => selectLesson(lesson, true)}
                                                                aria-current={activeLesson?.id === lesson.id ? 'true' : undefined}
                                                                className={`flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557539] ${activeLesson?.id === lesson.id ? 'bg-[#fff1c2] text-[#5b491c]' : 'text-[#444] hover:bg-[#f5f4ed]'}`}
                                                            >
                                                                <span className="shrink-0 text-xs text-[#7b806b]">{String(index + 1).padStart(2, '0')}</span>
                                                                {lesson.title}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ol>}
                                </div>
                            </nav>

                            <section ref={contentRef} className="min-w-0 scroll-mt-28 rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[6px_6px_0_rgba(0,0,0,0.15)] sm:p-8" aria-label="Nội dung bài học">
                                {lessonsError ? (
                                    <p className="py-12 text-center font-semibold text-[#9b2c2c]" role="alert">{lessonsError}</p>
                                ) : lessonsLoading ? (
                                    <p className="py-12 text-center font-semibold text-[#555]" role="status">Đang tải nội dung ngữ pháp...</p>
                                ) : activeLesson ? (
                                    <>
                                        <p className="text-xs font-extrabold uppercase tracking-wide text-[#75805f]">{activeTopic?.name} · Bài {lessonIndex + 1}/{lessons.length}</p>
                                        <h2 className="mt-2 text-xl font-extrabold leading-snug sm:text-2xl">{activeLesson.title}</h2>
                                        <div className="mt-6 rounded-xl border-2 border-[#e4e6d9] bg-[#fdfbf7] px-4 py-6 sm:px-7 sm:py-8">
                                            <article className="grammar-content" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                                        </div>
                                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#e6e8df] pt-5">
                                            <button type="button" disabled={lessonIndex <= 0} onClick={() => selectLesson(lessons[lessonIndex - 1], true)} className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#222] px-3 py-2.5 text-sm font-bold hover:bg-[#f4f1e6] disabled:cursor-not-allowed disabled:opacity-40">
                                                <ChevronLeft size={17} aria-hidden="true" /> Bài trước
                                            </button>
                                            <button type="button" disabled={lessonIndex < 0 || lessonIndex >= lessons.length - 1} onClick={() => selectLesson(lessons[lessonIndex + 1], true)} className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-[#222] bg-[#ffc926] px-3 py-2.5 text-sm font-bold hover:bg-[#f2b917] disabled:cursor-not-allowed disabled:opacity-40">
                                                Bài tiếp <ChevronRight size={17} aria-hidden="true" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="py-12 text-center font-semibold text-[#555]">Chưa có nội dung ngữ pháp.</p>
                                )}
                            </section>
                        </div>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
