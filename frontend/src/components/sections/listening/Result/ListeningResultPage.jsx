import ResultHeader from './ResultHeader';
import ScoreCard from './ScoreCard';
import QuestionTypeTable from './QuestionTypeTable';
import StickyTabs from './StickyTabs';
import ScriptPane from './ScriptPane';
import AnswersPane from './AnswersPane';
import ListeningResultMascot from './ListeningResultMascot';
import {useNavigate} from "react-router-dom";

const ListeningResultPage = () => {
    const navigate = useNavigate();
    const handleReloadPage = () =>{
        navigate("/listening/exam/1");
    }
    const handleBack = () => {
        navigate("/listening")
    }
    return (
        <div className="min-h-screen flex flex-col font-sans antialiased">
            <main className="flex-1">
                <div className="relative bg-[#6a8042] overflow-hidden">

                    {/* Background Grid */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
                            backgroundSize: '32px 32px'
                        }}
                    ></div>

                    <div className="relative z-10 px-6 pt-4 pb-8 md:px-10 max-w-5xl mx-auto">
                        <ResultHeader onBack={handleBack} />

                        {/* Hero Title & Mascot */}
                        <div className="flex items-start justify-between mb-2 gap-4">
                            <div className="pt-2">
                                <p className="text-white/75 font-semibold text-lg mb-1">Kết quả bài</p>
                                <div className="bg-[#000] text-white font-black text-4xl md:text-5xl px-4 py-1.5 rounded-xl inline-block tracking-tight">
                                    Listening
                                </div>
                            </div>

                            <ListeningResultMascot />
                        </div>

                        <ScoreCard onReload={handleReloadPage}  />
                        <QuestionTypeTable />

                        {/* Đã xoá khung "Xem lượt này theo dạng câu hỏi" ở đây */}

                    </div>

                    {/* Sticky Tabs */}
                    <StickyTabs />

                    {/* Detailed Solution Area: Bên trái Script, Bên phải Đáp án */}
                    <div className="h-[calc(100vh-72px)] overflow-hidden">
                        <div className="flex flex-col h-full min-h-[600px]">
                            <div className="flex flex-1 min-h-0">
                                <ScriptPane />
                                <AnswersPane />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ListeningResultPage;