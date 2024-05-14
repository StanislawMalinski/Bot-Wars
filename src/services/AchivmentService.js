import {Api} from './Api'

import icon1 from '../resources/icon1.svg';
import icon2 from '../resources/icon2.svg';
import icon3 from '../resources/icon3.svg';
import icon4 from '../resources/icon1.svg';
import icon5 from '../resources/icon2.svg';
import icon6 from '../resources/icon3.svg';
import icon7 from '../resources/skull.svg';

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
      return icon1;
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