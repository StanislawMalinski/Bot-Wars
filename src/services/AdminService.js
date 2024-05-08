import { Api } from './Api'
export const AdminService = {

    banPlayer: async function (id) {
        try {
            return await Api.put(`Administrative/banPlayer?playerId=${id}`);
        } catch(e) {
             return Api.processError(e)
        }
    },
    unbanPlayer: async function (id) {
        try {
            return await Api.put(`Administrative/unbanPlayer?playerId=${id}`);
        } catch(e) {
             return Api.processError(e)
        }
    },
}