import { Api } from './Api'
export const PointsService = {

    getLeaderboards: async function (page, pageSize) {
        // Type GET
        // Parameters:
        //// page - integer - int32
        //// pagesize - integer - int32
        try {
            return await Api.get(`Points/getLeaderboards?page=${page}&pageSize=${pageSize}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getPointsForPlayer: async function (id) {
        // Type GET
        // Parameters:
        //// id - integer - int32
        try {
            return await Api.get(`Points/getPointsForPlayer?id=${id}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    getPointsHistoryForPlayer: async function (id) {
        // Type GET
        // Parameters:
        //// id - integer - int32
        try {
            return await Api.get(`Points/getPointsHistoryForPlayer?id=${id}`)
        } catch(e) {
             return Api.processError(e)
        }
    },
}