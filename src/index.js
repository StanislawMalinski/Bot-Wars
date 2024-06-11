import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import GamesView from "./Games/GamesView";
import GameDetails from "./Games/GameDetails";
import AddGameForm from "./forms/AddGameForm";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import TournamentsList from "./lists/TournamentsList";
import AddTournamentForm from "./forms/AddTournamentForm";
import EditTournamentForm from "./forms/EditTournamentForm";
import TournamentDetails from "./Tournaments/TournamentDetails";
import ProfileView from "./User/ProfileView/ProfileView";
import About from "./about.js";
import Admin from "./admin/Admin";
import PlayerBots from "./admin/PlayerBots";
import PlayerGames from "./admin/PlayerGames";
import PlayerTournaments from "./admin/PlayerTournaments";
import Leaderboard from "./Tournaments/leaderboard.js";
import TournamentsHelp from "./Tournaments/TournamentsHelp";
import TournamentsLeaderboard from "./Tournaments/TournamentsLeaderboard";
import {Provider} from 'react-redux';
import store from './User/store';
import UserSettings from './User/Settings/UserSettings';
import AnimatedBackground from "./AnimatedBackground";
import AddBotForm from "./forms/AddBotForm";
import BotList from "./lists/BotList";
import Chess from "./visualization/chess.js";
import $ from 'jquery'; // Import jQuery
window.$ = $; // Make jQuery available globally


const games = [{name:'Szachy', id:1}, {name:'Warcaby', id:2}, {name:'Scrabble', id:3}, {name:'Chińczyk', id:4}, {name:'Go', id:5}]

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/player/:name",
        element: <ProfileView/>,
    },
    {
        path: "/games",
        element: <GamesView />,
    },
    {
        path: "/games/details/:gameId",
        element: <GameDetails />,
    },
    {
        path: "/games/add",
        element: <AddGameForm games={games}/>,
    },
    {
        path: "/tournaments/add",
        element: <AddTournamentForm />,
    },
    {
        path: "/tournaments/edit/:id",
        element: <EditTournamentForm />,
    },
    {
        path: "/tournaments/home",
        element: <TournamentsList />,
    },
    {
        path: "/tournaments/details/:tournamentId",
        element: <TournamentDetails />,
    },
    {
        path: "/tournaments/help",
        element: <TournamentsHelp />,
    },
    {
        path: "/tournaments/leaderboard",
        element: <TournamentsLeaderboard />,
    },
    {
        path: "/register",
        element: <RegisterForm/>,
    },
    {
        path: "/login",
        element: <LoginForm/>,
    },
    {
        path: "/settings",
        element: <UserSettings/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/leaderboard",
        element: <Leaderboard/>,
    },
    {
        path: "/admin",
        element: <Admin/>,
    },
    {
        path: "/admin/PlayerBots",
        element: <PlayerBots/>,
    },
    {
        path: "/admin/PlayerGames",
        element: <PlayerGames/>,
    },
    {
        path: "/admin/PlayerTournaments",
        element: <PlayerTournaments/>,
    },
    {
        path: "/bots/add",
        element: <AddBotForm/>
    },
    {
        path: "/bots",
        element: <BotList/>
    },
    {
        path: "/chess",
        element: <Chess/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <head>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <title>Bot-Wars</title>
        </head>
        <body>
            <AnimatedBackground></AnimatedBackground>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </body>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
