import { getWeeklyWeatherForecast } from "./weather.js";
import { getTimeByKey, dealAvailableValue } from "./helpers.js";

export async function weeklyForecast() {
    const { data, status } = await getWeeklyWeatherForecast({
        elementName: "MinT,MaxT",
    });

    const locations = data.records.locations[0].location;

    /**
     *  * 最高/低溫
     *  @param {String} location
     *  @param {String} target "highest" or "lowest"
     *  @return {String} 攝氏度
     */
    const getLocationTempExtreme = (location, target = "highest") => {
        if (target !== "highest" && target !== "lowest") throw "second parameter is not validated";
        const targetLocation = locations.find(item => item.locationName === location);
        const elementNames = {
            highest: "MaxT",
            lowest: "MinT",
        };
        const timeTempData = getTimeByKey(targetLocation.weatherElement, elementNames[target]);

        const initValue = target === "highest" ? -Infinity : Infinity;
        const mathMethod = target === "highest" ? "max" : "min";
        return timeTempData.reduce((acc, current) => {
            const currentValue = current.elementValue[0].value;
            return Math[mathMethod](acc, currentValue);
        }, initValue);
    };

    /**
     *  找地區，溫差最大
     *  @param {String} location
     *  @returns {Object}
     */
    const getLocationTempMaxDiff = location => {
        const targetLocation = locations.find(item => item.locationName === location);
        const maxTimeTempData = getTimeByKey(targetLocation.weatherElement, "MaxT");
        const minTimeTempData = getTimeByKey(targetLocation.weatherElement, "MinT");

        return maxTimeTempData
            .map((item, i) => {
                const max = dealAvailableValue(item.elementValue[0].value);
                const min = dealAvailableValue(minTimeTempData[i].elementValue[0].value);
                return {
                    startTime: item.startTime,
                    endTime: item.endTime,
                    temp: {
                        max,
                        min,
                        diff: max !== null && min !== null ? Number(max) - Number(min) : null,
                    },
                };
            })
            .reduce((result, current) => {
                if (Object.keys(result).length === 0) return current;

                const resultDiff = result.temp.diff;
                const currentDiff = current.temp.diff;

                return resultDiff === null || currentDiff > resultDiff ? current : result;
            }, {});
    };

    return {
        locations,
        status,
        getLocationTempExtreme,
        getLocationTempMaxDiff,
    };
}
