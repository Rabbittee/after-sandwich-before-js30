import { getCurrentData, token } from '../fetch.js';
import { getElementValue, getParameterValue } from '../utils.js';
import { temp, city, town, elev } from '../global.js';

const apiPath = 'O-A0001-001';
const { Authorization } = token;
const paramsObj = {
  Authorization: Authorization,
  parameterName: [city, town],
  elementName: [elev, temp],
};
export const answer2 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);

  const locationData = data.records.location;
  
  const answer = locationData.reduce((acc, cur) => {
    
    const { locationName: name, parameter, weatherElement  } = cur;
    const tempValue = getElementValue(weatherElement, temp);
    const altitude = getElementValue(weatherElement, elev);
    const cityName = getParameterValue(parameter, city);
    const townName = getParameterValue(parameter, town);

    //find pre 500m altitude;
    const step = (Math.floor(altitude / 500) + 1) * 500;
    //get pre 500m array;
    const { [step]: tempObj  } = acc;

    //find next if temp is current value;
    const next = tempObj?.temp < tempValue ? tempObj : {縣市: cityName, 行政區: townName,測站名稱: name, 海拔: altitude,};
    
    return {
      ...acc,
      [step]: next,
    };
    
  }, {});

  return answer
};
