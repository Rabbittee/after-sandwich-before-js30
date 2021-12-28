<template>
  <div class="text-center">
    <h2 class="mr-24 my-10 text-2xl">JS讀書會後測啦</h2>
    <template v-for="(item, index) in q" :key="item.id">
      <question :question="{ id: index + 1, item}"></question>
    </template>
  </div>
</template>

<script setup>
import question from "./components/question.vue";

const q = [
  "找到全台當下最低溫的點，並列出 縣市 行政區 測站名稱 溫度 座標",
  "同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳 object",
  "近24小時降雨量前20名是哪些？ 分別統計整理列在哪些縣市？",
  "自己所在的縣市，未來兩天的最低溫與最高溫分別為多少？且最大單日溫差為多少？",
];
</script>
