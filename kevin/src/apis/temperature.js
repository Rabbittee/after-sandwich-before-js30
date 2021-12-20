import { weatherCurrentRecord, helpers } from "./weather.js";

const { getElementValueByKey, getParameterValueByKey } = helpers;

export async function Temperature() {
    const { data, status } = await weatherCurrentRecord({
        elementName: "TEMP,ELEV",
    });

    /**
     *  * 調整資料結構
     *  {Array}
     */
    const refactorData = data.records.location.map(item => {
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
    });

    /**
     *  * 最低溫的地區
     *  {Object}
     */
    const lowestLocation = refactorData.reduce((result, currentLocation) => {
        const currentTemp = currentLocation.temperature;

        if (Object.keys(result).length === 0) return currentLocation;
        if (Number(currentTemp) === -99) return result;

        return Number(currentTemp) > Number(result.temperature) ? result : currentLocation;
    }, {});

    /**
     *  * 各海拔最低溫地區
     *  {Object}
     */
    const lowestLocationByElev = refactorData.reduce((all, current) => {
        const tempCurrent = current.temperature;
        const elevCurrent = current.locationElev;
        const level = Math.floor(elevCurrent / 500) * 500;

        if (isNaN(tempCurrent) || isNaN(elevCurrent)) return all;
        if (current.temperature === -99) return all;

        if (all[level] === undefined) {
            all[level] = current;
            return all;
        }

        const tempInAll = all[level].temperature;
        if (tempInAll > tempCurrent) {
            all[level] = current;
        } else if (tempInAll === tempCurrent) {
            // * 同溫度
            all[level].sameTemp =
                all[level].sameTemp === undefined ? [all[level], current] : [...all[level].sameTemp, current];
        }
        return all;
    }, {});

    /**
     *  * 各海拔排列，最低溫的地區
     *  {Array}
     */
    const sortedLowestLocationByElev = Object.entries(lowestLocationByElev)
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
        lowestLocationByElev,
        sortedLowestLocationByElev,
    };
}
