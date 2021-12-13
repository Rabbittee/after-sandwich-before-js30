const getCurrentData = async () => {
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPath = "api/v1/rest/datastore/O-A0001-001";
  let paramsObj = {
    Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${apiPath}?${searchParams.toString()}`
  );

  const data = await response.json();
  console.log(data);
  one = Math.min(...data.records.location.map(item => item.weatherElement[3].elementValue));
  answerOne = data.records.location.filter(function(item) {
    return item.weatherElement[3].elementValue === one.toString();
  })[0]
  max = Math.max(...data.records.location.map(item => item.weatherElement[0].elementValue))
  answers[0] = { 
    city: answerOne.parameter[0].parameterValue,
    town: answerOne.parameter[2].parameterValue,
    name: answerOne.locationName,
    temp: one,
    location: {
      lon: answerOne.lon,
      lat: answerOne.lat,
    }
  }
  console.log(one)
  console.log(max)
  console.log(answerOne)
  render()
};

let one = {};
let answerOne = {}
const answers = new Array(4).fill({});
getCurrentData();



// answers[0] = {
//     city: "answerOne",
//     town: "STRING",
//     name: "STRING",
//     temp: 0,
//     location: {
//         lon: 0,
//         lat: 0,
//       },
//     };
    
    
    
    function render(){
      answers.forEach((answer, index) => {
      const answer_node = document.getElementById(`answer_${index + 1}`);
      const showText = JSON.stringify(answer, null, "    ");
      answer_node.rows = showText.split('\n').length;
      answer_node.value = showText;
    })}