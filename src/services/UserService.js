import {jwtDecode} from 'jwt-decode'
import {Api} from './Api'
import {login} from "../User/store";
import store from '../User/store'

export const UserService = {

  registerUser: async function (username, email, password, roleId) {
    return await Api.req(() => {return Api.post('Player/registerPlayer', {
      email: email,
      login: username,
      password: password,
    })})
  },
  registerAdmin: async function (username, email, password, roleId) {
    return await Api.req(() => {return Api.post('Player/registerAdmin', {
      email: email,
      login: username,
      password: password,
    })})
  },
  loginUser: async function (email, password) {
    const response = await Api.req(() => {return Api.post('Player/login', {
      email: email,
      password: password,
    })})
    const token = response.data.data
    const jwtData = jwtDecode(token)
    store.dispatch(login({
      email: email,
      token: token,
      role: jwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      id: jwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    }))
  },
  getPlayerInfo: async function (idOrName) {
    if (Number.isInteger(parseInt(idOrName))) {
      return await Api.req(() => {return Api.get(`Player/getPlayerInfo?playerId=${idOrName}`)})
    } else if (typeof idOrName === 'string') {
      return await Api.req(() => {return Api.get(`Player/getPlayerInfoByName?playerName=${idOrName}`)})
    }
  },
  changePassword: async function (oldPassword, newPassword) {
    return await Api.req(() => {return Api.post('Player/changePassword', {
      password: oldPassword,
      changePassword: newPassword,
    })})
  },
  changeLogin: async function (login, newLogin) {
    return await Api.req(() => {return Api.post('Player/changeLogin', {
      login: login,
      newLogin: newLogin,
    })})
  },
  getGamesForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Player/getGamesForPlayer?playerId=${id}`)})
  },
  getImageForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Player/getImageForPlayer?playerId=${id}`)})
  },
  changeMyImage: async function (image) {
    return await Api.req(() => {return Api.post('Player/changeMyImage', {
      image: image,
    })})
  },
  deleteAccount: async function (password) {
    return await Api.req(() => {return Api.delete(`Player/deleteAccount`)})
  },
  getBotsForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Player/getBotsForPlayer?playerId=${id}`)})
  },
}