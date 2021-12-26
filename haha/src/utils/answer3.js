export default function (data) {
    const sort = data.sort(
        (a, b) =>
            b.weatherElement[0].elementValue - a.weatherElement[0].elementValue
    )
    const result = sort.slice(0, 20)
    let obj = []
    result.forEach((el) => {
        const city = el.parameter[0].parameterValue
        const town = el.parameter[2].parameterValue
        const elName = el.locationName
        const elVal = el.weatherElement[0].elementValue
        const cityIdx = obj.findIndex((el) => el.city === city)
        if (cityIdx === -1)
            obj.push({ city, town: [{ town, location: [{ elName, elVal }] }] })
        else {
            const townIdx = obj[cityIdx].town.findIndex(
                (el) => el.town === town
            )
            if (townIdx === -1)
                obj[cityIdx].town.push({ town, location: [{ elName, elVal }] })
            else obj[cityIdx].town[townIdx].location.push({ elName, elVal })
        }
    })
    return Object.assign({}, obj)
}
