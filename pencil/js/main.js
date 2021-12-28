import { getResponseData } from "./api.js";
import q1 from "./q1.js";
import q2 from "./q2.js";

q1(await getResponseData());
q2(await getResponseData());