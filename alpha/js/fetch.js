const cwbHost = "https://opendata.cwb.gov.tw";
const url = "api/v1/rest/datastore/";

export async function getCurrentData(apiPath, paramsObj) {
  const searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${url}${apiPath}?${searchParams.toString()}`
  );

  const data = await response.json();
  return data;
}
