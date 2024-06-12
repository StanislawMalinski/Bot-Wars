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
      return icon1;
    case 2:
      return icon2;
    case 3:
      return icon3;
    case 4:
      return icon4;
    case 5:
      return icon5;
    case 6:
      return icon6;
    case 7:
      return icon7;
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