const answer01 = function(data) {
  let locationArr = data.records.location;
  let lowestTempData = {};
  let lowestTemp = '';
  locationArr.forEach((item) => {
    if ( lowestTemp === '' && lowestTemp !== '-99') {
      lowestTemp = item.weatherElement[3].elementValue
    }
    if (lowestTemp > item.weatherElement[3].elementValue && lowestTemp !== '-99') {
      lowestTemp = item.weatherElement[3].elementValue
      lowestTempData = {
        city: item.parameter[0].parameterValue,
        town: item.parameter[2].parameterValue,
        name: item.locationName,
        temp: item.weatherElement[3].elementValue,
        location: {
          lon: item.lon,
          lat: item.lat
        }
      }
    }
  })
  console.log('answer01: ', lowestTempData);
}

export default answer01