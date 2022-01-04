import {
  Question1,
  Question2,
  Question3,
  Question4,
  Answer1,
} from "./components";
import { Card } from "./components/Card";

function App() {
  return (
    <main className="w-screen max-w-3xl flex flex-col mx-auto my-16 space-y-6 px-4">
      <h4 className="text-2xl font-black">JS讀書會後測啦</h4>

      {/* 第一題 */}
      <Card>
        <Question1 />
        <Answer1 />
      </Card>

      {/* 第二題 */}
      <Card>
        <Question2 />
      </Card>
      <section className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8">
        <h6 className="text-md font-black">Answer:格式自己定辣，我懶</h6>
        <textarea
          className="w-full p-4 text-black text-opacity-70 text-sm"
          id="answer_2"
          disabled
        ></textarea>
      </section>

      {/* 第三題 */}
      <Card>
        <Question3 />
      </Card>
      <section className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8">
        <h6 className="text-md font-black">Answer:</h6>
        <textarea
          className="w-full p-4 text-black text-opacity-70 text-sm"
          id="answer_3"
          disabled
        ></textarea>
      </section>

      {/* 第四題 */}
      <Card>
        <Question4 />
      </Card>
      <section className="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8">
        <h6 className="text-md font-black">Answer:</h6>
        <textarea
          className="w-full p-4 text-black text-opacity-70 text-sm"
          id="answer_4"
          disabled
        ></textarea>
      </section>
    </main>
  );
}

export default App;
