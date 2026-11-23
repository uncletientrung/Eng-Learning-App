import ResultLayout from "./ResultLayout";
import ResultHeader from "./ResultHeader";
import ResultHero from "./ResultHero";
import ScoreCard from "../../../ui/ScoreCard.jsx";
import QuestionTypeTable from "./QuestionTypeTable";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ReadingResultPage = ({
                               score = { correct: 0, wrong: 3, skipped: 37, total: 40, band: 1.0 },


                           }) => {
    const {submissionid} = useParams();
    const [attempt, setAttempt] = useState(null);


    const navigate = useNavigate();
    const onRetry = () =>{
        navigate(`/reading/exam/${attempt.testId}`)
    }
    const onViewExplanation = () =>{
        navigate(`/reading/result/${submissionid}/review`)
    }

    const calculateBreakdown = (answers) => {
        const grouped = answers.reduce((acc, answer) => {
            const type = answer.questionType;

            // Nếu chưa có nhóm này thì tạo nhóm mới
            if (!acc[type]) {
                acc[type] = {
                    type: type,
                    total: 0,
                    correct: 0,
                    wrong: 0
                };
            }

            // Mỗi answer được tính là một câu
            acc[type].total++;

            if (answer.isCorrect) {
                acc[type].correct++;
            } else {
                acc[type].wrong++;
            }

            return acc;
        }, {});

        return Object.values(grouped);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch(`http://localhost:5167/api/users/1/reading-attempts/${submissionid}`)
            const data = await response.json();
            setAttempt(data)
        }
        fetchdata();

    }, [submissionid]);

    if (!attempt) return <div>Đang tải kết quả...</div>;
    const durationSeconds =
        attempt.startedAt && attempt.completedAt
            ? Math.max(
                0,
                Math.floor(
                    (new Date(attempt.completedAt) -
                        new Date(attempt.startedAt)) / 1000
                )
            )
            : 0;

    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    const timeLabel = `${minutes} phút ${seconds} giây`;
    const breakdown = calculateBreakdown(attempt.userReadingAnswers ?? [])
    return (
        <ResultLayout>
            <ResultHeader backHref="http://localhost:5173/reading/" />
            <ResultHero timeLabel={timeLabel} tip={"Mới khởi động thôi, còn nhiều tiềm năng lắm 👀"} />
            <div className="space-y-10 mt-10">
                <ScoreCard
                    correct={attempt.correctAnswersNum}
                    total={attempt.totalQuestions}
                    band={0}
                    onViewExplanation={onViewExplanation}
                    onRetry={onRetry}
                />
                <QuestionTypeTable rows={breakdown} />
            </div>
        </ResultLayout>
    );
};

export default ReadingResultPage;