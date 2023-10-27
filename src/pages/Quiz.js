import { React, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import BackArrow from '../components/backArrow';


export default function Quiz() {

    // quiz id in search params
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    // quiz data
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /*
    Quiz states
    */

    // Current question
    const [currentIndex, setCurrentIndex] = useState(0);

    // Score
    const [score, setScore] = useState(0);

    // Number of completed questions
    const [completedQuestions, setCompletedQuestions] = useState(0);
    const [progressWidth, setProgressWidth] = useState('0%'); // progress bar width

    // Main btn display
    const [nextBtnDisplay, setNextBtnDisplay] = useState('none');
    const [playAgainBtnDisplay, setPlayAgainBtnDisplay] = useState('none');

    // Answer buttons
    const [answerBtnDisabled, setAnswerBtnDisabled] = useState(false);
    
    // Display questions or score
    const [questionDisplay, setQuestionDisplay] = useState('block');
    const [scoreDisplay, setScoreDisplay] = useState('none');

    /*
    Button click events
    */

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
        setCompletedQuestions(completedQuestions + 1);
        setProgressWidth(`${((completedQuestions + 1) / quiz.questions.length) * 100}%`);
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

    // Get quiz data
    useEffect(() => {
        async function getData() {
            try {
                const quizzesRef = doc(db, 'inquizitiveQuizzes', id);
                const docSnap = await getDoc(quizzesRef);
                if (docSnap.exists()) {
                    const quizData = docSnap.data();
                    setQuiz(quizData);
                    setLoading(false);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setError(error);
            }
        }
        getData();
    });

    if (loading) {
        return;
    }
    
    if (error) {
        return (
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <h1>Sorry, there was an error!</h1>
                </div>
            </div>
        );
    }

    // Current question
    const currentQuestion = quiz.questions[currentIndex];

    return (
        <div>
            <BackArrow />
            <div className={'quizContainer'}>
                <p className={'progressText'}>{`${completedQuestions}/${quiz.questions.length}`}</p>
                <div className={'progressBar'} style={{width: progressWidth}}></div>
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
        </div>
    );
}