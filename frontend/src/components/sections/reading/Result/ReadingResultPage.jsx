import ResultLayout from "./ResultLayout";
import ResultHeader from "./ResultHeader";
import ResultHero from "./ResultHero";
import ScoreCard from "./ScoreCard";
import QuestionTypeTable from "./QuestionTypeTable";

const ReadingResultPage = ({
                               backHref = "https://theieltsdictionary.com/practice/reading",
                               timeLabel = "1 phút 11 giây",
                               tip = "Mới khởi động thôi, còn nhiều tiềm năng lắm 👀",
                               score = { correct: 0, wrong: 3, skipped: 37, total: 40, band: 1.0 },
                               breakdown = [
                                   { type: "True/False/Not Given", total: 6, correct: 0, wrong: 3, skipped: 3 },
                                   { type: "Note/Summary Completion", total: 10, correct: 0, wrong: 0, skipped: 10 },
                                   { type: "Matching Information", total: 5, correct: 0, wrong: 0, skipped: 5 },
                                   { type: "Matching Features", total: 5, correct: 0, wrong: 0, skipped: 5 },
                                   { type: "Multiple Choice", total: 4, correct: 0, wrong: 0, skipped: 4 },
                                   { type: "Matching Sentence Endings", total: 5, correct: 0, wrong: 0, skipped: 5 },
                                   { type: "Yes/No/Not Given", total: 5, correct: 0, wrong: 0, skipped: 5 },
                               ],
                               onViewExplanation,
                               onRetry,
                           }) => {
    return (
        <ResultLayout>
            <ResultHeader backHref={backHref} />
            <ResultHero timeLabel={timeLabel} tip={tip} />
            <div className="space-y-10 mt-10">
                <ScoreCard
                    correct={score.correct}
                    wrong={score.wrong}
                    skipped={score.skipped}
                    total={score.total}
                    band={score.band}
                    onViewExplanation={onViewExplanation}
                    onRetry={onRetry}
                />
                <QuestionTypeTable rows={breakdown} />
            </div>
        </ResultLayout>
    );
};

export default ReadingResultPage;