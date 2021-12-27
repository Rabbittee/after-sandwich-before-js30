<script>
  import { onMount } from 'svelte'

  let data
  let location
  let currentTN
  let under = [[], [], [], [], [], [], [], []]
  let under500 = []
  let under1000 = []
  let under1500 = []
  let under2000 = []
  let under2500 = []
  let under3000 = []
  let under3500 = []
  let under4000 = []
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
      // console.log(location)
      classifyElev()
    }
  }

  function classifyElev() {
    for(let i = 0; i < location.length; i++) {
      // 這裡要先 filter 掉 -99 的
      const elev = location[i].weatherElement[0].elementValue
      let j = Math.floor(Number(elev) / 500)
      under[j].push(location[i])
      // if (Number(elev) < 500) {
      //   // under[0].push(location[i])
      //   under500.push(location[i])
      // } else if (Number(elev) >= 500 && Number(elev) < 1000) {
      //   under1000.push(location[i])
      //   // console.log(under1000)
      // } else if (Number(elev) >= 1000 && Number(elev) < 1500) {
      //   under1500.push(location[i])
      // } else if (Number(elev) >= 1500 && Number(elev) < 2000) {
      //   under2000.push(location[i])
      // } else if (Number(elev) >=2000 && Number(elev) < 2500) {
      //   under2500.push(location[i])
      // } else if (Number(elev) >=2500 && Number(elev) < 3000) {
      //   under3000.push(location[i])
      // } else if (Number(elev) >=3000 && Number(elev) < 3500) {
      //   under3500.push(location[i])
      // } else if (Number(elev) >=3500 && Number(elev) < 4000) {
      //   under4000.push(location[i])
      // }
    }
    console.log(under)
    // invokeGetCurrentTN()
  }

  function invokeGetCurrentTN() {
    getCurrentTN(under500)
    getCurrentTN(under1000)
    getCurrentTN(under1500)
    getCurrentTN(under2000)
    getCurrentTN(under2500)
    getCurrentTN(under3000)
    getCurrentTN(under3500)
    getCurrentTN(under4000)
    // for (i = 0; i < under.length; i++) {
    //   getCurrentTN(under[i])
    // }
  }

  // 參數會是 double array
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
    console.log(elevTN)
  }

  // let lowest.fill(100, 8);
  // let result.fill("", 8)

  // for(let i=0; i<array_data.length; i++){
  //     // filter
  //     if(temperture ==-99)  continue;
  //     if(N <= 100)  continue;
      
  //     let j = hight/500;
  //     if(lowest[j] > temperture){
  //         lowest[j] = temperture;
  //         result[j] = array_data[i];
  //     }
  // }
</script>

<div>
  {JSON.stringify(elevTN)}
</div>