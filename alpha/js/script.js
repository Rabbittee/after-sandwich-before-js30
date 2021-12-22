const cwbHost = 'https://opendata.cwb.gov.tw';
// const apiPath = 'api/v1/rest/datastore/O-A0001-001';
const paramsObj = {
  Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
};
export const errorCode = '-99';

export async function getCurrentData(apiPath) {
  const searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(`${cwbHost}/${apiPath}?${searchParams.toString()}`);

  const data = await response.json();
  return data;
};

export function render(answers) {
  answers.forEach((answer, index) => {
    const answer_node = document.getElementById(`answer_${index + 1}`);
    const showText = JSON.stringify(answer, null, '    ');
    answer_node.rows = showText.split('\n').length;
    answer_node.value = showText;
  });
}
