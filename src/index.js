import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import GamesList from "./lists/GamesList";
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
import { Provider } from 'react-redux';
import store from './User/store';
import { getListOfTournaments } from './Tournaments/getListOfTournaments';
import UserSettings from './User/Settings/UserSettings';
import MatchesSearch from './Matches/MatchesSearch';
import MatchView from './Match/MatchView';

const games = [{name:'Szachy', id:1}, {name:'Warcaby', id:2}, {name:'Scrabble', id:3}, {name:'Chińczyk', id:4}, {name:'Go', id:5}]

const tournaments = getListOfTournaments();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/player/:id",
        element: <ProfileView/>,
    },
    {
        path: "/games",
        element: <GamesList games={games}/>,
    },
    {
        path: "/games/add",
        element: <AddGameForm games={games}/>,
    },
    {
        path: "/matches/:tournamentId?/:playerName?/:maxDate?/:minDate?/:gameType?",
        element: <MatchesSearch />,
    },
    {
        path: "/match/:id",
        element: <MatchView />,
    },
    {
        path: "/tournaments/add",
        element: <AddTournamentForm />,
        // In Future with more Turnaments
        // Assuming getListOfTypesOfGames returns an array of game types
        //element: <AddTournamentForm gameTypes={getListOfTypesOfGames()} />,
    },
    {
        path: "/tournaments/edit/:id",
        element: <EditTournamentForm />,
    },
    {
        path: "/tournaments/home",
        element: <TournamentsList tournaments={tournaments} />,
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
