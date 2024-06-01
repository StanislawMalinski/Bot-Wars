import './App.scss';
import Navbar from './Navbar';
import Home from './Home';
import { useState } from 'react';

function App() {
    const [isAuthenticated] = useState(false);

    return (
        <div className="app">
            <Navbar isAuthenticated={isAuthenticated} user={null} />
                    {/* tutaj przesyla uzytkownika */}

            <Home isAuthenticated={isAuthenticated} />  
        </div>
    );
}

export default App;
