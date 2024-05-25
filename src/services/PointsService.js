import {Api} from './Api'

export const PointsService = {

  getLeaderboards: async function (page, pageSize) {
    return await Api.req(() => {return Api.get(`Points/getLeaderboards?page=${page}&pageSize=${pageSize}`)})
  },
  getPointsForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Points/getPointsForPlayer?id=${id}`)})
  },
  getPointsHistoryForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Points/getPointsHistoryForPlayer?playerId=${id}`)})
  },
}