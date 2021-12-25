import { Section } from './section.js';
import { fetchForecast } from './useFetch.js';
import { minBy, maxBy } from './utils.js';

const rayDistrict = '中山區';
const maxT = 'MaxT';
const minT = 'MinT';

const title = `題目四:
台北市 ${rayDistrict} 未來一週的最低溫與最高溫分別為多少？
且單日溫差最大為多少？`;

const section = Section(title, async () => {
  const res = await fetchForecast();
  const { weatherElement: rayArea } = res.find(({ locationName }) => locationName === rayDistrict);
  const { minByDay, maxByDay, minimum, maximum } = rayArea.reduce(
    ({ minByDay, maxByDay, minimum, maximum }, { elementName, time }) => {
      if (elementName === maxT) {
        // 最高溫
        // normalize data by day
        time.forEach((data) => forEachFn(data, Math.max, maxByDay, -Infinity));

        // find the maximum
        mutate(minimum, time, maxBy);
      } else if (elementName === minT) {
        // 最低溫
        // normalize data by day
        time.forEach((data) => forEachFn(data, Math.min, minByDay, Infinity));

        // find the minimum
        mutate(maximum, time, minBy);
      }
      return { minByDay, maxByDay, minimum, maximum };
    },
    { minByDay: {}, maxByDay: {}, minimum: {}, maximum: {} },
  );

  const maxDiff = Object.keys(minByDay).reduce(
    (acc, day) => {
      const maxDiff = Math.max(maxByDay[day] - minByDay[day], acc.maxDiff);
      return maxDiff === acc.maxDiff ? acc : { date: day, maxDiff };
    },
    { date: '', maxDiff: -Infinity },
  );

  return { 最低溫: minimum, 最高溫: maximum, 單日最大溫差: maxDiff };
});

export default section;

function forEachFn(data, fn, byDay, defaultValue) {
  const {
    startTime,
    elementValue: [{ value }],
  } = data;
  const day = startTime.split(' ')[0];
  byDay[day] = fn(byDay[day] || defaultValue, value);
}

function mutate(data, time, fn) {
  const result = fn(time, ({ elementValue: [{ value }] }) => value);
  data.date = result.startTime.split(' ')[0];
  data.value = Number(result.elementValue[0].value);
}
