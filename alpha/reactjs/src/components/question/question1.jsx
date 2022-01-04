export function Question1() {
  return (
    <>
      <h6 className="text-md font-black text-green-600">題目一:</h6>
      <p className="text-green my-2">
        找到全台當下最低溫的點，並列出
        <span className="bg-red-400 text-white p-1 mx-0.5 rounded-md">
          縣市
        </span>
        <span className="bg-blue-900 text-white">行政區</span>
        <span className="bg-blue-900 text-white">測站名稱</span>
        <span className="bg-blue-900 text-white">溫度</span>
        <span className="bg-blue-900 text-white">座標</span>
      </p>
      <small className="block">(透過中央氣象局API取得全台測站即時資料)</small>
      <small className="block">
        (API: v1/rest/datastore/O-A0001-001 or v1/rest/datastore/O-A0003-001)
      </small>
    </>
  );
}
