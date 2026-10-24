import ReviewLayout from "../../components/sections/reading/Result/Review/ReviewLayout.jsx";
import ReviewHeader from "../../components/sections/reading/Result/Review/ReviewHeader";
import ReviewHero from "../../components/sections/reading/Result/Review/ReviewHero";
import ReviewStatsGrid from "../../components/sections/reading/Result/Review/ReviewStatsGrid";
import ReviewActionButtons from "../../components/sections/reading/Result/Review/ReviewActionButtons";
import ReviewQuestionCard from "../../components/sections/reading/Result/Review/ReviewQuestionCard";
import { sampleStats, sampleQuestions } from "../../data/reviewdata.js";

const ReviewPage = ({
                        backHref = "#",
                        retryHref = "#",
                        sameExamHref = "#",
                        title = "Reading",
                        tip = "Mới khởi động thôi, còn nhiều tiềm năng lắm 👀",
                        stats = sampleStats,
                        questions = sampleQuestions,
                    }) => {
    return (
        <>
            <ReviewLayout>
                <ReviewHeader backHref={backHref} />
                <ReviewHero title={title} tip={tip} />
                <ReviewStatsGrid
                    correct={stats.correct}
                    wrong={stats.wrong}
                    skipped={stats.skipped}
                    band={stats.band}
                    total={stats.total}
                />
                <ReviewActionButtons retryHref={retryHref} sameExamHref={sameExamHref} />
            </ReviewLayout>

            <div className="bg-slate-50 py-10 px-4">
                <div className="max-w-5xl mx-auto space-y-6">
                    {questions.map((q) => (
                        <ReviewQuestionCard key={q.id} question={q} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ReviewPage;