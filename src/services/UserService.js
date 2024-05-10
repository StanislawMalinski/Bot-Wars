import {jwtDecode} from 'jwt-decode'
import { Api } from './Api'
import {login} from "../User/store";
import store from '../User/store'
export const UserService = {

    registerUser: async function (username, email, password, roleId) {
        // Type POST
        // Body:
        //// email - string
        //// login - string
        //// password - string
        try {
            return await Api.post('Player/registerPlayer', {
                email: email,
                login: username,
                password: password,
            })
        } catch(e) {
             return Api.processError(e)
        }
    },
    registerAdmin: async function (username, email, password, roleId) {
        // Type POST
        // Body:
        //// email - string
        //// login - string
        //// password - string
        try {
            return await Api.post('Player/registerAdmin', {
                email: email,
                login: username,
                password: password,
            })
        } catch(e) {
             return Api.processError(e)
        }
    },
    loginUser: async function (email, password) {
        // Type POST
        // Body:
        //// email - string
        //// password - string
        try {
            const response = await Api.post('Player/login', {
                email: email,
                password: password,
            })
            const token = response.data.data
            const jwtData = jwtDecode(token)
            store.dispatch(login({
                email: email,
                token: token,
                role: jwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            }))
        } catch(e) {
             return Api.processError(e)
        }
    },
    getPlayerInfo: async function (idOrName) {

        // Type GET
        // Parameters:
        //// idOrName - integer - int64
        ////          - string
        try {
            if (Number.isInteger(parseInt(idOrName))) {
                return await Api.get(`Player/getPlayerInfo?playerId=${idOrName}`)
            } else if (typeof idOrName === 'string') {
                return await Api.get(`Player/GetPlayerInfoByName?playerName=${idOrName}`)
            }
        } catch(e) {
            return Api.processError(e)
        }
    },
    changePassword: async function (oldPassword, newPassword) {
        // Type POST
        // Body:
        //// password - string
        //// changePassword - string

        try {
            return await Api.post('Player/changePassword', {
                password: oldPassword,
                changePassword: newPassword,
            })
        } catch(e) {
            return Api.processError(e)
        }
    },
    changeLogin: async function (login, newLogin) {
        // Type POST
        // Body:
        //// login - string
        //// newLogin - string
        try {
            return await Api.post('Player/changeLogin', {
                login: login,
                newLogin: newLogin,
            })
        } catch(e) {
            return Api.processError(e)
        }
    },
    getGamesForPlayer: async function (id) {
        // Type GET
        // Parameters:
        //// id - integer - int64
        try {
            return await Api.get(`Player/getGamesForPlayer?id=${id}`)
        } catch(e) {
            return Api.processError(e)
        }
    },
    getImageForPlayer: async function (id) {
        // Type GET
        // Parameters:
        //// playerId - integer - int64
        try {
            return await Api.get(`Player/getImageForPlayer?playerId=${id}`)
        } catch(e) {
            return Api.processError(e)
        }
    },
    changeMyImage: async function (image) {
        // Type POST
        // Body:
        //// image - string
        try {
            return await Api.post('Player/changeMyImage', {
                image: image,
            })
        } catch(e) {
            return Api.processError(e)
        }
    },
    deleteAccount: async function (password) {
        // Type DELETE
        // Parameters:
        //// password - string
        try {
            return await Api.delete(`Player/deleteAccount`)
        } catch(e) {
            return Api.processError(e)
        }
    },
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
}