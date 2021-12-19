import "./index.css";
import { question as q1 } from "./questions/q1";
import { question as q2 } from "./questions/q2";
import { question as q3 } from "./questions/q3";

const app = document.getElementById("app");

await q1.getAnswer({ field: "TEMP", calc: "MIN" }).output(app);
await q2.getAnswer({ field: "TEMP", calc: "MIN", step: 500 }).output(app);
await q3.getAnswer({ field: "HOUR_24", calc: "MAX", rank: 20 }).output(app);
