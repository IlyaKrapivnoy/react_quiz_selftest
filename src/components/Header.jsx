import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav
            style={{
                borderBottom: 'solid 1px',
                paddingBottom: '1rem',
            }}
        >
            <Link to='/'>QUIZ</Link>
            <Link to='/results'>Results</Link>
        </nav>
    );
};

export default Header;
