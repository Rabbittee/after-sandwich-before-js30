export async function fetchData(apiPath, params) {
  const paramsObj = {
    Authorization: `${import.meta.env.VITE_API_TOKEN}`,
    ...params,
  };
  const searchParams = new URLSearchParams(paramsObj);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/${apiPath}?${searchParams}`
  );
  const data = await res.json();
  return data;
}
