import { Api } from './Api'
export const BotService = {
    getBotsForPlayer: async function (id) {
        // Type GET
        // Parameters:
        //// playerId - integer - int64
        try {
            return await Api.get(`Player/getBotsForPlayer?playerId=${id}`)
        } catch(e) {
            return Api.processError(e)
        }
    },
    addBot: async function (GameId, Language, BotFile) {
        // Type POST
        // Paramters:
        //// GameId - integer - int64
        //// Language - integer - int32
        // Body:
        //// BotFile - string - binary
        
        try {
            return await Api.post(`Bot/add?GameId=${GameId}&Language=${Language}`, {
                BotFile: BotFile
            })
        } catch(e) {
             return Api.processError(e)
        }
    },
    deleteBot: async function (botId) {
        // Type DELETE
        // Parameters:
        //// botId - integer - int64
        try {
            return await Api.delete(`Bot/delete?botId=${botId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getBot: async function (botId) {
        // Type GET
        // Parameters:
        //// botId - integer - int64
        try {
            return await Api.get(`Bot/getOne?botId=${botId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getBotsForPlayer: async function (playerId) {
        // Type GET
        // Parameters:
        //// playerId - integer - int64
        try {
            return await Api.get(`Player/getBotsForPlayer?playerId=${playerId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getBotFile: async function (botId, playerId) {
        // Type GET
        // Parameters:
        //// botId - integer - int64
        //// playerId - integer - int64
        try {
            return await Api.get(`Bot/getBotFile?botId=${botId}&playerId=${playerId}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
}