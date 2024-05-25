import {Api} from './Api'

export const TournamentService = {
  getFilteredTournaments: async function (page, pageSize, body) {
    const {tournamentTitle, minPlayOutDate, maxPlayOutDate, creator, userParticipation} = body;
    return await Api.req(() => {return Api.post(`Tournament/getFiltered?page=${page}&pageSize=${pageSize}`, body)})
  },
  getListOfTournaments: async function (page, pageSize) {
    return await Api.req(() => {return Api.post(`Tournament/getFiltered?page=${page}&pageSize=${pageSize}`, {})})
  },
  deleteTournament: async function (id) {
    return await Api.req(() => {return Api.delete(`Tournament/delete?id=${id}`)})
  },
  addTournament: async function (tournamentTitle, description, gameId, playersLimit, tournamentsDate, constraints, image, memoryLimit, timeLimit) {
    return await Api.req(() => {return Api.post(`Tournament/add`, {
      tournamentTitle: tournamentTitle,
      description: description,
      gameId: gameId,
      playersLimit: playersLimit,
      tournamentsDate: tournamentsDate,
      constraints: constraints,
      image: image,
      memoryLimit: memoryLimit,
      timeLimit: timeLimit
    })})
  },
  getTournament: async function (id) {
    return await Api.req(() => {return Api.get(`Tournament/getOne?id=${id}`)})
  },
  registerBot: async function (tournamentId, botId) {
    return await Api.req(() => {return Api.post(`Tournament/registerBot?tournamentId=${tournamentId}&botId=${botId}`)})
  },
  unregisterBot: async function (tournamentId, botId) {
    return await Api.req(() => {return Api.delete(`Tournament/unregisterBot?tournamentId=${tournamentId}&botId=${botId}`)})
  },
  updateTournament: async function (tournamentId, tournamentTitle, description, gameId, playersLimit, tournamentsDate, constraints, image, memoryLimit, timeLimit) {
    return await Api.req(() => {return Api.put(`Tournament/update`, {
      tournamentId: tournamentId,
      tournamentTitle: tournamentTitle,
      description: description,
      gameId: gameId,
      playersLimit: playersLimit,
      tournamentsDate: tournamentsDate,
      constraints: constraints,
      image: image,
      memoryLimit: memoryLimit,
      timeLimit: timeLimit
    })})
  },
}
