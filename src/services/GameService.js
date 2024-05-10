import {Api} from './Api'

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

export const GameService = {

  getListOfGames: async function (page, pagesize) {
    return await Api.req(() => {return Api.get(`GameType/getAll?page=${page}&pagesize=${pagesize}`)})
  },
  deleteGame: async function (id) {
    return await Api.req(() => {return Api.delete(`GameType/delete?id=${id}`)});
  },
  getAllForPlayer: async function (login) {
    return await Api.req(() => {return Api.get(`GameType/getAllForPlayer?name=${login}`)});
  },
  addGameType: async function (numOfPlayers, gameFile, gameInstructions, interfaceDefinition, isAvaiableForPlay) {
    return await Api.req(() => {return Api.post('GameType/add', {
      numbersOfPlayer: numOfPlayers,
      lastModification: currentTime,
      gameFile: gameFile,
      gameInstructions: gameInstructions,
      interfaceDefinition: interfaceDefinition,
      isAvaiableForPlay: isAvaiableForPlay
    })})
  },
  getAvailableGames: async function (page, pagesize) {
    return await Api.req(() => {return Api.get(`GameType/getAvailable?page=${page}&pagesize=${pagesize}`)})
  },
  getGame: async function (id) {
    return await Api.req(() => {return Api.get(`GameType/get?id=${id}`)})
  },
  getByName: async function (name, page, pagesize) {
    return await Api.req(() => {return Api.get(`GameType/getByName?name=${name}&page=${page}&pagesize=${pagesize}`)})
  },
  updateGameType: async function (numOfPlayers, gameFile, gameInstructions, interfaceDefinition, isAvaiableForPlay) {
    return await Api.req(() => {return Api.put('GameType/update', {
      numbersOfPlayer: numOfPlayers,
      lastModification: currentTime,
      gameFile: gameFile,
      gameInstructions: gameInstructions,
      interfaceDefinition: interfaceDefinition,
      isAvaiableForPlay: isAvaiableForPlay
    })})
  },
}