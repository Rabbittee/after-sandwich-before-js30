import { answer1, answer2, answer3, answer4 } from './answer/index.js';
import { render } from './script.js';

/**
 * 因為 Promise.all 的 response 會是一個 array 且照著順序排列，
 * 所以直接傳入給 render 函式當作參數，
 * render 就直接拿傳入的參數來使用，
 * 就不用事先宣告 answer 的 array。
 */
const totalAnswer = await Promise.all([answer1(), answer2(), answer3(), answer4()]);
render(totalAnswer);
