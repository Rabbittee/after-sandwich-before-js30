import { rainCurrentRecord, helpers } from "./weather.js";

const { getElementValueByKey, getParameterValueByKey } = helpers;

export class Rain {
    constructor() {
        return (async () => {
            this.apiResponse = await rainCurrentRecord({
                elementName: "HOUR_24",
                parameterName: "CITY,TOWN",
            });
            this.status = this.apiResponse.status;
            this.data = this.apiResponse.data;

            return this;
        })();
    }

    get top20_rain() {
        if (this.status !== 200) return null;
        // TODO 同名次??
        const _top20_rain = this.data.records.location
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
        return _top20_rain;
    }
}
