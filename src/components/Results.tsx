import ResultsTable from './ResultsTable';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
    },
});

const Results = () => {
    const classes = useStyles();

    return (
        <>
            <Typography variant='h4' className={classes.title}>
                RESULTS PAGE
            </Typography>
            <ResultsTable />
        </>
    );
};

export default Results;
