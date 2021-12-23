import { getTwoDaysForecast } from "./weather.js";
import { getTimeByKey } from "./helpers.js";

export async function twoDaysForecast() {
    const { data, status } = await getTwoDaysForecast({
        elementName: "T",
    });

    const locations = data.records.locations[0].location;

    /**
     *  * 最高/低溫
     */
    const getLocationTempExtreme = (location, target = "highest") => {
        if (target !== "highest" && target !== "lowest") throw "second parameter is not validated";

        const targetLocationData = locations.find(item => item.locationName === location);
        const timeData = getTimeByKey(targetLocationData.weatherElement, "T");

        // const initValue = target === "highest" ? -Infinity : Infinity;
        // const mathMethod = target === "highest" ? "max" : "min";

        return timeData;
    };

    console.log(getLocationTempExtreme("新北市"));
    /**
     *  * 找地區，溫差最大
     */
    const getLocationTempMaxDiff = () => {};

    return {
        data,
        status,
        getLocationTempExtreme,
        getLocationTempMaxDiff,
    };
}
