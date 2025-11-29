import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome to Real Estate App</h1>
            {user ? (
                <div>
                    <p>Hello, {user.name} ({user.role})</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please login or register</p>
            )}
        </div>
    );
};

export default Home;
