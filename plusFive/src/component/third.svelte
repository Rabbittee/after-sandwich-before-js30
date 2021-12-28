<script>
  import { onMount } from 'svelte'

  let data
  let location
  let sortedLocation = []
  // let HOUR_24_Map = new Map()
  // let HOUR_24

  onMount(async () => {
    await getCurrentData()
  })

  async function getCurrentData() {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore/O-A0002-001'
    let paramsObj = {
      Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
      elementName:'HOUR_24',
      parameterName:'CITY'
    }
    let searchParams = new URLSearchParams(paramsObj)
    const response = await fetch(
      `${cwbHost}/${apiPath}?${searchParams.toString()}`
    )

    if (response.statusText === 'OK') {
      data = await response.json()
      location = data.records.location
      // console.log(location)
      sortedLocation = location.filter(function(item, i) {
        return Number(item.weatherElement[0].elementValue) > 0 
        })
        .map(function(item,i) {
          return [item.parameter[0].parameterValue, Number(item.weatherElement[0].elementValue)]
        })
        .sort(compare).slice(-20)
      
      // HOUR_24_Map.set(Number(item.weatherElement[0].elementValue), item.parameter[0].parameterValue)
      sortedLocation = sortedLocation
      console.log(sortedLocation)
    }
  }

  function compare(a, b) {
    if (a[1] > b[1]) return 1
    if (b[1] > a[1]) return -1

    return 0
  }
</script>

<h6 class="mb-3">第三題：</h6>
<div class="flex flex-wrap justify-center">
  {#each sortedLocation as location}
    <div class="p-1 border border-gray-200 w-32">
      <div>
        縣市：{location[0]}
      </div>
      <div>
        累積雨量：{location[1]}
      </div>
    </div>
  {/each}
</div>
<!-- <div>
  {sortedLocation[0]}
</div> -->