<script>
  import { onMount } from 'svelte'

  let data
  let location
  let currentTN

  onMount(async () => {
    await getCurrentData()
  })

  async function getCurrentData() {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore/O-A0001-001'
    let paramsObj = {
      Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA'
    }
    let searchParams = new URLSearchParams(paramsObj)
    const response = await fetch(
      `${cwbHost}/${apiPath}?${searchParams.toString()}`
    )

    if (response.statusText === 'OK') {
      data = await response.json()
      location = await data.records.location
      // console.log(location)

      getCurrentTN()
    }
  }

  function getCurrentTN() {
    let smallest = Number(location[0].weatherElement[3].elementValue)
    let smallestIndex = 0
    for (let i = 0; i < location.length; i++) {
      let comparison = Number(location[i].weatherElement[3].elementValue)
      if (comparison < smallest && comparison !== -99) {
        smallest = Number(location[i].weatherElement[3].elementValue)
        smallestIndex = i
      }
    }

    currentTN = data.records.location[smallestIndex]
    // console.log(currentTN)
    // console.log(smallest)
  }
</script>

<h6>第一題：</h6>
<div>
  {#if currentTN}
    <div class="currentTN">
      <div>
        縣市：{currentTN.parameter[0].parameterValue}
      </div>
      <div>
        行政區：{currentTN.parameter[2].parameterValue}
      </div>
      <div>
        測站名稱：{currentTN.locationName}
      </div>
      <div>
        溫度：{currentTN.weatherElement[3].elementValue}
      </div>
      <div>
        座標：{currentTN.lat} <span class="mx-1"></span>
        {currentTN.lon}
      </div>
    </div>
  {/if}
</div>
