import { getGrammarCategories } from '../../services/grammarAPI'
import { getRandomIcons } from "../../utils/iconLibrary";
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function GrammarReferencePage() {
    const [categoryIcons, setCategoryIcons] = useState([]);
    const [grammarCategories, setGrammarCategories] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                /*setLoading(true);
                setError('');*/
                const fetchGrammarCategories = await getGrammarCategories();

                setGrammarCategories(fetchGrammarCategories);
                setCategoryIcons(getRandomIcons(fetchGrammarCategories.length, "education"))
            } catch (err) {
                console.error('Lỗi tải dữ liệu:', err);
/*                setError('Không thể tải dữ liệu Writing.');
*/            } finally {
/*                setLoading(false);
*/            }
        }

        fetchData();
    }, []);

    return (
        <MainLayout>
        <main
            className="min-h-screen bg-[#6f8f4b]"
            style={{
                fontFamily: "var(--font-nunito), sans-serif",
                backgroundImage: "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }}
        >
            <div className="mx-auto max-w-[1100px] px-4 pb-24 pt-28 md:px-6">

                {/* Top Header Card */}
                <div className="mb-6 rounded-[20px] border-4 border-[#111] bg-white px-6 py-6 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:px-8 md:py-7">

                    <a
                        className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
                        href="/"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Trở về trang chủ
                    </a>
                    <p className="font-[family-name:var(--font-quicksand)] text-[13px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                        Ngữ pháp IELTS
                    </p>
                    <h1 className="mt-1 font-[family-name:var(--font-quicksand)] text-[28px] font-extrabold leading-tight text-[#111] md:text-[36px]">
                        GRAMMAR REFERENCE
                    </h1>
                    <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-[#444]">
                        25 chủ đề ngữ pháp cho IELTS, từ dạng thức từ tới các cấu trúc Band 7+. Mỗi mục có lý thuyết chi tiết và bài tập trắc nghiệm giải thích từng câu.
                    </p>
                </div>

                    <div className="rounded-[20px] border-4 border-[#111] bg-white p-5 shadow-[8px_8px_0_rgba(0,0,0,0.12)] md:p-7">
                        <p className="font-[family-name:var(--font-quicksand)] text-[12px] font-bold uppercase tracking-[3px] text-[#8a8672]">
                            Xem lại lý thuyết ngữ pháp được tổng hợp theo chủ đề
                        </p>
                        <h2 className="mb-5 mt-1 font-[family-name:var(--font-quicksand)] text-[22px] font-extrabold text-[#111]">
                        TOÀN TẬP
                    </h2>
                    
                    {/* Main Layout */}
                    <div className="flex flex-col gap-3">
                        {grammarCategories.map((category, index) => {
                            const Icon = categoryIcons[index];

                            return (
                                <Link
                                    key={category.id}
                                    state={{
                                        parent_id: category.id,
                                        parent_title: category.title,
                                        parent_description: category.description
                                    }}
                                    to="/grammar/theory"
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
                                        Học ngay
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
                </div>

            </div>
        </main>
        </MainLayout> 
    );
}