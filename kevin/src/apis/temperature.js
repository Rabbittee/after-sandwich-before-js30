import { weatherCurrentRecord, helpers } from "./weather.js";

const { getElementValueByKey, getParameterValueByKey } = helpers;

export async function Temperature() {
    const { data, status } = await weatherCurrentRecord({
        elementName: "TEMP,ELEV",
    });

    const lowestLocation = data.records.location.reduce((result, currentLocation) => {
        const currentTemp = getElementValueByKey(currentLocation.weatherElement, "TEMP");

        currentLocation = {
            latLon: {
                lat: currentLocation.lat,
                lon: currentLocation.lon,
            },
            location: {
                name: currentLocation.locationName,
                city: getParameterValueByKey(currentLocation.parameter, "CITY"),
                town: getParameterValueByKey(currentLocation.parameter, "TOWN"),
            },
            time: currentLocation.time && currentLocation.time.obsTime,
            temperature: currentTemp,
        };

        if (Object.keys(result).length === 0) return currentLocation;

        if (currentTemp === undefined || Number(currentTemp) === -99) {
            return result;
        } else {
            return Number(currentTemp) > Number(result.temperature) ? result : currentLocation;
        }
    }, {});

    // TODO 依照海拔排列
    // const lowestLocationByElev = null

    return {
        data,
        status,
        lowestLocation,
    };
}
