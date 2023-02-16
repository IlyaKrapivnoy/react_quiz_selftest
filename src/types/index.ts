export interface IResultsTablePaginationProps {
    rows: Result[];
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
}

export type Result = {
    id?: string;
    username: string;
    score: number;
};

export type APIQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type AnswerOption = {
    answerText: string;
    isCorrect: boolean;
};

export type Question = {
    questionText: string;
    answerOptions: AnswerOption[];
};