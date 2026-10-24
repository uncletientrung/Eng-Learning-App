import {CAMBRIDGE_10_TESTS} from "../../../data/listeningTests.js";
import QuestionTestCard from "./QuestionTestCard.jsx";
import Pagination from "../../layout/Pagination.jsx";
import {useState} from "react";

const ListeningTestList = () =>{
    const [Listname, setListname] = useState("Cambridge Full Test");

    return(
        <>
            <div className="mb-14 relative">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list w-6 h-6 text-amber-600" aria-hidden="true">
                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <path d="M12 11h4"></path>
                            <path d="M12 16h4"></path>
                            <path d="M8 11h.01"></path>
                            <path d="M8 16h.01"></path>
                        </svg>
                        <h2 className="text-xl font-black text-[#1e3006] uppercase tracking-[3px]">{Listname}</h2>
                        <span className="bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest">Thi thật</span>
                    </div>

                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-widest">Cambridge IELTS 10</h3>
                            <span className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shadow-blue-200/50 hidden sm:inline-block">Giao diện giống thi thật 100%</span>
                        </div>

                        {/* Thay thế đoạn grid cũ bằng đoạn này */}
                        <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
                            {CAMBRIDGE_10_TESTS.map((test) => (
                                <div key={test.id} className="snap-start shrink-0 w-[280px] sm:w-[320px]">
                                    <QuestionTestCard
                                        camNumber={10}
                                        testNumber={test.id}
                                        bgColor={test.bgColor}
                                        patternId={test.patternId}
                                        patternPath={test.patternPath}
                                        patternTransform={test.patternTransform}
                                        patternWidth={test.patternWidth}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Pagination/>
                    <div className="border-b border-gray-100 mt-8"></div>
                </div>
            </div>
        </>
    )
}
export default ListeningTestList