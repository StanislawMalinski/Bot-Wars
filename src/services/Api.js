import axios from "axios";
import c from "./client.config.json";
import store from '../User/store'

const baseURL = c["protocol"] + "://" + c["host"] + ":" + c["port"] + "/" + c["path"] + c["version"];

export const Api = axios.create({
    baseURL: baseURL,
    withCredentials: true
    
})
Api.interceptors.request.use(function (config) {
    try{
        const token = store.getState().user.token;
        config.headers.Authorization =  'Bearer ' + token; 
    }catch(e){}
    return config;
});
// await Api.get('GameType/getAll')
// Api.defaults.headers['Authorization'] = 'sdfsdfsd';

function prepareParams(data, params) {
    if (params === undefined || params.length == 0) {
        return ""
    }
    for (var i = 0; i < params.length; i++) {
        if (!data.hasOwnProperty(params[i])) {
            throw Error("Invalid request, lack of parameter: " + params[i])
        }
    }

    return "?" + params.map((param) => {
        return "" + param + "=" + data[param]
    }).join("&")
}

function prepareBody(data, body) {
    if (body === undefined || body.length == 0) {
        return {}
    }

    for (var i = 0; i < body.length; i++) {
        if (!data.hasOwnProperty(body[i])) {
            throw Error("Invalid request, lack of body parameter: " + body[i])
        }
    }
    
    const dictionary = {};
    for (const key of body) {
        if (data.hasOwnProperty(key)) {
            dictionary[key] = data[key];
        }
    }

    return dictionary
}

async function Request(data, endpoint, apifunc) {
    console.log(apifunc)
    apifunc = c["urls"][endpoint]["functions"][apifunc];
    const path = apifunc["path"];
    const method = apifunc["method"];
    const params = apifunc["params"];
    const body = apifunc["body"];
    const reqParams = prepareParams(data, params);
    const reqBody = prepareBody(data, body);
    const user = store.getState().user;
    const h = { 
        "accept": "*/*",
    };

    if (user !== null) {
        h["Authorization"] = "Bearer " + user.token;
    }
    
    
    const url = c["urls"][endpoint]["path"] + path + reqParams;
    await Api({
            method: method,
            url: url,
            data: reqBody,
            headers: h
        }).then((res) => {
            console.log(res)
            return res.data
        }).catch((err) => {
            console.log(err)
        })
}

// Achievements

function GetAchivmentsForPlayer(request) {
    if (!backend) 
    return {
        "data": [
          {
            "id": 1,
            "value": 10,
            "achievementTypeId": 1,
            "description": "You need to play this amount of games",
            "playerId": 1
          },
          {
            "id": 1,
            "value": 20,
            "achievementTypeId": 1,
            "description": "You need to play this amount of games",
            "playerId": 1
          },
          {
            "id": 1,
            "value": 5,
            "achievementTypeId": 1,
            "description": "You need to play this amount of games",
            "playerId": 1
          },
          {
            "id": 2,
            "value": 4,
            "achievementTypeId": 2,
            "description": "You need to upload this amount of bots",
            "playerId": 1
          },
          {
            "id": 2,
            "value": 8,
            "achievementTypeId": 2,
            "description": "You need to upload this amount of bots",
            "playerId": 1
          }
        ]
    }
    return Request(request, "achievements", "GetAchievementsForPlayer")
}

function GetAchievementsTypes(request) {
    if (!backend) 
    return {
        "data": [
          {
            "id": 1,
            "description": "You need to play this amount of games",
            "thresholds": [
              10,
              20,
              5
            ]
          },
          {
            "id": 2,
            "description": "You need to upload this amount of bots",
            "thresholds": [
              4,
              8
            ]
          },
          {
            "id": 3,
            "description": "You need to win this amount of games",
            "thresholds": [
              5,
              10
            ]
          },
          {
            "id": 4,
            "description": "You need to win this amount of tournaments",
            "thresholds": [
              1,
              5
            ]
          }
        ]
    }
    return Request(request, "achievements", "GetAchievementTypes")
}


// Administrative 

function BanPlayer(request) {
    if (!backend) return;
    return Request(request, "player", "BanPlayer")
}

function UnbanPlayer(request) {
    if (!backend) return;
    return Request(request, "player", "UnbanPlayer")
}

// Database

function ResetDatabase(request) {
  if (!backend) return;
  return Request(request, "database", "ResetDatabase")
}

