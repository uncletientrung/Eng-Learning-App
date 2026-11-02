export const SCRIPTS = [
    { q: 1, text: "If you like <b>fish</b>, it's probably the best restaurant in town for that." },
    { q: 2, text: "It's got a great atmosphere, and before dinner you can go up on <b>the roof</b> and have a drink." },
    { q: 3, text: "So is all the food they serve <b>Spanish</b> then?" },
    { q: 4, text: "I should have a look at the menu to check there's a good choice of <b>vegetarian dishes</b>." },
    // ... Thêm các câu khác tương tự
    { q: 33, text: "And recently, people had to try to <b>rescue a whale</b> which had got lost and swam up the river from the sea by mistake." },
];

export const ANSWERS = [
    // Part 1
    { q: 1, isCorrect: true, type: 'Table', correctAns: 'fish', userAns: 'fish', context: 'Good for people who are especially keen on ______' },
    { q: 2, isCorrect: true, type: 'Table', correctAns: 'roof', userAns: 'roof', context: 'The ______ is a good place for a drink' },
    { q: 3, isCorrect: true, type: 'Table', correctAns: 'spanish', userAns: 'spanish', context: '______ food, good for sharing' },
    { q: 4, isCorrect: true, type: 'Table', correctAns: 'vegetarian', userAns: 'vegetarian', context: 'A limited section of ______ food on the menu' },
    // ... Part 2, 3

    // Part 4
    { q: 31, isCorrect: true, type: 'Note', correctAns: 'factories', userAns: 'factories', context: 'pollution from ______ on the river bank' },
    { q: 32, isCorrect: true, type: 'Note', correctAns: 'dead', userAns: 'dead', context: 'In 1957, the River Thames in London was declared biologically ______' },
    { q: 33, isCorrect: false, type: 'Note', correctAns: 'whale', userAns: 'whalw', context: 'Seals and even a ______ have been seen in the River Thames.' },
    // ... Thêm các câu khác
];

export const QUESTION_TYPES = [
    { type: 'Table Completion', total: 10, correct: 10, wrong: 0, skipped: 0 },
    { type: 'Multiple Choice', total: 10, correct: 10, wrong: 0, skipped: 0 },
    { type: 'Multiple Choice (choose TWO)', total: 10, correct: 10, wrong: 0, skipped: 0 },
    { type: 'Note Completion', total: 10, correct: 9, wrong: 1, skipped: 0 },
];