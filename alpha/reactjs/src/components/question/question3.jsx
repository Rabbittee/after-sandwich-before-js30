export function Question3() {
  return (
    <>
      <h6 className="text-md font-black">題目三:</h6>

      <p className="my-2 space-y-2">
        近<span className="hint">24小時</span>降雨量
        <span className="hint">前20名</span>是哪些？
        <br />
        分別統計整理列在哪些<span className="hint">縣市</span>？
      </p>
      <small className="block">HOUR_24欄位為近24小時的累積降雨量</small>
      <small className="block">(API: /v1/rest/datastore/O-A0002-001)</small>
    </>
  );
}
