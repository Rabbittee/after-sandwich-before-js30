import { getRainCurrentRecord } from "./weather.js";
import { getElementValueByKey, getParameterValueByKey } from "./helpers.js";

export async function Rain() {
    const apiResponse = await getRainCurrentRecord({
        elementName: "HOUR_24",
        parameterName: "CITY,TOWN",
    });
    const { status, data } = apiResponse;

    function getTop20Rain() {
        if (status !== 200) return null;
        // TODO 同名次??
        return data.records.location
            .map(item => {
                return {
                    latLon: {
                        lat: item.lat,
                        lon: item.lon,
                    },
                    location: {
                        city: getParameterValueByKey(item.parameter, "CITY"),
                        town: getParameterValueByKey(item.parameter, "TOWN"),
                        name: item.locationName,
                    },
                    time: item.time && item.time.obsTime,
                    hour_24: getElementValueByKey(item.weatherElement, "HOUR_24"),
                };
            })
            .filter(item => {
                return Number(item.hour_24) >= 0;
            })
            .sort((prev, next) => {
                return Number(next.hour_24) - Number(prev.hour_24);
            })
            .slice(0, 20);
    }

    return {
        status,
        data,
        top20RainLocations: getTop20Rain(),
    };
}
