export function Question3() {
  return (
    <>
      <h6 className="text-md font-black">題目三:</h6>近
      <span className="bg-blue-900 text-white">24小時</span>降雨量
      <span className="bg-blue-900 text-white">前20名</span>是哪些？
      <br />
      分別統計整理列在哪些<span className="bg-blue-900 text-white">縣市</span>？
      <small className="block">HOUR_24欄位為近24小時的累積降雨量</small>
      <small className="block">(API: /v1/rest/datastore/O-A0002-001)</small>
    </>
  );
}
