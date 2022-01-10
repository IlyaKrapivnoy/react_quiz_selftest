import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import { Result } from '../types';

interface IResultsTablePaginationProps {
    rows: Result[];
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rowsPerPage: number) => void;
}

const useStyles = makeStyles({
    centerPagination: {
        display: 'flex',
        justifyContent: 'center',
    },
});

export default function ResultsTablePagination({
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}: IResultsTablePaginationProps) {
    const classes = useStyles();
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <div className={classes.centerPagination}>
            <TablePagination
                component='div'
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}
