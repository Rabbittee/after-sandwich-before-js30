export function Question2() {
  return (
    <>
      <h6 className="text-md font-black text-green-500">題目二:</h6>
      <p className="my-2">
        同上，針對不同海拔高度找出最低溫測站，每
        <span className="hint">500m</span>一組，並回傳object
      </p>
      <small className="block">
        (API: v1/rest/datastore/O-A0001-001 or v1/rest/datastore/O-A0003-001)
      </small>
    </>
  );
}
