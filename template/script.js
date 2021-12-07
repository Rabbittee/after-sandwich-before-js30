const answer_1_ele = document.getElementById("answer_1");
let answer_1 = {
  city: "STRING",
  town: "STRING",
  name: "STRING",
  temp: 0,
  location: {
    lon: 0,
    lat: 0,
  },
};
answer_1_ele.value = JSON.stringify(answer_1, null, "    ");

const getCurrentData = async () => {
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPath = "api/v1/rest/datastore/O-A0001-001";
  let paramsObj = {
    Authorization: "<YOUR_API_TOKEN>",
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${apiPath}?${searchParams.toString()}`
  );

  const data = await response.json();
  console.log(data);
};

getCurrentData();
