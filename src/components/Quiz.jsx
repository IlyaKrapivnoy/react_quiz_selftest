import React, { useState } from 'react';
import { Button, InputBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    textField: {
        border: '1px solid #fff',
        borderRadius: theme.shape.borderRadius,
        height: '45px',
        minWidth: 200,
        padding: theme.spacing(2),
        color: '#fff',
    },
    userNameDisplay: {
        height: '45px',
        minWidth: 200,
        display: 'flex',
        alignItems: 'center',
    },
    alertStyles: {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        backgroundColor: '#f95f5f',
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
    const [usernameInput, setUsernameInput] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

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

    const handleUsernameInput = () => {
        if (username.length < 2) {
            setOpenAlert(true);
        } else {
            setUsernameInput(!usernameInput);
            setOpenAlert(false);
        }
    };

    const handleGameData = (username, score) => {
        console.log({ username, score });
    };

    return (
        <div className='wrapper'>
            <div className='userName'>
                <Typography>Username:</Typography>
                {usernameInput ? (
                    <div className={classes.userNameDisplay}>{username}</div>
                ) : (
                    <InputBase
                        variant='outlined'
                        placeholder='Enter Your Name'
                        className={classes.textField}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <Button
                    onClick={handleUsernameInput}
                    className={classes.buttonStyles}
                >
                    {usernameInput ? 'Change Name' : 'Choose Name'}
                </Button>
            </div>
            <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        <div className='right-side-score-section'>
                            You scored {score} out of {questions.length}
                        </div>
                        <div className='left-side-score-section'>
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={(score, username) => {
                                    setShowScore(false);
                                    setCurrentQuestion(0);
                                    handleGameData(score, username);
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
            {openAlert ? (
                <Alert className={classes.alertStyles}>
                    Username should be longer than 2 characters
                </Alert>
            ) : null}
        </div>
    );
};

export default Quiz;
