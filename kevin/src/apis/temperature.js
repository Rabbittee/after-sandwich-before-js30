import { getWeatherCurrentRecord } from "./weather.js";
import { getElementValueByKey, getParameterValueByKey, unAvailableValue } from "./helpers.js";

export async function Temperature() {
    const { data, status } = await getWeatherCurrentRecord({
        elementName: "TEMP,ELEV",
        parameterName: "CITY,TOWN",
    });

    /**
     *  * 調整資料結構
     *  {Array}
     */
    const refactorData = data.records.location
        .map(item => {
            const temp = Number(getElementValueByKey(item.weatherElement, "TEMP"));
            const elev = Number(getElementValueByKey(item.weatherElement, "ELEV"));
            return {
                latLon: {
                    lat: item.lat,
                    lon: item.lon,
                },
                location: {
                    name: item.locationName,
                    city: getParameterValueByKey(item.parameter, "CITY"),
                    town: getParameterValueByKey(item.parameter, "TOWN"),
                },
                time: item.time && item.time.obsTime,
                temperature: temp,
                locationElev: elev,
            };
        })
        .filter(
            item =>
                item.temperature !== unAvailableValue &&
                item.locationElev !== unAvailableValue &&
                typeof item.temperature === "number" &&
                typeof item.locationElev === "number"
        );

    /**
     *  * 最低溫的地區
     *  {Object}
     */
    const lowestLocation = refactorData.reduce((result, currentLocation) => {
        const currentTemp = currentLocation.temperature;

        if (Object.keys(result).length === 0) return currentLocation;

        return currentTemp > result.temperature ? result : currentLocation;
    }, {});

    /**
     *  * 各海拔最低溫地區
     *  {Object}
     */
    const lowestLocationByElevation = refactorData.reduce((all, current) => {
        const tempCurrent = current.temperature;
        const elevCurrent = current.locationElev;
        const level = Math.floor(elevCurrent / 500) * 500;

        if (all[level] === undefined) {
            all[level] = current;
            return all;
        }

        const tempInAll = all[level].temperature;
        if (tempInAll > tempCurrent) {
            all[level] = current;
        } else if (tempInAll === tempCurrent) {
            // * 同溫度
            const existSameTempArray = all[level].sameTemp || [all[level]];
            all[level] = {
                ...all[level],
                sameTemp: [...existSameTempArray, current],
            };
        }
        return all;
    }, {});

    /**
     *  * 各海拔排列，最低溫的地區
     *  {Array}
     */
    const sortedLowestLocationByElevation = Object.entries(lowestLocationByElevation)
        .map(([elev, item]) => {
            return { ...item, elev };
        })
        .sort((prev, next) => {
            return prev.elev - next.elev;
        });

    return {
        data,
        status,
        lowestLocation,
        lowestLocationByElevation,
        sortedLowestLocationByElevation,
    };
}
