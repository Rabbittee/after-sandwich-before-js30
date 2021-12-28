const getCurrentData = async(api, elem) => {
    const cwbHost = "https://opendata.cwb.gov.tw";
    const apiPath = api;
    let paramsObj = {
        Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
        elementName: elem,
    };
    let searchParams = new URLSearchParams(paramsObj);
    const response = await fetch(
        `${cwbHost}/${apiPath}?${searchParams.toString()}`
    );
    const data = await response.json();
    return data;
};

const answers = new Array(4).fill({});

// 題目一：找到全台當下最低溫的點，並列出 縣市 行政區 測站名稱 溫度 座標
async function getQ1Answer(){
    data = await getCurrentData("api/v1/rest/datastore/O-A0001-001","TEMP");

    // 排除溫度為空值即-99
    data.records.location = data.records.location.filter(function(item) {
        return item.weatherElement[0].elementValue !== '-99'
    });

    // 取出溫度排序 
    data.records.location.sort(function(a, b) {        
        //if (a.weatherElement[0].elementValue != -99) {
            return parseFloat(a.weatherElement[0].elementValue) - parseFloat(b.weatherElement[0].elementValue);
        //}
    });

    // 傳回排序後的第一筆 即溫度最低
    res = {
        city: data.records.location[0].parameter[0].parameterValue,
        town: data.records.location[0].parameter[2].parameterValue,
        name: data.records.location[0].locationName,
        temp: data.records.location[0].weatherElement[0].elementValue,
        location: {
            lon: data.records.location[0].lat,
            lat: data.records.location[0].lon,
        }};
    return res;

}

let ans1 = Promise.resolve(getQ1Answer());
ans1.then(function(result) {
    answers[0] = result;  

    // 輸出答案結果
    answers.forEach((answer, index) => {
        const answer_node = document.getElementById(`answer_${index + 1}`);
        const showText = JSON.stringify(answer, null, "    ");
        answer_node.rows = showText.split('\n').length;
        answer_node.value = showText;
        });
});


// 題目二：同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object

// 題目三：近24小時降雨量前20名是哪些？分別統計整理列在哪些縣市？

// 題目四：自己所在的縣市-鄉鎮，未來一週的最低溫與最高溫分別為多少？且單日溫差最大為多少？

