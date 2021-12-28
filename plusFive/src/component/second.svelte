<script>
  import { onMount } from 'svelte'

  let data
  let location
  let currentTN
  let under = [[], [], [], [], [], [], [], []]
  let elevTN = []

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

      classifyElev()
    }
  }

  function classifyElev() {
    for(let i = 0; i < location.length; i++) {
      const elev = location[i].weatherElement[0].elementValue
      // 這裡要先 filter 掉 -99 的
      if (Number(elev) === -99) continue

      let j = Math.floor(Number(elev) / 500)
      under[j].push(location[i])
    }

    invokeGetCurrentTN()
  }

  function invokeGetCurrentTN() {
    for (let i = 0; i < under.length; i++) {
      getCurrentTN(under[i])
    }
  }

  function getCurrentTN(locationArr) {
    let smallest = Number(locationArr[0].weatherElement[3].elementValue)
    let smallestIndex = 0
    for (let i = 0; i < locationArr.length; i++) {
      let comparison = Number(locationArr[i].weatherElement[3].elementValue)
      if (comparison < smallest && comparison !== -99) {
        smallest = Number(locationArr[i].weatherElement[3].elementValue)
        smallestIndex = i
      }
    }

    currentTN = locationArr[smallestIndex]
    elevTN.push(currentTN)
    elevTN = elevTN
  }
</script>

<h6 class="mb-3">第二題：</h6>
{#each elevTN as elev}
  <div class="p-1 border border-gray-200">
    <div>
      測站名稱：{elev.locationName}
    </div>
    <div>
      溫度：{elev.weatherElement[3].elementValue}
    </div>
  </div>
{/each}
<!-- <div>
  // 這裡會出錯，待研究
  {elevTN[0]}
  {elevTN[0].weatherElement[0].elementValue}
  {JSON.stringify(elevTN[1].lat)}
</div> -->