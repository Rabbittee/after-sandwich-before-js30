export function Question1() {
  return (
    <>
      <h6 className="text-md font-black text-green-500">題目一:</h6>
      <p className="py-2 my-2">
        找到全台當下最低溫的點，並列出
        <span className="hint">縣市</span>
        <span className="hint">行政區</span>
        <span className="hint">測站名稱</span>
        <span className="hint">溫度</span>
        <span className="hint">座標</span>
      </p>
      <small className="block">(透過中央氣象局API取得全台測站即時資料)</small>
      <small className="block">
        (API: v1/rest/datastore/O-A0001-001 or v1/rest/datastore/O-A0003-001)
      </small>
    </>
  );
}
