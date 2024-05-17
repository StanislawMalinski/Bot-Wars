import {Api} from './Api'

export const BotService = {
  getBotsForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Player/getBotsForPlayer?playerId=${id}`)})
  },
  addBot: async function (GameId, Language, BotFile) {
    return await Api.req(() => {return Api.post(`Bot/add?GameId=${GameId}&Language=${Language}`, {
      BotFile: BotFile
    })})
  },
  deleteBot: async function (botId) {
    return await Api.req(() => {return Api.delete(`Bot/delete?botId=${botId}`)})
  },
  getBot: async function (botId) {
    return await Api.req(() => {return Api.get(`Bot/getOne?botId=${botId}`)})
  },
  getBotFile: async function (botId, playerId) {
    return await Api.req(() => {return Api.get(`Bot/getBotFile?botId=${botId}&playerId=${playerId}`)})
  },
}