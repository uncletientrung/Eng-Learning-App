import PartSelectionHeader from './PartSelectionHeader';
import PartCard from '../../components/sections/PartCard';
import FullTestButton from './FullTestButton';
import {useNavigate} from "react-router-dom";

// Mock Data dựa trên đề Cam 20 Test 3
const MOCK_PARTS = [
    {
        id: 1,
        title: "FURNITURE RENTAL COMPANIES",
        questionRange: "1–10",
        questionCount: 10,
        theme: "amber",
    },
    {
        id: 2,
        title: "BIDCASTER ARCHAEOLOGICAL DIG",
        questionRange: "11–20",
        questionCount: 10,
        theme: "sky",
    },
    {
        id: 3,
        title: "THEATRE PROGRAMMES",
        questionRange: "21–30",
        questionCount: 10,
        theme: "rose",
    },
    {
        id: 4,
        title: "INCLUSIVE DESIGN",
        questionRange: "31–40",
        questionCount: 10,
        theme: "violet",
    },
];

const PartSelectionPage = ({examid}) => {
    const navigate = useNavigate();

    // Xử lý khi bấm vào một Part
    const handlePartClick = (partId) => {
        console.log(`Chuyển hướng đến Part ${partId}`);
        navigate(`/listening/exam/${examid}?mode=practice&part=full`);
    };

    // Xử lý khi bấm vào Full Test
    const handleFullTestClick = () => {
        console.log("Chuyển hướng đến Full Test");
        navigate(`/listening/exam/${examid}?mode=full_test`);
    };

    return (
        <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl">

                {/* Header */}
                <PartSelectionHeader testName="Cambridge IELTS 20 – Test 3" />

                {/* Grid Danh sách Part */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {MOCK_PARTS.map((part) => (
                        <PartCard
                            key={part.id}
                            partNumber={part.id}
                            title={part.title}
                            questionRange={part.questionRange}
                            questionCount={part.questionCount}
                            theme={part.theme}
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