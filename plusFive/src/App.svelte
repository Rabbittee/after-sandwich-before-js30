<script>
  import First from './component/first.svelte'
	import Second from './component/second.svelte'
  import Third from './component/third.svelte'
  import Fourth from './component/fourth.svelte'

  // region for modify
  // 1. API 用一個地方集中寫不要重複打
  // 2. 練習用別的方法打 API
  // 3. 使用更明確的陣列方法操作（？
  // 4. component 可以分得更明確一點
  // 5. 第二題要回傳 object，研究如何傳 object
  // 6. 研究 rollup base url 的東東
  // regionend
</script>

<main class="w-screen h-screen flex flex-col items-center bg-gray-200 overflow-auto">
  <h3 class="m-3">三明治讀書會期末考</h3>
  <section class="first w-1/3 bg-white m-3 p-5 rounded-lg shadow-md font-light">
    <First />
  </section>
  <section
    class="second w-1/3 bg-white m-3 p-5 rounded-lg shadow-md font-light"
  >
    <Second />
	</section>

  <section
    class="third w-1/3 bg-white m-3 p-5 rounded-lg shadow-md font-light"
  >
    <Third />
  </section>

  <!-- <section
    class="forth w-1/5 bg-white m-3 p-5 rounded-lg shadow-md font-light"
  >
    <Fourth />
  </section> -->
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
