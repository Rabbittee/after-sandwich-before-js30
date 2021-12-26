export async function fetchApi() {
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPath = "api/v1/rest/datastore/O-A0001-001";
  const paramsObj = {
    Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  };
  const searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${apiPath}?${searchParams.toString()}`
  );

  return response.json();
}

export async function getResponseData() {
  const response = await fetchApi();
  return response.records.location;
}
