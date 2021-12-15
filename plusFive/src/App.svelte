<script>
	import { onMount } from 'svelte'

  let data
	let location
	let promise
	let currentTN

	onMount (
		promise = getCurrentData()
	)

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
			location = data.records.location
			console.log(location)
			
			return getCurrentTN()
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
		console.log(currentTN)
		console.log(smallest)

		return currentTN
	}
</script>

<main class="w-screen h-screen flex flex-col items-center bg-gray-200">
	<h3 class="m-3">三明治讀書會期末考～</h3>
	<section class="first w-1/5 bg-white m-3 p-5 rounded-lg shadow-md font-light">
		<h6>第一題：</h6>
		<div>
			{#await promise}
				waiting....
			{:then currentTN}
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
					座標：{currentTN.lat} <span class="mx-1"></span> {currentTN.lon}
				</div>
			</div>
			{/await}
		</div>
	</section>
	<section class="second w-1/5 bg-white m-3 p-5 rounded-lg shadow-md font-light">

	</section>

	<section class="third w-1/5 bg-white m-3 p-5 rounded-lg shadow-md font-light">

	</section>

	<section class="forth w-1/5 bg-white m-3 p-5 rounded-lg shadow-md font-light">

	</section>
</main>

<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->
<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
