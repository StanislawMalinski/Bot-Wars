import { Api } from './Api'

const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

const currentTime = getCurrentTime();

export const TournamentService = {

    getListOfTournaments: async function () {
        try {
            return await Api.get('Tournament/getAll')
        } catch(e) {
             return Api.processError(e)
        }
    },
    deleteTournament: async function (id) {
        try {
            return await Api.delete(`Tournament/delete?id=${id}`);
        } catch(e) {
             return Api.processError(e)
        }
    },
    addTournament: async function (numOfPlayers, gameFile, gameInstructions, interfaceDefinition, isAvaiableForPlay) {
        try {
            return await Api.post('Tournament/add',{
                numbersOfPlayer: numOfPlayers,
                lastModification: currentTime,
                gameFile: gameFile,
                gameInstructions: gameInstructions,
                interfaceDefinition: interfaceDefinition,
                isAvaiableForPlay: isAvaiableForPlay
              })

        } catch(e) {
             return Api.processError(e)
        }
    },
}