const answer_1_ele = document.getElementById("answer_1");
let answer_1 = {
  "city": "STRING",
  "town": "STRING",
  "name": "STRING",
  "temp": 0,
  "location": {
    "lon": 0,
    "lat": 0
  }
}
answer_1_ele.value = JSON.stringify(answer_1, null, '    ');