import { Api } from './Api'
export const PointsService = {

    getLeaderboards: async function () {
        try {
            return await Api.get('Points/getLeaderboards')
        } catch(e) {
             return Api.processError(e)
        }
    },
}