import React, {useRef} from 'react';
import './Home.scss';
import roboImg from './resources/robot3.png';

import pythonLogo from './resources/python-logo.svg';
import javaLogo from './resources/java-logo.svg';
import cppLogo from './resources/C++-logo.svg';
import {useNavigate} from "react-router-dom";

function Home({isAuthenticated}) {
    const getStartedRef = useRef(null);

    const navigate = useNavigate();

    const scrollToGetStarted = () => {
        if (getStartedRef.current) {
            getStartedRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div className="home">
            <div className="hero-section">
                <img src={roboImg} alt="Robot" className="hero-image"/>
                <div className="welcome-box">
                    <h1>Welcome to Bot-Wars!</h1>
                    {isAuthenticated ? (
                        <>
                            <p>Welcome back! Check out our latest tournaments and games.</p>
                        </>
                    ) : (
                        <>
                            <p>Join us today and start competing in our exciting tournaments!</p>
                            <div className="get-started-link" onClick={scrollToGetStarted}>
                                <a href="#">Get Started</a>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="info-boxes">
                <div className="info-box large">
                    <h2>Versatile Bot Platform</h2>
                    <p>
                        Create, duel, and compete with your bots. Join or create tournaments, challenge friends, or rise
                        in the global rankings.
                    </p>
                </div>
                <div className="info-box">
                    <h2>AI Bot Mastery</h2>
                    <p>Learn to design and configure bots for exciting matches and tournaments.</p>
                </div>
                <div className="info-box">
                    <h2>Tournaments</h2>
                    <p>Join tournaments, compete with players, and climb the leaderboard to become the champion.</p>
                </div>
            </div>
            <div ref={getStartedRef} className="content">
                <div className="content-box big-component">
                    <h2>Bot Language support</h2>
                    <div className="language-box-container">
                        <div className="python-logo language-box">
                            <img className="language-logo" src={pythonLogo} alt="Python Logo"/>
                        </div>
                        <div className="java-logo language-box">
                            <img className="language-logo" src={javaLogo} alt="Java Logo"/>
                        </div>
                        <div className="cpp-logo language-box">
                            <img className="language-logo" src={cppLogo} alt="C++ Logo"/>
                        </div>
                    </div>
                </div>
                <div className="gs-rp-htp-box big-component">
                    <div className="gs-rp-box">
                        <div className="content-box">
                            <div className='header-container'>
                                <h2>Getting Started</h2>
                            </div>
                            <ol className="aligned-list">
                                <li><a onClick={() => navigate('register')}>Sign Up</a>: Create your account to join the
                                    community.
                                </li>
                                <li><a onClick={() => navigate('games')}>Explore Games</a>: Discover various bot games
                                    and tournaments available.
                                </li>
                                <li><a onClick={() => navigate('tournaments/add')}>Create Your Own Tournament</a>:
                                    Design and host your tournaments, invite friends, and compete.
                                </li>
                            </ol>
                        </div>
                        <div className="registration-process content-box">
                            <div className='header-container'>
                            <h2>Registration Process</h2>
                            </div>
                            <ol className='aligned-list'>
                                <li>Visit the <a onClick={() => navigate('register')}>Sign-Up Page</a>.</li>
                                <li>Fill in your details and verify your email.</li>
                                <li>Complete your profile and set up your first bot.</li>
                                <li>Start participating in tournaments and duels!</li>
                            </ol>
                        </div>
                    </div>
                    <div className="content-box">
                        <h2>How to Play</h2>
                        <ul>
                            <li><h3>Design Your Bot:</h3> <span>Use our intuitive tools to create and program your bot or see the example bots on our <a
                                href="https://github.com/stanislawmalinski/bot-wars-back">Backend GitHub</a> page or checkout our
                             <a href="https://github.com/jordus100/bot-wars-front"> Frontend GitHub</a> page.</span>
                            </li>
                            <li><h3>Test Your Bot:</h3> <span>Run simulations to ensure your bot performs well under different scenarios.</span>
                            </li>
                            <li><h3>Join Tournament:</h3> <span>Enter your bot in matches and tournaments to compete against others.</span>
                            </li>
                            <li><h3>Analyze Results:</h3>
                                <span>Review match results to improve your bot's performance.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
