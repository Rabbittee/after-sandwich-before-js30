import { answer1, answer2, answer3 } from './answer/index.js';

function render(answers) {
  answers.forEach((answer, index) => {
    const answer_node = document.getElementById(`answer_${index + 1}`);
    const showText = JSON.stringify(answer, null, '    ');
    answer_node.rows = showText.split('\n').length;
    answer_node.value = showText;
  });
}
/**
 * 因為 Promise.all 的 response 會是一個 array 且照著順序排列，
 * 所以直接傳入給 render 函式當作參數，
 * render 就直接拿傳入的參數來使用，
 * 就不用事先宣告 answer 的 array。
 */
const totalAnswer = await Promise.all([answer1(), answer2(), answer3()]);
render(totalAnswer);
