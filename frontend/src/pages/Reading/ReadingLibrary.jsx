import Navbar from '../../components/layout/Navbar.jsx';
import StatsGrid from '../../components/sections/reading/StatsGrid.jsx';
import QuestionTypeFilter from '../../components/sections/reading/QuestionTypeFilter';
import QuestionTabs from '../../components/sections/reading/QuestionTabs.jsx';
import TestCard from '../../components/sections/reading/TestCard.jsx';
import Pagination from '../../components/layout/Pagination.jsx';
import { readingTests } from '../../data/readingTests.js';
import {Link} from "react-router-dom";

const ReadingLibrary = () => {
    return (
        <div className="min-h-screen bg-[#fafbfc] relative flex flex-col font-sans overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#6a8042]/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#fffadd]/40 rounded-full blur-[120px] pointer-events-none"></div>

            <Navbar />

            <main className="flex-grow pt-36 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full z-10 relative">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-[#5a6d38] transition-colors group" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true">
                            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                        </svg>
                        Quay lại chọn kỹ năng
                    </Link>
                </div>

                <header className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-[#fffadd] text-[#4a592e] px-3 py-1.5 rounded-xl mb-4 border border-[#fffadd]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-3.5 h-3.5" aria-hidden="true">
                                    <path d="M12 7v14" />
                                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                                </svg>
                                <span className="font-black text-[9px] uppercase tracking-[0.2em]">IELTS Reading Practice</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">Luyện Reading</h1>
                            <p className="text-slate-400 font-medium text-lg max-w-lg">
                                Cambridge 20-10 đầy đủ &amp; Essential Words for the IELTS — True/False/Not Given, điền từ, và nhiều dạng câu hỏi khác.
                            </p>
                        </div>
                    </div>
                </header>

                <StatsGrid />
                <QuestionTypeFilter />
                <QuestionTabs />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {readingTests.map((test) => (
                        <TestCard key={test.id} cam={test.cam} testNumber={test.testNumber} passages={test.passages} />
                    ))}
                </div>

                <Pagination />
            </main>
        </div>
    );
};

export default ReadingLibrary;