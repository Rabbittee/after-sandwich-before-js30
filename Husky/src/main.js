import "./index.css";
import { question as q1 } from "./questions/q1";

const answers = [];
answers.push(await q1("TEMP", "MIN"));

for (let answer of answers) {
  console.log(answer);
}
