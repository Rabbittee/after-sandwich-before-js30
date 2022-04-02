export async function fetchApi(id, params) {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore'
    const token = 'CWB-7542F746-7741-4BCD-9D92-02BA8BA53A03'

    const query = new URLSearchParams({
        Authorization: token,
        ...params,
    })

    const response = await fetch(`${cwbHost}/${apiPath}/${id}?${query}`)
    return response.json()
}


export async function getCurrentData(id, params) {
    const response = await fetchApi(id, params)

    for (let key in params) {
        if (key === 'locationName') {
            return response.records.locations[0].location[0]
        } else {
            return response.records.location
        }
    }

}
