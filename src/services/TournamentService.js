import { Api } from './Api'
const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

const currentTime = getCurrentTime();

export const TournamentService = {
    getFilteredTournaments: async function (page, pageSize, tournamentTitle, minPlayOutDate, maxPlayOutDate, creator, userParticipation) {
        // Type GET
        // Parameters:
        //// page - integer - int32
        //// pagesize - integer - int32
        // Body:
        //// tournamentTitle - string
        //// minPlayOutDate - date (2024-05-10T13:13:15.534Z)
        //// maxPlayOutDate - date (2024-05-10T13:13:15.534Z) 
        //// creator - string
        //// userParticipation - string
        try {
            return await Api.get(`Tournament/getFiltered?page=${page}&pageSize=${pageSize}`,{
                tournamentTitle: tournamentTitle,
                minPlayOutDate: minPlayOutDate,
                maxPlayOutDate: maxPlayOutDate,
                creator: creator,
                userParticipation: userParticipation})
        } catch(e) {
             return Api.processError(e)
        }
    },
    getListOfTournaments: async function (page, pageSize) {
        // Type GET
        // Parameters:
        //// page - integer - int32
        //// pagesize - integer - int32
        try {
            return await Api.get(`Tournament/getFiltered?page=${page}&pageSize=${pageSize}`)
        } catch(e) {
             return Api.processError(e)
        } 
    },
    deleteTournament: async function (id) {
        // Type DELETE
        // Parameters:
        //// id - integer - int64
        try {
            return await Api.delete(`Tournament/delete?id=${id}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    addTournament: async function (tournamentTitle, description, gameId, playersLimit, tournamentsDate, constraints, image, memoryLimit, timeLimit) {
        // Type POST
        // Body:
        //// tournamentTitle - string
        //// description - string
        //// gameId - number
        //// playersLimit - number
        //// tournamentsDate - string (e.g. "2024-05-10T13:19:46.277Z")
        //// constraints - string
        //// image - string
        //// memoryLimit - number
        //// timeLimit - number
        try {
            return await Api.post(`Tournament/add`,{
                tournamentTitle: tournamentTitle,
                description: description,
                gameId: gameId,
                playersLimit: playersLimit,
                tournamentsDate: tournamentsDate,
                constraints: constraints,
                image: image,
                memoryLimit: memoryLimit,
                timeLimit: timeLimit})
        } catch(e) {
             return Api.processError(e)
        }
    },
    getTournament: async function (id) {
        // Type GET
        // Parameters:
        //// id - integer - int64
        try {
            return await Api.get(`Tournament/getOne?id=${id}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    registerBot: async function (tournamentId, botId) {
        // Type POST
        // Parameters:
        //// tournamentId - integer - int64
        //// botId - integer - int64
        try {
            return await Api.post(`Tournament/registerBot?tournamentId=${tournamentId}&botId=${botId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    unregisterBot: async function (tournamentId, botId) {
        // Type DELETE
        // Parameters:
        //// tournamentId - integer - int64
        //// botId - integer - int64
        try {
            return await Api.delete(`Tournament/unregisterBot?tournamentId=${tournamentId}&botId=${botId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    updateTournament: async function (tournamentId, tournamentTitle, description, gameId, playersLimit, tournamentsDate, constraints, image, memoryLimit, timeLimit) {
        // Type PUT
        // Parameters:
        //// id - integer - int64
        // Body:
        //// tournamentId - number
        //// tournamentTitle - string
        //// description - string
        //// gameId - number
        //// playersLimit - number
        //// tournamentsDate - string (e.g. "2024-05-10T13:19:46.277Z")
        //// constraints - string
        //// image - string
        //// memoryLimit - number
        //// timeLimit - number
        try {
            return await Api.put(`Tournament/update`,{
                tournamentId: tournamentId,
                tournamentTitle: tournamentTitle,
                description: description,
                gameId: gameId,
                playersLimit: playersLimit,
                tournamentsDate: tournamentsDate,
                constraints: constraints,
                image: image,
                memoryLimit: memoryLimit,
                timeLimit: timeLimit})
        } catch(e) {
             return Api.processError(e)
        }
    },
}
