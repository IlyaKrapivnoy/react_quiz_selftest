import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

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
}) {
    const classes = useStyles();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
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
