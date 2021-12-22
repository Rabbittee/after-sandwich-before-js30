import "./index.css";

import { question as q1 } from "./questions/q1";
import { question as q2 } from "./questions/q2";
import { question as q3 } from "./questions/q3";
import { question as q4 } from "./questions/q4";

const app = document.getElementById("app");

q1.getAnswer({ field: "TEMP", calc: "min" }).output(app);
q2.getAnswer({ field: "TEMP", calc: "min", step: 500 }).output(app);
q3.getAnswer({ field: "HOUR_24", calc: "top", rank: 20 }).output(app);
q4.getAnswer({ field: "T", locationName: "臺北市" }).output(app);
