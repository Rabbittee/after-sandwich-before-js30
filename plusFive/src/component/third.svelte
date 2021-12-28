<script>
  import { onMount } from 'svelte'

  let data
  let location
  let sortedLocation = []

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

      sortedLocation = location.filter(function(item, i) {
        return Number(item.weatherElement[0].elementValue) > 0 
        })
        .map(function(item,i) {
          return [item.parameter[0].parameterValue, Number(item.weatherElement[0].elementValue)]
        })
        .sort(compare).slice(-20)
      
      sortedLocation = sortedLocation.reverse()
    }
  }

  function compare(a, b) {
    if (a[1] > b[1]) return 1
    if (b[1] > a[1]) return -1

    return 0
  }
</script>

<h6 class="mb-3">第三題：近24小時降雨量前20名是哪些？分別統計整理列在哪些縣市？</h6>
<div class="flex flex-wrap justify-center">
  {#each sortedLocation as location, i}
    <div class="p-1 border border-gray-200 w-32">
      <div>第{i + 1}名</div>
      <div>
        縣市：{location[0]}
      </div>
      <div>
        累積雨量：{location[1]}
      </div>
    </div>
  {/each}
</div>