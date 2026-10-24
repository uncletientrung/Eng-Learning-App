// ============================================================
// ExamHeader.jsx
// ============================================================
import PartNavigation from './PartNavigation';
import HeaderControls from './HeaderControls';
import {useState} from "react";
import EmptyAnswerDialog from "./EmptyAnswerDialog.jsx";

const ExamHeader = () => {


    return (
        <header
            className="flex flex-col shrink-0 z-30 overflow-hidden"
            style={{
                background: 'rgb(255,255,255)',
                border: '3px solid rgb(26,26,18)',
                borderRadius: '18px',
                boxShadow: 'rgba(0,0,0,0.15) 0px 4px 0px',
            }}
        >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 px-3 md:px-4 py-2">
                <a
                    className="w-[34px] h-[34px] shrink-0 flex items-center justify-center rounded-[9px] bg-white hover:bg-[#e8b13a] transition-colors"
                    title="Quay lại danh sách"
                    href="https://theieltsdictionary.com/practice/reading"
                    style={{ border: '2.5px solid rgb(26,26,18)' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-left w-4 h-4"
                        aria-hidden={true}
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                </a>

                <HeaderControls />

            </div>
        </header>
    );
};

export default ExamHeader;