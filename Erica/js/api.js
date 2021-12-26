export async function fetchApi(id, ...params) {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore'
    const token = new URLSearchParams({
        Authorization: 'CWB-7542F746-7741-4BCD-9D92-02BA8BA53A03'
    })
    const value = params.map((item) => item.split(' ')).join('&')
    const response = await fetch(`${cwbHost}/${apiPath}/${id}?${token.toString()}&${value}`)
    return response.json()
}


export async function getCurrentData(id) {
    const response = await fetchApi(id)
    return response.records.location
}
