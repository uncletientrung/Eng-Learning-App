import { getGrammarCategories } from '../../services/grammarAPI'
import { getRandomIcons } from "../../utils/iconLibrary";
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import LinkButton from '../../components/ui/LinkButton';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function GrammarReferencePage() {
    const [categoryIcons, setCategoryIcons] = useState([]);
    const [grammarCategories, setGrammarCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                setError('');
                const fetchGrammarCategories = await getGrammarCategories();
                const categories = Array.isArray(fetchGrammarCategories) ? fetchGrammarCategories : [];

                setGrammarCategories(categories);
                setCategoryIcons(getRandomIcons(categories.length, "education"))
            } catch (err) {
                console.error('Lỗi tải dữ liệu:', err);
                setError('Không thể tải danh sách chủ đề ngữ pháp. Vui lòng thử lại sau.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <MainLayout>
        <section className="relative flex min-h-[101vh] w-full flex-col overflow-hidden bg-brand">
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'linear-gradient(rgb(255,255,255) 1px, transparent 1px), linear-gradient(90deg, rgb(255,255,255) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />
            <main className="relative z-10 mx-auto mb-10 mt-32 w-[calc(100%-2rem)] max-w-[1400px] flex-grow rounded-[24px] border-4 border-[#111] bg-white px-6 pb-20 pt-8 shadow-[0_18px_50px_rgba(31,41,55,0.10)] md:w-[calc(100%-3rem)] md:px-10 lg:px-12">
                <header className="mb-8">
                    <LinkButton to="/" backgroundColor="bg-white" textColor="text-black" className="px-10 py-2">
                        <ArrowLeft size={16} />
                        Trở về
                    </LinkButton>
                    <h1 
                        className="mt-5 text-4xl md:text-5xl font-black text-[#1e3006] mb-4 tracking-tight leading-tight" 
                        style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}>
                        GRAMMAR REFERENCE {' '}
                    </h1>
                    <p className="mt-3 text-slate-500 text-lg font-medium" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>
                         Ôn tập ngữ pháp IELTS theo từng chủ đề, từ các từ loại đến những cấu trúc nâng cao.
                    </p>
                </header>

                    <section aria-labelledby="grammar-categories-heading">
                    
                    {/* Main Layout */}
                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            <p className="rounded-2xl border-2 border-[#111] bg-[#fffdf5] px-4 py-6 text-center font-semibold text-[#555]" role="status">
                                Đang tải danh sách chủ đề ngữ pháp...
                            </p>
                        ) : error ? (
                            <p className="rounded-2xl border-2 border-[#111] bg-[#fff0f0] px-4 py-6 text-center font-semibold text-[#9b2c2c]" role="alert">
                                {error}
                            </p>
                        ) : grammarCategories.length === 0 ? (
                            <p className="rounded-2xl border-2 border-[#111] bg-[#fffdf5] px-4 py-6 text-center font-semibold text-[#555]" role="status">
                                Hiện chưa có chủ đề ngữ pháp nào.
                            </p>
                        ) : grammarCategories.map((category, index) => {
                            const Icon = categoryIcons[index];

                            return (
                                <Link
                                    key={category.id}
                                    to={`/grammar/theory?category=${category.id}`}
                                    className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#111] bg-[#fffdf5] px-4 py-4 transition-all hover:-translate-y-0.5 hover:bg-[#ffd6e0] hover:shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <span
                                            className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border-2 border-[#111]"
                                            style={{ color: category.iconColor }}
                                        >
                                            {Icon && <Icon size={24} />}
                                        </span>

                                        <div className="min-w-0">
                                            <span className="inline-block rounded-full border-2 border-[#111] bg-white px-2 py-px text-[10px] font-extrabold tracking-wider text-[#111]">
                                                Bài {category.displayOrder}
                                            </span>

                                            <h3 className="mt-1 font-[family-name:var(--font-quicksand)] text-[16px] font-extrabold text-[#111]">
                                                {category.name}
                                            </h3>

                                            <p className="mt-0.5 max-w-3xl text-[13px] leading-[1.6] text-[#555]">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="flex flex-none items-center gap-1.5 text-[13px] font-bold text-[#5f6a45]">
                                        <span className="hidden sm:inline">Học ngay</span>
                                        <ArrowRight
                                            size={15}
                                            className="transition-transform group-hover:translate-x-1"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </section>
        </MainLayout> 
    );
}