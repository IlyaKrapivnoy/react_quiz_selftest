import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function ResultsTablePagination({
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}) {
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <TablePagination
            component='div'
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
