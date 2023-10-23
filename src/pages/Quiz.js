import { React, useState } from 'react';


export default function Quiz(props) {

    // Example quiz object
    const quiz = {
        title: "My Quiz",
        questions: [
            {
                text: "What is Kyria's favorite video game?",
                answers: [
                    {text: "Trails in the Sky the 3rd", correct: true},
                    {text: "Fire Emblem: Genealogy of the Holy War", correct: false},
                    {text: "Persona 3", correct: false},
                    {text: "Xenoblade Chronicles 3", correct: false}
                ]
            },
            {
                text: "What is Kyria's least favorite video game?",
                answers: [
                    {text: "Tales of Vesperia", correct: true},
                    {text: "Persona 4 Golden", correct: false},
                    {text: "Xenoblade Chronicles 2", correct: false},
                    {text: "Fire Emblem Fates: Birthright", correct: false}
                ]
            },
            {
                text: "What is Kyria's favorite K-drama?",
                answers: [
                    {text: "Extraordinary Attorney Woo", correct: true},
                    {text: "King the Land", correct: false},
                    {text: "Start-Up", correct: false},
                    {text: "Business Proposal", correct: false}
                ]
            },
            {
                text: "What is Kyria's favorite ice cream flavor?",
                answers: [
                    {text: "Strawberry", correct: true},
                    {text: "Chocolate", correct: false},
                    {text: "Vanilla", correct: false},
                    {text: "Coffee", correct: false}
                ]
            },
            {
                text: "Who is Kyria's favorite music artist?",
                answers: [
                    {text: "SEVENTEEN", correct: true},
                    {text: "Jo Stafford", correct: false},
                    {text: "Beethoven", correct: false},
                    {text: "Taylor Swift", correct: false}
                ]
            },
        ]
    };

    /*
    STATES
    */

    // Current question
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = quiz.questions[currentIndex];

    // Score
    const [score, setScore] = useState(0);

    // Number of completed questions
    const [completedQuestions, setCompletedQuestions] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0); // progress bar width

    // Main btn display
    const [nextBtnDisplay, setNextBtnDisplay] = useState('none');
    const [playAgainBtnDisplay, setPlayAgainBtnDisplay] = useState('none');

    // Answer button disabled
    const [answerBtnDisabled, setAnswerBtnDisabled] = useState(false);
    
    // Display questions or score
    const [questionDisplay, setQuestionDisplay] = useState('block');
    const [scoreDisplay, setScoreDisplay] = useState('none');


    const onAnswerButtonClick = (e) => {
        const isCorrect = e.target.value;
        if (isCorrect === 'true') {
            setScore(score + 1);
        }
        setNextBtnDisplay('block');
        setAnswerBtnDisabled(true);
    }


    // Play again btn at end of quiz
    const restartQuiz = () => {
        setPlayAgainBtnDisplay('none');
        setCurrentIndex(0);
        setScore(0);
        setCompletedQuestions(0);
        setProgressWidth(0);
        setScoreDisplay('none');
        setQuestionDisplay('block');
    }

    // Next question btn
    const onNextBtnClick = () => {
        setProgressWidth(progressWidth + 20);
        setCompletedQuestions(completedQuestions + 1);
        setAnswerBtnDisabled(false);
        if (currentIndex < quiz.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setQuestionDisplay('none');
            setScoreDisplay('block');
            setPlayAgainBtnDisplay('block');
        }
        setNextBtnDisplay('none');
    }


    return (
        <div className={'quizContainer'}>
            <p className={'progressText'}>{`${completedQuestions}/${quiz.questions.length}`}</p>
            <div className={'progressBar'} style={{width: `${progressWidth}%`}}></div>
            <h1>{quiz.title}</h1>
            <div className={'questionContainer'} style={{display: questionDisplay}}>
                <h2>{currentQuestion.text}</h2>
                <button value={currentQuestion.answers[0].correct} onClick={onAnswerButtonClick} disabled={answerBtnDisabled}>
                    {currentQuestion.answers[0].text}
                </button>
                <button value={currentQuestion.answers[1].correct} onClick={onAnswerButtonClick} disabled={answerBtnDisabled}>
                    {currentQuestion.answers[1].text}
                </button>
                <button value={currentQuestion.answers[2].correct} onClick={onAnswerButtonClick} disabled={answerBtnDisabled}>
                    {currentQuestion.answers[2].text}
                </button>
                <button value={currentQuestion.answers[3].correct} onClick={onAnswerButtonClick} disabled={answerBtnDisabled}>
                    {currentQuestion.answers[3].text}
                </button>
            </div>
            <div className={'scoreContainer'} style={{display: scoreDisplay}}>
                <h2>You scored {score} out of {quiz.questions.length}!</h2>
            </div>
            <button className={'mainBtn'} onClick={onNextBtnClick} style={{display: nextBtnDisplay}}>Next</button>
            <button className={'mainBtn'} onClick={restartQuiz} style={{display: playAgainBtnDisplay}}>Play Again</button>
        </div>
    );
}