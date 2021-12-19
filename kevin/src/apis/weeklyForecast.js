import { weeklyWeatherForecast, allLocations, helpers } from "./weather.js";

export async function weeklyForecast() {
    const { data, status } = await weeklyWeatherForecast({
        elementName: "MinT,MaxT",
    });

    const locations = data.records.locations[0].location;

    const { getTimeByKey, dealAvailableValue } = helpers;

    /**
     *  * 最高/低溫
     *  @param {String} location
     *  @param {String} target "highest" or "lowest"
     *  @return {String} 攝氏度
     */
    const getLocationTempExtreme = (location, target = "highest") => {
        const targetLocation = locations.find(item => item.locationName === location);
        const elementNames = {
            highest: "MaxT",
            lowest: "MinT",
        };
        const timeTempData = getTimeByKey(targetLocation.weatherElement, elementNames[target]);
        return timeTempData.reduce((all, current) => {
            if (all.elementValue === undefined) return current;

            const allValue = all.elementValue[0].value;
            const currentValue = current.elementValue[0].value;

            return allValue > currentValue ? current : all;
        }, {}).elementValue[0].value;
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
        allLocations,
        getLocationTempExtreme,
        getLocationTempMaxDiff,
    };
}
