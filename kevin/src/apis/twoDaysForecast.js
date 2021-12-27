import { getTwoDaysForecast } from "./weather.js";
import { getTimeByKey } from "./helpers.js";

export async function twoDaysForecast() {
    const { data, status } = await getTwoDaysForecast({
        elementName: "T",
    });

    const locations = data.records.locations[0].location;

    const refactorTimeData = data => {
        return data
            .map(eachData => {
                return {
                    dataTime: eachData.dataTime,
                    temperature: Number(eachData.elementValue.find(item => item.measures === "攝氏度").value),
                };
            })
            .filter(eachData => !isNaN(eachData.temperature));
    };

    // * Helper functions which only used in this file
    const getTargetLocationData = location => locations.find(item => item.locationName === location);
    const getTimeDataByLocation = location => getTimeByKey(getTargetLocationData(location).weatherElement, "T");

    /**
     *  * 最高/低溫
     */
    const getLocationTempExtreme = (location, target = "highest") => {
        if (target !== "highest" && target !== "lowest") throw "second parameter is not validated";

        const timeData = getTimeDataByLocation(location);

        const initValue = target === "highest" ? -Infinity : Infinity;
        const mathMethod = target === "highest" ? "max" : "min";

        return refactorTimeData(timeData).reduce((acc, current) => {
            return Math[mathMethod](acc, current.temperature);
        }, initValue);
    };

    /**
     *  * 找地區，當日溫差最大
     */
    const getLocationTempMaxDiff = location => {
        const timeData = getTimeDataByLocation(location);

        // split data by time
        const splitDataByDate = refactorTimeData(timeData).reduce((acc, current) => {
            const currentDate = current.dataTime.slice(0, 10);
            acc[currentDate] = [...(acc[currentDate] ?? []), current];
            return acc;
        }, {});

        // get final result
        return Object.values(splitDataByDate).reduce((diff, currentData) => {
            if (currentData.length < 2) return diff;
            if (currentData.length === 2) return Math.abs(currentData[0].temperature - currentData[1].temperature);

            const initValue = {
                max: Math.max(currentData[0].temperature, currentData[1].temperature),
                min: Math.min(currentData[0].temperature, currentData[1].temperature),
            };
            const { max, min } = currentData.slice(2).reduce((acc, current) => {
                if (current.temperature > acc.max) {
                    return {
                        ...acc,
                        max: current.temperature,
                    };
                }
                if (current.temperature < acc.min) {
                    return {
                        ...acc,
                        min: current.temperature,
                    };
                }
                return acc;
            }, initValue);

            return Math.max(diff, Math.abs(max - min));
        }, -Infinity);
    };

    return {
        data,
        status,
        getLocationTempExtreme,
        getLocationTempMaxDiff,
    };
}
