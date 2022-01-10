import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ResultsTablePagination from './ResultsTablePagination';
import { Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Result } from '../types';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ResultsTable() {
    const classes = useStyles();

    const [rows, setRows] = useState<Result[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const results: Result[] =
            JSON.parse(localStorage.getItem('game')!!) ?? [];
        const resultsWithoutId = results.filter((result) => !('id' in result));
        if (resultsWithoutId.length > 0) {
            resultsWithoutId.forEach((item) => {
                item.id = uuidv4();
            });
            localStorage.setItem('game', JSON.stringify(results));
        }
        setRows(results);
    }, []);

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleDelete = (row: Result) => {
        console.log({ row });
        const filteredRows = rows.filter((line) => line.id !== row.id);
        localStorage.setItem('game', JSON.stringify(filteredRows));
        setRows(filteredRows);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>USERNAME</TableCell>
                            <TableCell align='center'>SCORE</TableCell>
                            <TableCell align='center'>CLEAR</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, i) => (
                                <TableRow key={uuidv4()}>
                                    <TableCell align='center'>
                                        {row.username}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.score}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={() => handleDelete(row)}
                                        >
                                            x
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: ('' ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ResultsTablePagination
                rows={rows}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </>
    );
}