function DeleteDatabase(request) {
  if (!backend) return;
  return Request(request, "database", "DeleteDatabase")
}

// Gametype

function GetGameTypes(request) {
    if (!backend) 
    return {
      "data": [
        {
          "id": 1,
          "numbersOfPlayer": 10,
          "lastModification": "2024-03-18T09:40:11.5405426",
          "gameFileName": "Quake III Arena",
          "gameInstructions": "Eliminate the enemy players in fast-paced multiplayer battles.",
          "interfaceDefinition": "First-Person Shooter (FPS)",
          "isAvailableForPlay": true,
          "fileId": 5,
          "botIds": [
            1,
            2
          ],
          "tournamentsIds": [
            1
          ],
          "matchesIds": []
        },
        {
          "id": 2,
          "numbersOfPlayer": 1,
          "lastModification": "2024-03-18T09:40:11.5405433",
          "gameFileName": "The Legend of Zelda: Breath of the Wild",
          "gameInstructions": "Embark on an epic adventure to defeat the Calamity Ganon and save Hyrule.",
          "interfaceDefinition": "Action-Adventure",
          "isAvailableForPlay": true,
          "fileId": 1,
          "botIds": [
            3,
            4
          ],
          "tournamentsIds": [
            2
          ],
          "matchesIds": []
        }
    ]}
    return Request(request, "gametype", "GetGameTypes")
}

function GetAvailableGameTypes(request) {
    if (!backend)  
    return {
        "data": [
          {
            "id": 1,
            "numbersOfPlayer": 10,
            "lastModification": "2024-03-18T09:40:11.5405426",
            "gameFileName": "Quake III Arena",
            "gameInstructions": "Eliminate the enemy players in fast-paced multiplayer battles.",
            "interfaceDefinition": "First-Person Shooter (FPS)",
            "isAvailableForPlay": true,
            "fileId": 5,
            "botIds": [
              1,
              2
            ],
            "tournamentsIds": [
              1
            ],
            "matchesIds": []
          },
          {
            "id": 2,
            "numbersOfPlayer": 1,
            "lastModification": "2024-03-18T09:40:11.5405433",
            "gameFileName": "The Legend of Zelda: Breath of the Wild",
            "gameInstructions": "Embark on an epic adventure to defeat the Calamity Ganon and save Hyrule.",
            "interfaceDefinition": "Action-Adventure",
            "isAvailableForPlay": true,
            "fileId": 1,
            "botIds": [
              3,
              4
            ],
            "tournamentsIds": [
              2
            ],
            "matchesIds": []
          }
    ]}
    return Request(request, "gametype", "GetAvailableGameTypes")
}

function GetGameType(request) {
  if (!backend)
  return {
    "data": {
      "id": 1,
      "numbersOfPlayer": 10,
      "lastModification": "2024-03-18T09:40:11.5405426",
      "gameFileName": "Quake III Arena",
      "gameInstructions": "Eliminate the enemy players in fast-paced multiplayer battles.",
      "interfaceDefinition": "First-Person Shooter (FPS)",
      "isAvailableForPlay": true,
      "fileId": 5,
      "botIds": [
        1,
        2
      ],
      "tournamentsIds": [
        1
      ],
      "matchesIds": []
    }
  }
  return Request(request, "gametype", "GetGameType")
}

function AddGameType(request) {
  if (!backend) return;
  return Request(request, "gametype", "AddGameType")
}

function UpdateGameType(request) {
  if (!backend) return;
  return Request(request, "gametype", "UpdateGameType")
}

function DeleteGameType(request) {
  if (!backend) return;
  return Request(request, "gametype", "DeleteGameType")
}

// Player

function RegisterPlayer(request) {
    if (!backend) return;
    return Request(request, "player", "RegisterPlayer")
}


function LoginPlayer(request) {
    if (!backend) return;
    return Request(request, "player", "LoginPlayer")
}

function GetUser(request) {
    if (!backend)
    return {
        "id": request["id"],
        "login": "RdmusR_97",
        "rating": 1203,
        "lastSeen": "2024-02-11T19:21:17.85",
        "joined": "2024-02-06T19:21:17.85",
        "photoURL": "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1709386522~exp=1709387122~hmac=612506df2e857afd82d8b64b5b44128ef42d1e046876d26074bb46b41abe1fb0"
    }
    return Request(request, "player","GetPlayer")
}

