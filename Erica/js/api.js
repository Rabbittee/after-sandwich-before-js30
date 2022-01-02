export async function fetchApi(id, params) {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore'
<<<<<<< HEAD
    const token = 'CWB-7542F746-7741-4BCD-9D92-02BA8BA53A03'

    const query = new URLSearchParams({
        Authorization: token,
=======
    const toke = 'CWB-7542F746-7741-4BCD-9D92-02BA8BA53A03'

    const query = new URLSearchParams({
        Authorization: toke,
>>>>>>> d8fbb11edcb02ece41884d8222adf12649b3009d
        ...params,
    })

    const response = await fetch(`${cwbHost}/${apiPath}/${id}?${query}`)
    return response.json()
}


<<<<<<< HEAD
export async function getCurrentData(id, params) {
    const response = await fetchApi(id, params)

    for (let key in params) {
        if (key === 'locationName') {
            return response.records.locations[0].location[0]
        } else {
            return response.records.location
        }
    }

=======
export async function getCurrentData(id, ...params) {
    const response = await fetchApi(id, params[0])
    return response.records.location
>>>>>>> d8fbb11edcb02ece41884d8222adf12649b3009d
}
