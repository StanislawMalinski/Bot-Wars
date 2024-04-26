import {jwtDecode} from 'jwt-decode'
import { Api } from './Api'
import {login} from "../User/store";
import store from '../User/store'
export const UserService = {

    registerUser: async function (username, email, password, roleId) {
        try {
            return await Api.post('Player/register', {
                email: email,
                login: username,
                password: password,
                roleId: roleId,
                isBanned: false,
                points: 0
            })
        } catch(e) {
             return Api.processError(e)
        }
    },
    loginUser: async function (email, password) {
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
    }
}