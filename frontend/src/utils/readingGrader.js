
const normalize = (value) =>
    String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();

export function gradeReading(questions, answers) {
    let correctCount = 0;

    const details = questions.map((q) => {
        const userAnswer = answers[q.id];
        let isCorrect = false;

        if (q.questionType === "Fill-in-Blank") {
            const correctAnswers = (q.fillinBlanksAnswers ?? [])
                .slice()
                .sort((a, b) => a.blankNumber - b.blankNumber);

            const submitted = Array.isArray(userAnswer)
                ? userAnswer
                : [userAnswer];

            isCorrect =
                correctAnswers.length > 0 &&
                correctAnswers.every((blank, index) =>
                    normalize(submitted[index]) ===
                    normalize(blank.correctAnswer)
                );

        } else {
            const correctOptions = (q.readingQuestionOptions ?? [])
                .filter(opt => opt.isCorrect)
                .map(opt => normalize(opt.optionKey))
                .sort();

            const selectedOptions = (
                Array.isArray(userAnswer)
                    ? userAnswer
                    : userAnswer == null ? [] : [userAnswer]
            ).map(normalize).sort();

            isCorrect =
                correctOptions.length > 0 &&
                correctOptions.length === selectedOptions.length &&
                correctOptions.every(
                    (value, index) => value === selectedOptions[index]
                );
        }

        if (isCorrect) correctCount++;

        return {
            questionId: q.id,
            questionType: q.questionType,
            userAnswer: userAnswer ?? null,
            isCorrect
        };
    });
    const breakdown = Object.values(
        details.reduce((acc, item) => {
            const type = item.questionType;

            if (!acc[type]) {
                acc[type] = {
                    type,
                    total: 0,
                    correct: 0,
                    wrong: 0
                };
            }

            acc[type].total++;

            if (item.isCorrect) {
                acc[type].correct++;
            } else {
                acc[type].wrong++;
            }

            return acc;
        }, {})
    );

    return {
        correctCount,
        totalQuestions: questions.length,
        details,
        breakdown
    };
}
