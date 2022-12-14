function question1() {
  return (
    <section className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8">
      <h6 class="text-md font-black">題目一:</h6>
      找到全台當下最低溫的點，並列出
      <span class="bg-blue-900 text-white">縣市</span>
      <span class="bg-blue-900 text-white">行政區</span>
      <span class="bg-blue-900 text-white">測站名稱</span>
      <span class="bg-blue-900 text-white">溫度</span>
      <span class="bg-blue-900 text-white">座標</span>
      <small class="block">(透過中央氣象局API取得全台測站即時資料)</small>
      <small class="block">
        (API: v1/rest/datastore/O-A0001-001 or v1/rest/datastore/O-A0003-001)
      </small>
    </section>
  );
}

export default question1;
