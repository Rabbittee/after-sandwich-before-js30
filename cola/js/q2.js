import { Section } from './section';
import { fetchTemperature } from './useFetch';

const title = '題目二: 同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object';

const section = Section(title, async () => {
  const res = await fetchTemperature();

  const temps = res.reduce((acc, cur) => {
    const { locationName: name, temp, city, town, elev } = cur;
    const meter = (Math.floor(elev / 500) + 1) * 500;
    const { [meter]: altitude } = acc;
    const next = altitude?.temp < temp ? altitude : { name, temp, city, town, elev };

    return {
      ...acc,
      [meter]: next,
    };
  }, {});

  return temps;
});

export default section;
