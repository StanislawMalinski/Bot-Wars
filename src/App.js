import './App.scss';
import Navbar from './Navbar';
import Home from './Home';
import { useState } from 'react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);


    const toggleUserBar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="app">
            
            <Navbar isAuthenticated={isAuthenticated} user={null} />
                    {/* tutaj przesyla uzytkownika */}

            <Home isAuthenticated={isAuthenticated} />  
        </div>
    );
}

export default App;
