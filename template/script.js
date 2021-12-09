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
};

getCurrentData();

const answers = new Array(4).fill({});
answers[0] = {
  city: "STRING",
  town: "STRING",
  name: "STRING",
  temp: 0,
  location: {
    lon: 0,
    lat: 0,
  },
};

answers.forEach((answer, index) => {
  const answer_node = document.getElementById(`answer_${index + 1}`);
  const showText = JSON.stringify(answer, null, "    ");
  answer_node.rows = showText.split('\n').length;
  answer_node.value = showText;
})