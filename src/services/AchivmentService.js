import {Api} from './Api'

import tour1 from '../resources/achivements/tour1.png';
import tour3 from '../resources/achivements/tour3.png';
import tour5 from '../resources/achivements/tour5.png';
import contestant1 from '../resources/achivements/contestant1.png';
import contestant5 from '../resources/achivements/contestant5.png';
import contestant10 from '../resources/achivements/contestant10.png';
import notImplemented from '../resources/skull.svg';

const getIcon = function (typeOfAchivment) {
  switch (typeOfAchivment) {
    case 1:
      return tour1;
    case 2:
      return tour3;
    case 3:
      return tour5;
    case 4:
      return contestant1;
    case 5:
      return contestant5;
    case 6:
      return contestant10;
    case 7:
      return contestant10;
    default:
      return notImplemented;
  }
}

export const AchivmentService = {
  getAchivmentsForPlayer: async function (id) {
    return await Api.req(() => {return Api.get(`Achievement/getAchievementsForPlayer?playerId=${id}`)});
  },
  getAchivmentsTypes: async function () {
    return await Api.req(() => {return Api.get(`Achievement/getAchievementTypes`)});
  },
  getIcon,
  
}