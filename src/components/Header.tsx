import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';

interface IHeaderProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#252d4a',
        height: 40,
        width: '100%',
    },
    navLinks: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    link: {
        margin: '0 16px',
        textDecoration: 'none',
    },
    loginBtn: {
        position: 'absolute',
        right: '12%',
    },
    toolbarWrapper: {
        '& .MuiToolbar-gutters': {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
});

const Header = ({ isLoggedIn, setIsLoggedIn }: IHeaderProps) => {
    const classes = useStyles();

    return (
        <AppBar position='static' className={classes.toolbarWrapper}>
            <Toolbar className={classes.header}>
                <div className={classes.navLinks}>
                    <Link to='/' className={classes.link}>
                        QUIZ
                    </Link>
                    <Link to='/results' className={classes.link}>
                        Results
                    </Link>
                </div>
                {isLoggedIn ? (
                    <Button
                        className={classes.loginBtn}
                        onClick={() => setIsLoggedIn(false)}
                    >
                        Log Out
                    </Button>
                ) : (
                    <Button
                        className={classes.loginBtn}
                        onClick={() => setIsLoggedIn(true)}
                    >
                        Log In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
