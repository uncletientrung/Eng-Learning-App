import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx'; // Đảm bảo đường dẫn này đúng với project của bạn
import QuestionTestCard from '../../components/sections/listening/QuestionTestCard.jsx';
import LibraryArchive from '../../components/sections/listening/LibraryArchive.jsx';
import { CAMBRIDGE_10_TESTS, LIBRARY_ARCHIVES } from '../../data/listeningTests';
import Pagination from "../../components/layout/Pagination.jsx";
import ListeningTestList from "../../components/sections/listening/ListeningTestList.jsx";

const ListeningPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans w-full overflow-x-clip relative">
            <Navbar />

            {/* Background blurs */}
            <div className="absolute top-0 inset-x-0 h-96 bg-[#f5eed0]/30 pointer-events-none fade-out-bottom -z-10"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#e8dfb0]/20 rounded-full blur-[100px] -z-10"></div>

            {/* MAIN CONTENT */}
            <main className="max-w-6xl mx-auto px-6 py-28 relative z-10 w-full">

                {/* HEADER TITLE SECTION */}
                <div className="mb-10 text-center md:text-left">
                    <div className="inline-flex items-center justify-center space-x-2 bg-[#fffadd] text-[#4a592e] px-4 py-2 rounded-full mb-4 border border-[#f5eed0]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-headphones w-5 h-5" aria-hidden="true">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
                            <path d="M8 12v-2a4 4 0 0 1 8 0v2"></path>
                            <circle cx="15" cy="12" r="1"></circle>
                            <circle cx="9" cy="12" r="1"></circle>
                        </svg>
                        <span className="font-black text-[10px] uppercase tracking-[2px]">Listening Practice Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#1e3006] mb-4 tracking-tight leading-tight">IELTS <span className="text-[#5a6d38]">Listening</span></h1>
                    <p className="text-slate-500 text-lg max-w-2xl font-medium">Luyện nghe chép chính tả IELTS Listening với dữ liệu đề thi Cambridge mới nhất. Rèn luyện kỹ năng bắt âm và tránh sai sót.</p>


                </div>

                {/* CAMBRIDGE FULL TESTS */}
               <ListeningTestList/>


            

            </main>
        </div>
    );
};

export default ListeningPage;