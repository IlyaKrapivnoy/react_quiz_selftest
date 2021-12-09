import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ResultsTable() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const results = JSON.parse(localStorage.getItem('game')) ?? [];
        setRows(results);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>USERNAME</TableCell>
                        <TableCell align='center'>SCORE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell align='center'>{row.username}</TableCell>
                            <TableCell align='center'>{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
