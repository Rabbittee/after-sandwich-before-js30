import { answer1, answer2, answer3, answer4 } from './answer/index.js'
import { render } from './script.js'

const totalAnswer = async() => {
  await answer1();
  await answer2();
  await answer3();
  await answer4();
}

totalAnswer().then(() => {
  render();
})