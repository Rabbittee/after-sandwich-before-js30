export function Question4() {
  return (
    <>
      <h6 className="text-md font-black">題目四:</h6>
      自己所在的縣市，未來兩天的
      <span className="bg-blue-900 text-white">最低溫</span>與
      <span className="bg-blue-900 text-white">最高溫</span>分別為多少？
      <br />且<span className="bg-blue-900 text-white">最大單日溫差</span>
      為多少？
      <small className="block">(API:/v1/rest/datastore/F-D0047-089)</small>
    </>
  );
}
