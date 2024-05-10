import { Api } from './Api'

export const UserSettings = {
    getUserSettings: async function () {
        // Type GET
        try {
            return await Api.get(`UserSettings/get`)
        } catch(e) {
             return Api.processError(e)
        }
    },
    updateUserSettings: async function (isDarkTheme, language) {
        // Type PUT
        // Body:
        //// isDarkTheme - boolean
        //// language - string
        try {
            return await Api.put(`UserSettings/update`, {
                isDarkTheme: isDarkTheme,
                language: language
            })
        } catch(e) {
             return Api.processError(e)
        }
    },
};