import { Api } from './Api'

export const MatchesService = {
    getMatches: async (page, pageSize, tournamentId, maxDate, minDate, gameType) => {
        // Type Post
        // Params:
        //// page - integer - int32
        //// pageSize - integer - int32
        // Body:
        //// tournamentId - integer - int64
        //// maxDate - string - date-time
        //// minDate - string - date-time
        //// gameType - string

        return [{"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 1},
            {"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 2},
            {"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 3},
            {"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 4},
            {"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 5},
            {"players": ["stanely", "jordan", "stachurski"], "gameType": "chess", "tournamentName": "chess tournament", "date": "2021-10-10", "id": 6}]
        
        const response = await Api.get(`Matches/getAll?page=${page}&pageSize=${pageSize}`, {
            tournamentId: tournamentId,
            maxDate: maxDate,
            minDate: minDate,
            gameType: gameType
            });
        return response.data;
    },
    getMatch: async (matchId) => {
        // Type Get
        // Params:
        //// matchId - integer - int64
        return {"players": ["stanely", "jordan", "stachurski"], 
            "result": {"stanely": 2, "jordan": 1, "stachurski": 0},
            "gameType": "chess", 
            "tournamentName": "chess tournament", 
            "date": "2021-10-10", 
            "id": 1};
        const response = await Api.get('Matches/get', {
            params: {
                matchId: matchId
            }
        });
        return response.data;
    },
    getMatchLog: async (matchId) => {
        // Type Get
        // Params:
        //// matchId - integer - int64
        return {log: `0
        7 of Yellow;6 of Brown;2 of Red;8 of Brown;3 of Pink;7 of Brown;8 of Red;8 of Green;4 of Yellow; Table: 2 of Brown;6 of Yellow;6 of White;7 of White;8 of White;
        1 4
        1
        7 of Red;1 of Yellow;7 of Pink;5 of Brown;1 of Blue;4 of Green;5 of Red;7 of Green;8 of Pink; Table: 2 of Brown;6 of Yellow;6 of White;7 of White;6 of Brown;
        8 3
        0
        7 of Yellow;8 of White;2 of Red;8 of Brown;3 of Pink;7 of Brown;8 of Red;8 of Green;4 of Yellow; Table: 2 of Brown;6 of Yellow;6 of White;8 of Pink;6 of Brown;
        8 3
        1
        7 of Red;1 of Yellow;7 of Pink;5 of Brown;1 of Blue;4 of Green;5 of Red;7 of Green;7 of White; Table: 2 of Brown;6 of Yellow;6 of White;4 of Yellow;6 of Brown;
        5 0
        0
        7 of Yellow;8 of White;2 of Red;8 of Brown;3 of Pink;7 of Brown;8 of Red;8 of Green;8 of Pink; Table: 4 of Green;6 of Yellow;6 of White;4 of Yellow;6 of Brown;
        fold
        1
        7 of Red;1 of Yellow;7 of Pink;5 of Brown;1 of Blue;2 of Brown;5 of Red;7 of Green;7 of White; Table: 4 of Green;6 of Yellow;6 of White;4 of Yellow;6 of Brown;
        fold
        -1
        0`};
        const response = await Api.get('Matches/getLog', {
            params: {
                matchId: matchId
            }
        });
        return response.data;
    },
}