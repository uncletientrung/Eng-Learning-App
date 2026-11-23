import ReviewLayout from "../../components/sections/reading/Result/Review/ReviewLayout.jsx";
import ReviewHeader from "../../components/sections/reading/Result/Review/ReviewHeader";
import ReviewHero from "../../components/sections/reading/Result/Review/ReviewHero";
import ReviewStatsGrid from "../../components/sections/reading/Result/Review/ReviewStatsGrid";
import ReviewActionButtons from "../../components/sections/reading/Result/Review/ReviewActionButtons";
import ReviewQuestionCard from "../../components/sections/reading/Result/Review/ReviewQuestionCard";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

const ReviewPage = ({
                        sameExamHref = "#",
                        title = "Reading",
                        tip = "Mới khởi động thôi, còn nhiều tiềm năng lắm 👀",
                    }) => {
    const {submissionid} = useParams()
    const [attempts, setAttempts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5167/api/users/1/reading-attempts/${submissionid}`)
            const data = await response.json();
            setAttempts(data)
        }
        fetchData()
    },[submissionid])
    if (!attempts) return <div>Đang tải kết quả...</div>;
    return (
        <>
            <ReviewLayout>
                <ReviewHeader backHref={`/reading`} />
                <ReviewHero title={title} tip={tip} />
                <ReviewStatsGrid
                    correct={attempts.correctAnswersNum}
                    band={0}
                    total={attempts.totalQuestions}
                />
                <ReviewActionButtons retryHref={`/reading/exam/${attempts.testId}`} sameExamHref={sameExamHref} />
            </ReviewLayout>

            <div className="bg-slate-50 py-10 px-4">
                <div className="max-w-5xl mx-auto space-y-6">
                    {attempts?.userReadingAnswers?.map((q) => (
                        <ReviewQuestionCard key={q.id} question={q} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ReviewPage;