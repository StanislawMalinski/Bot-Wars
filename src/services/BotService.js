import { Api } from './Api'
export const BotService = {

    getForPlayer: async function (login) {
        try {
            return await Api.get(`Bot/getForPlayer?playerId=${login}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
}