import React, { useState, useEffect } from 'react';
import {
    Button,
    CircularProgress,
    InputBase,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Question, APIQuestion } from '../types';



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
    alertUsernameStyles: {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        backgroundColor: '#f95f5f',
    },
    alertCorrectAnswerStyles: {
        top: '10%',
        left: 'calc(50% - 72px)',
        position: 'absolute',
        backgroundColor: '#3eb361',
    },
    cantPlay: {
        position: 'absolute',
        top: '38%',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: 300,
        color: '#d32121',
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120px',
    },
}));

const Quiz = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState<Question[]>([]);

    const questionsAPI =
        'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple';

    useEffect(() => {
        (async function () {
            const response = await fetch(questionsAPI);
            const data = await response.json();
            localStorage.setItem('questionsAPI', JSON.stringify(data.results));
            const transfomedData = data.results.map((question: APIQuestion) => {
                const correctAnswer = {
                    answerText: question.correct_answer,
                    isCorrect: true,
                };
                const answerOptions = question.incorrect_answers.map(
                    (option) => ({ answerText: option, isCorrect: false })
                );
                answerOptions.splice(
                    Math.floor(Math.random() * 4),
                    0,
                    correctAnswer
                );

                const converted = {
                    questionText: question.question,
                    answerOptions,
                };

                return converted;
            });
            setQuestions(transfomedData);
        })();
    }, []);

    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');

    const handleGameData = (username: string, score: number) => {
        const userData = { username, score, id: uuidv4() };
        const prevResult = JSON.parse(localStorage.getItem('game')!!) ?? [];
        console.log({ prevResult });
        localStorage.setItem('game', JSON.stringify([...prevResult, userData]));
    };

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [usernameInput, setUsernameInput] = useState(false);
    const [openUsernameAlert, setOpenUsernameAlert] = useState(false);
    const [openCorrectAnswerAlert, setOpenCorrectAnswerAlert] = useState(false);
    const [cantPlay, setCantPlay] = useState(true);

    const handleAnswerButtonClick = (isCorrect: boolean) => {
        if (username.length < 2) {
            return null;
        }

        if (isCorrect === true) {
            setOpenCorrectAnswerAlert(true);
            setScore(score + 1);
        } else {
            setOpenCorrectAnswerAlert(false);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const handleUsernameInput = () => {
        if (username.length < 2) {
            setOpenUsernameAlert(true);
            setCantPlay(true);
        } else {
            setUsernameInput(!usernameInput);
            setOpenUsernameAlert(false);
            setCantPlay(false);
        }
    };

    if (questions.length === 0) {
        return (
            <div className={classes.loader}>
                <CircularProgress />
            </div>
        );
    }

    function decodeHtmlCharCodes(str: string) {
        return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
            return String.fromCharCode(charCode);
        });
    }

    return (
        <div className='wrapper'>
            {cantPlay && (
                <Typography className={classes.cantPlay}>
                    You can't play before you enter your name
                </Typography>
            )}
            {openCorrectAnswerAlert && (
                <Alert className={classes.alertCorrectAnswerStyles}>
                    AWESOME!
                </Alert>
            )}
            <div className='userName'>
                <Typography>Username:</Typography>
                {usernameInput ? (
                    <div className={classes.userNameDisplay}>{username}</div>
                ) : (
                    <InputBase
                        placeholder='Enter Your Name'
                        className={classes.textField}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <Button onClick={handleUsernameInput}>
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
                                onClick={() => {
                                    setShowScore(false);
                                    setCurrentQuestion(0);
                                    handleGameData(username, score);
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
                                {_.unescape(
                                    decodeHtmlCharCodes(
                                        String(
                                            questions[currentQuestion]
                                                .questionText
                                        ).replace('&#039;', "'")
                                    )
                                )}
                            </div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map(
                                (answerOption) => (
                                    <Button
                                        key={answerOption.answerText}
                                        onClick={() =>
                                            handleAnswerButtonClick(
                                                answerOption.isCorrect
                                            )
                                        }
                                    >
                                        {_.unescape(
                                            decodeHtmlCharCodes(
                                                String(
                                                    answerOption.answerText
                                                ).replace('&#039;', "'")
                                            )
                                        )}
                                    </Button>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
            {openUsernameAlert && (
                <Alert className={classes.alertUsernameStyles}>
                    Username should be longer than 2 characters
                </Alert>
            )}
        </div>
    );
};

export default Quiz;
