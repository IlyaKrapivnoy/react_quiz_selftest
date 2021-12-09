import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252d4a',
        height: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    link: {
        margin: '0 16px',
        textDecoration: 'none',
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position='static'>
            <Toolbar className={classes.header}>
                <Link to='/' className={classes.link}>
                    QUIZ
                </Link>
                <Link to='/results' className={classes.link}>
                    Results
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
