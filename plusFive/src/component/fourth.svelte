<script>
  import { onMount } from 'svelte'
  import dayjs from 'dayjs'

  let data
  let taichung
  let today = new Date()
  let tmr = dayjs(today).add(1, 'day').format('YYYY-MM-DD')
  let afterTmr = dayjs(today).add(2, 'day').format('YYYY-MM-DD')
  // console.log(tmr)
  let nextTwoDayArr = []

  onMount(async () => {
    await getCurrentData()
  })

  async function getCurrentData() {
    const cwbHost = 'https://opendata.cwb.gov.tw'
    const apiPath = 'api/v1/rest/datastore/F-D0047-089'
    let paramsObj = {
      Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA'
    }
    let searchParams = new URLSearchParams(paramsObj)
    const response = await fetch(
      `${cwbHost}/${apiPath}?${searchParams.toString()}`
    )

    if (response.statusText === 'OK') {
      data = await response.json()
      taichung = await data.records.locations[0].location[20].weatherElement[3].time
      for (let i = 0; i < taichung.length; i++) {
        let dataDate = dayjs(taichung[i].dataTime).format('YYYY-MM-DD')
        if (dataDate === tmr || dataDate === afterTmr) {
          nextTwoDayArr.push(taichung[i])
        }
      }

      let min = Number(nextTwoDayArr[0].elementValue[0].value)
      let max = Number(nextTwoDayArr[0].elementValue[0].value)
      for (let i = 0; i < nextTwoDayArr.length; i++) {
        let compare = Number(nextTwoDayArr[i].elementValue[0].value)
        if (compare < min) {
          min = compare
        }

        if (compare > max) {
          max = compare
        }
      }
      // let test = taichung[17].dataTime
      // console.log(taichung)
      // console.log(test.slice(0 ,-8))
      // console.log(dayjs(test).format('YYYY-MM-DD'))
      // console.log(dayjs(today).add(2, 'day').format('YYYY-MM-DD'))
      // let t = dayjs(today).add(2, 'day').format('YYYY-MM-DD')
      // console.log(dayjs(test).format('YYYY-MM-DD') === t)
    }
  }
</script>

<h6 class="mb-3">第三題：自己所在的縣市，未來兩天的最低溫與最高溫分別為多少？
且最大單日溫差為多少？</h6>
<div>
  
</div>