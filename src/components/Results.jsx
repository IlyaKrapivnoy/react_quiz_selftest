import React from 'react';
import Header from './Header';
import ResultsTable from './ResultsTable';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
    },
}));

const Test1 = () => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Typography variant='h4' className={classes.title}>
                RESULTS PAGE
            </Typography>
            <ResultsTable />
        </>
    );
};

export default Test1;
