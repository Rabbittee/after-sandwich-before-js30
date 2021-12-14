import { Section } from './section.js';
import { fetchRainfall } from './useFetch.js';

const title = `題目三:
近24小時降雨量前20名是哪些？
分別統計整理列在哪些縣市？`;

const section = Section(title, async () => {
  const res = await fetchRainfall();
  const filtered = res.sort((a, b) => b.rainfall - a.rainfall).slice(0, 20);

  return filtered.reduce((acc, cur) => {
    const { locationName, stationId, city, town, rainfall } = cur;
    if (!acc[city]) acc[city] = {};
    if (!acc[city][town]) acc[city][town] = {};
    acc[city][town][`${locationName}_${stationId}`] = rainfall;
    return acc;
  }, {});
});

export default section;
