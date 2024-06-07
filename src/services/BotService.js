import {Api} from './Api'

export const BotService = {
  getBotsForPlayer: async function (username, pageSize, pageNum) {
    return await Api.req(() => {return Api.get(`Bot/getForPlayer?playerName=${username}&PageNumber=${pageNum}&PageSize=${pageSize}`)})
  },
  addBot: async function (GameId, Language, body) {
    console.log(body)
    return await Api.req(() => {return Api.post(`Bot/add?GameId=${GameId}&Language=${Language}`, body)})
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