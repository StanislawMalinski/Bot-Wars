import { Api } from './Api'
import { getCurrentTimeRequest } from '../services/ServiceUtils'

const currentTime = getCurrentTimeRequest();

export const GameService = {

    getListOfGames: async function (page, pagesize) {
        // Type GET
        // Parameters:
        //// page - integer - int32
        //// pagesize - integer - int32
        try {
            return await Api.get(`GameType/getAll?page=${page}&pagesize=${pagesize}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    deleteGame: async function (id) {
        // Type DELETE
        // Parameters:
        //// id - integer - int32
        try {
            return await Api.delete(`GameType/delete?id=${id}`);
        } catch(e) {
             return Api.processError(e)
        }
    },
    getAllForPlayer: async function (login) {
        try {
            return await Api.get(`GameType/getAllForPlayer?name=${login}`);
        } catch(e) {
             return Api.processError(e)
        }
    },
    addGameType: async function (numOfPlayers, gameFile, gameInstructions, interfaceDefinition, isAvaiableForPlay) {
        // Type POST
        // Body:
        //// NumberOfPlayer - integer - int32
        //// GameFile - string - binary
        //// GameInstructions - string
        //// InterfaceDefinition - string
        //// Language - integer (typ)
        //// IsAvaiableForPlay - boolean
        try {
            return await Api.post('GameType/add',{
                numbersOfPlayer: numOfPlayers,
                lastModification: currentTime,
                gameFile: gameFile,
                gameInstructions: gameInstructions,
                interfaceDefinition: interfaceDefinition,
                isAvaiableForPlay: isAvaiableForPlay
              })

        } catch(e) {
             return Api.processError(e)
        }
    },
    getAvailableGames: async function (page, pagesize) {
        // Type GET
        // Parameters:
        //// page - integer - int32
        //// pagesize - integer - int32
        try {
            return await Api.get(`GameType/getAvailable?page=${page}&pagesize=${pagesize}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getGame: async function (id) {
        // Type GET
        // Parameters:
        //// id - integer - int32
        try {
            return await Api.get(`GameType/get?id=${id}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getByName: async function (name, page, pagesize) {
        // Type GET
        // Parameters:
        //// name - string
        //// page - integer - int32
        //// pagesize - integer - int32
        try {
            return await Api.get(`GameType/getByName?name=${name}&page=${page}&pagesize=${pagesize}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getAllForPlayer: async function (name) {
        // Type GET
        // Parameters:
        //// name - string
        try {
            return await Api.get(`GameType/getAllForPlayer?name=${name}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    updateGameType: async function (numOfPlayers, gameFile, gameInstructions, interfaceDefinition, isAvaiableForPlay) {
        // Type PUT
        // Parameters:
        //// id - integer - int32
        // Body:
        //// NumberOfPlayer - integer - int32
        //// GameFile - string - binary
        //// GameInstructions - string
        //// InterfaceDefinition - string
        //// Language - integer (typ)
        //// IsAvaiableForPlay - boolean
        try {
            return await Api.put('GameType/update',{
                numbersOfPlayer: numOfPlayers,
                lastModification: currentTime,
                gameFile: gameFile,
                gameInstructions: gameInstructions,
                interfaceDefinition: interfaceDefinition,
                isAvaiableForPlay: isAvaiableForPlay
              })

        } catch(e) {
             return Api.processError(e)
        }
    },
}