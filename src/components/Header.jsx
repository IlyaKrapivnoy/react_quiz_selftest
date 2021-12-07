import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <Link to='/' style={{ margin: '0 10px', textDecoration: 'none' }}>
                QUIZ
            </Link>
            <Link
                to='/results'
                style={{ margin: '0 10px', textDecoration: 'none' }}
            >
                Results
            </Link>
        </nav>
    );
};

export default Header;
