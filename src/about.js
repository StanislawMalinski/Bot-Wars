import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import './index.scss';
import './about.scss';
import teamPhoto from './resources/about/team.jpeg';
import productPhoto from './resources/about/product-owner.png';
import scrumPhoto from './resources/about/scam-master.png';
import officePhoto from './resources/about/office.png';
import backendPhoto from './resources/about/combined-back.png';
import frontPhoto from './resources/about/front-team.png';
import homePhoto from './resources/about/home.png';






function About() {

    useEffect(() => {
        const homeButton = document.querySelector('.home-button');
        let lastScrollTop = 0;

        window.onload = () => {
            homeButton.classList.add('active');
        };

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                homeButton.classList.remove('active');
            } else {
                homeButton.classList.add('active');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        return () => {
            window.removeEventListener('scroll', () => { });
        };
    }, []);

    return (
        <div className="about">

            <Link to="/" className="home-button">
                <img src={homePhoto} alt="Home" className="home-image" />
            </Link>


            <h1>About us</h1>

            <div className="meet-the-team">
                <h2 className="color-primary-4 animated-text">Meet Bot-Wars Team</h2>
            </div>


            <div className='about-container'>


                <div className="section">
                    <div className="description">
                        <h2 className="color-primary-1">Our Story</h2>
                        <p>Welcome to the Bot-Wars project. As enthusiasts of games, artificial intelligence, and friendly competition, we aim to create an online platform for our bots to duel.</p>
                        <p>The service will ultimately allow users to create accounts and participate in tournaments by uploading their bots.</p>
                        <p>Users will also be able to inspect their tournament results and those of other players.</p>
                    </div>
                    <img src={teamPhoto} alt="Team Photo" className="team-photo" />
                </div>


                <div className="description timeline">
                    <h2 className="color-primary-1">Project Timeline</h2>
                    <div className="timeline-container ">
                        <div className="timeline-item">
                            <div className="timeline-date">Oct 2023</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Kickoff</h3>
                                <p>Initiated the Bot-Wars project, gathered requirements, and formed the core team.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">Nov 2023</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Initial Planning</h3>
                                <p>Developed the project plan, identified key milestones, and assigned roles and responsibilities.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">Dec 2023</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Development Phase</h3>
                                <p>Started the development of the platform with front-end and back-end teams working in parallel.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">May 2024</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Testing & QA</h3>
                                <p>Conducted rigorous testing and quality assurance to ensure the platform's stability and performance.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-date">June 2024</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Launch</h3>
                                <p>Officially launched the Bot-Wars platform and began onboarding users.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Our Team</h2>

                <div className="section">
                    <div className="description">
                        <img src={productPhoto} alt="Product Owner" className="team-photo" />
                        <h2>Product Owner</h2>
                        <p>Jan Stachurski, our Product Owner, ensures that the project aligns with the vision and requirements. He manages the project timeline, prioritizes tasks, and coordinates with the team to meet our goals.</p>
                    </div>
                    <div className="description">
                        <img src={scrumPhoto} alt="Scrum Master" className="team-photo" />
                        <h2>Scrum Master</h2>
                        <p>Stanisław Maliński, our Scrum Master, facilitates our agile processes, ensures effective communication, and removes any obstacles that may hinder the team's progress.</p>
                    </div>
                </div>

                <div className="team-section">
                    <h4 className="color-secondary-1-2">Front Team</h4>
                    <div className="team-content">
                        <img src={frontPhoto} alt="Front End Team" className="team-photo" />
                        <div className="description">
                            <p>The Front End Team focused on creating a seamless and interactive user experience for Bot-Wars. They implemented responsive design, ensuring the platform works smoothly across various devices and screen sizes.</p>
                            <h3>Team Members:</h3>
                            <ul>
                                <li><strong>Jordan Parviainen:</strong> Lead Front End Developer, responsible for overall UI/UX design and implementation.</li>
                                <li><strong>Mikołaj Burdzy:</strong> Front End Developer, worked on interactive components and user interface enhancements.</li>
                                <li><strong>Jakub Miętki:</strong> Front End Developer, ensured cross-browser compatibility and responsiveness.</li>
                                <li><strong>Jan Zubalewicz:</strong> Front End Developer, ensured cross-browser compatibility and responsiveness.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="team-section">
                    <h4 className="color-secondary-1-2">Backend Team</h4>
                    <div className="team-content">
                        <img src={backendPhoto} alt="Back End Team" className="team-photo" />
                        <div className="description">
                            <p>The Back End Team was responsible for the server-side logic and database management of Bot-Wars. They developed robust APIs and ensured the platform's scalability and security.</p>
                            <h3>Team Members:</h3>
                            <ul>
                                <li><strong>Jakub Niewadzi:</strong> Lead Backend Developer, responsible for database design and API development.</li>
                                <li><strong>Jakub Wysocki:</strong> Backend Developer, worked on server-side logic and integration with third-party services.</li>
                                <li><strong>Mateusz Charczuk:</strong> Backend Developer, focused on performance optimization and security enhancements.</li>
                                <li><strong>Szymon Posiadała:</strong> Backend Developer, focused on performance optimization and security enhancements.</li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h4>How we worked?</h4>
                    <img src={officePhoto} alt="Team Photo" className="process-photo" />
                    <div className="description process">
                        <p>The development of Bot-Wars involves a collaborative effort where each team member contributes their unique skills.</p>
                        <p>The project is managed by our dedicated <span className="product-owner">Product Owner: Jan Stachurski</span>, who ensures that our goals are met and that we stay on track.</p>
                        <p>From initial brainstorming sessions to final implementation, our team works hard to bring this platform to life.</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default About;
