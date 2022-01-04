<script>
  import { onMount } from 'svelte'
  import fetchData from '../js/fetch'
  import { cwbHost, TempApiPath, token } from '../js/constants'

  const paramsObj = {
    Authorization: token
  }
  const searchParams = new URLSearchParams(paramsObj)
  
  let data
  let location
  let currentTN

  onMount(async () => {
    await getCurrentData()
  })

  async function getCurrentData() {
    data = await fetchData(cwbHost, TempApiPath, searchParams)
    location = await data.records.location

    getCurrentTN()
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
    currentTN = currentTN
  }
</script>

<h6 class="mb-3">第一題：找到全台當下最低溫的點</h6>
<div>
  {#if currentTN}
    <div class="p-1 border border-gray-200">
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
<!-- {currentTN.locationName} -->