// Points

function GetPointsForPlayer(request) {
    if (!backend) return;
    return Request(request, "points", "GetPointsForPlayer")
}

function GetLeaderboard(request) {
    if (!backend) return;
    return Request(request, "points", "GetLeaderboard")
}

function GetPointsHistoryForPlayer(request) {
    if (!backend)
    return {
        "data": [
          {
            "id": 1,
            "logDate": "2024-02-06T19:21:17.85",            
            "rating": 12,
            "playerId": 1
          },
          {
            "id": 2,
            "logDate": "2024-02-07T19:21:17.85",            
            "rating": 20,
            "playerId": 1
          },
          {
            "id": 3,
            "logDate": "2024-02-08T19:21:17.85",            
            "rating": 30,
            "playerId": 1
          },
          {
            "id": 4,
            "logDate": "2024-02-09T19:21:17.85",            
            "rating": 40,
            "playerId": 1
          },
          {
            "id": 5,
            "logDate": "2024-02-10T19:21:17.85",            
            "rating": 50,
            "playerId": 1
          },
          {
            "id": 6,
            "logDate": "2024-02-11T19:21:17.85",            
            "rating": 60,
            "playerId": 1
          }
        ]
    }
    return Request(request, "points", "GetPointsHistoryForPlayer")
}

// Tournaments

function GetTournaments(request) {
    if (!backend) return;
    return Request(request, "tournament", "GetAllTournaments")
}

function GetAllTournaments(request) {
    if (!backend) return;
    return Request(request, "tournament", "GetAllTournaments")
}

function GetFilteredTournaments(request) {
  if (!backend) return;
  return Request(request, "tournament", "GetFilteredTournaments")
}

function AddTournament(request) {
    if (!backend) return;
    return Request(request, "tournament", "AddTournament")
}

function UpdateTournament(request) {
    if (!backend) return;
    return Request(request, "tournament", "UpdateTournament")
}

function DeleteTournament(request) {
    if (!backend) return;
    return Request(request, "tournament", "DeleteTournament")
}

function RegisterBotForTournament(request) {
    if (!backend) return;
    return Request(request, "tournament", "RegisterBotForTournament")
}

function UnregisterBotForTournament(request) {
    if (!backend) return;
    return Request(request, "tournament", "UnregisterBotForTournament")
}

// UserSettings

function GetUserSettings(request) {
    if (!backend) return;
    return Request(request, "userSettings", "GetUserSettings")
}

function UpdateUserSettings(request) {
    if (!backend) return;
    return Request(request, "userSettings", "UpdateUserSettings")
}

function DeleteUserSettings(request) {
    if (!backend) return;
    return Request(request, "userSettings", "DeleteUserSettings")
}

Api.processError = (err) => {
    throw Error(err.message)
}

function ApiTest() {
    console.log("Api test")

    console.log(GetAchivmentsForPlayer({"playerId": 1}))
    console.log(GetAchievementsTypes({}))
    console.log(GetGameTypes({}))
    console.log(GetAvailableGameTypes({}))
    console.log(GetGameType({"id": 1}))
    console.log(GetUser({"id": 1}))
    console.log(GetPointsForPlayer({"playerId": 1}))
    console.log(GetLeaderboard({}))
    console.log(GetPointsHistoryForPlayer({"playerId": 1}))
    console.log(GetTournaments({}))
    console.log(GetAllTournaments({}))
    console.log(GetFilteredTournaments({"gameId":1, "date": "2024-02-06T19:21:17.85"}))
    console.log(GetUserSettings({"id": 1}))
}

export {
    GetAchievementsTypes,
    BanPlayer,
    UnbanPlayer,
    ResetDatabase,
    DeleteDatabase,
    GetGameTypes,
    GetAvailableGameTypes,
    GetGameType,
    AddGameType,
    UpdateGameType,
    DeleteGameType,
    RegisterPlayer,
    LoginPlayer,
    GetUser,
    GetPointsForPlayer,
    GetLeaderboard,
    GetPointsHistoryForPlayer,
    GetTournaments,
    GetAllTournaments,
    GetFilteredTournaments,
    AddTournament,
    UpdateTournament,
    DeleteTournament,
    RegisterBotForTournament,
    UnregisterBotForTournament,
    GetUserSettings,
    UpdateUserSettings,
    DeleteUserSettings,
    ApiTest,
}