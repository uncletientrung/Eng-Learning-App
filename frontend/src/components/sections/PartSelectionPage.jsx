import PartSelectionHeader from './PartSelectionHeader';
import PartCard from '../../components/sections/PartCard';
import FullTestButton from './FullTestButton';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

// Mock Data dựa trên đề Cam 20 Test 3

const PartSelectionPage = ({examid,type,ReadingTest}) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(ReadingTest)
    }, [ReadingTest]);

    // Xử lý khi bấm vào một Part
    const handlePartClick = (passage) => {
        console.log(`Chuyển hướng đến Part ${passage}`);
        navigate(`/${type}/exam/${examid}?mode=practice&part=${passage}`);
    };

    // Xử lý khi bấm vào Full Test
    const handleFullTestClick = () => {
        console.log("Chuyển hướng đến Full Test");
        navigate(`/${type}/exam/${examid}?mode=full_test`);
    };
    if (!ReadingTest) {
        return <div className="p-4 text-center">Đang tải dữ liệu bài kiểm tra...</div>;
    }

    return (
        <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4 py-16">
            <button
                onClick={() => navigate(`/${type}`)}
                className="absolute top-6 left-6 md:top-10 md:left-12
                       flex items-center gap-2.5
                       px-5 py-3
                       bg-white
                       border-2 border-[#1a1a12]
                       rounded-xl
                       shadow-[3px_4px_0px_#1a1a12]
                       text-[#1a1a12] text-sm font-bold
                       hover:bg-[#fff4d6]
                       hover:-translate-y-0.5
                       hover:shadow-[4px_6px_0px_#1a1a12]
                       active:translate-y-0.5
                       active:shadow-none
                       transition-all duration-200
                       group z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:-translate-x-1"
                >
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                </svg>

                Quay lại danh sách đề
            </button>
            <div className="w-full max-w-2xl">

                {/* Header */}
                <PartSelectionHeader testName={ReadingTest.title} />

                {/* Grid Danh sách Part */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {ReadingTest && ReadingTest.readingExercises.map((part) => (
                        <PartCard
                            key={part.id}
                            partNumber={part.passage}
                            title={part.title}
                            theme="amber"
                            questionCount=""
                            questionRange="1-10"

                            onClick={handlePartClick}
                        />
                    ))}
                </div>

                {/* Nút Full Test */}
                <FullTestButton onClick={handleFullTestClick} />

            </div>
        </div>
    );
};

export default PartSelectionPage;