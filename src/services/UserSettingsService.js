import {Api} from './Api'

export const UserSettings = {
  getUserSettings: async function () {
    return await Api.req(() => {return Api.get(`UserSettings/get`)})
  },
  updateUserSettings: async function (isDarkTheme, language) {
    return await Api.req(() => {return Api.put(`UserSettings/update`, {
      isDarkTheme: isDarkTheme,
      language: language
    })})
  },
};