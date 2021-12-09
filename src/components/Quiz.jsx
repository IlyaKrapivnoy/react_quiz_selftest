import React, { useState } from 'react';
import { Button, InputBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        border: '1px solid #fff',
        borderRadius: theme.shape.borderRadius,
        height: '45px',
        padding: theme.spacing(2),
        color: '#fff',
    },
}));

const Quiz = () => {
    const classes = useStyles();
    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
    ];

    // const questionsAPI =
    //     'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple';

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');

    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect === true) {
            alert('yeah');
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className='wrapper'>
            <div className='userName'>
                <Typography>Username:</Typography>
                <InputBase
                    variant='outlined'
                    placeholder='Enter Your Name 2'
                    className={classes.textField}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {username}
            </div>
            <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        You scored {score} out of {questions.length}
                        <div className='left-side-score-section'>
                            <Button
                                onClick={() => {
                                    setShowScore(false);
                                    setCurrentQuestion(0);
                                }}
                            >
                                Play again
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/
                                {questions.length}
                            </div>
                            <div className='question-text'>
                                {questions[currentQuestion].questionText}
                            </div>
                        </div>
                        <div
                            className='answer-section'
                            // style={{ backgroundColor: `isCorrect` ? 'green' : 'red' }}
                        >
                            {questions[currentQuestion].answerOptions.map(
                                (answerOption) => (
                                    <Button
                                        onClick={() =>
                                            handleAnswerButtonClick(
                                                answerOption.isCorrect
                                            )
                                        }
                                    >
                                        {answerOption.answerText}
                                    </Button>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;
