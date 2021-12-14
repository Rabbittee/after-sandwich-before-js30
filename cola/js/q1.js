import { Section } from './section.js';
import { fetchTemperature } from './useFetch.js';
import { minBy } from './utils.js';

const title = '題目一: 找到全台當下最低溫的點，並列出 縣市 行政區 測站名稱 溫度 座標';

const section = Section(title, async () => {
  const res = await fetchTemperature();

  const { locationName: name, lat, lon, temp, city, town } = minBy(res, ({ temp }) => temp);

  return {
    city,
    town,
    name,
    temp,
    location: { lon, lat },
  };
});

export default section;
