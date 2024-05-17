import {Api} from './Api'

export const AdminService = {

  banPlayer: async function (id) {
    return await Api.req(() => {return Api.put(`Administrative/banPlayer?playerId=${id}`)});
  },
  unbanPlayer: async function (id) {
    return await Api.req(() => {return Api.put(`Administrative/unbanPlayer?playerId=${id}`)});
  },
}