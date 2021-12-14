import { Section } from './section';
import { fetchTemperature } from './useFetch';
import { minBy } from './utils';

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
