import {
  Question1,
  Question2,
  Question3,
  Question4,
  Answer1,
  Answer2,
  Answer3,
  Answer4,
} from "./components";
import { Card } from "./components/Card";

function App() {
  return (
    <main className="w-screen max-w-3xl flex flex-col mx-auto my-16 space-y-6 px-4">
      <h4 className="text-2xl font-black text-emerald-800">JS讀書會後測啦</h4>

      {/* 第一題 */}
      <Card>
        <Question1 />
        <Answer1 />
      </Card>

      {/* 第二題 */}
      <Card>
        <Question2 />
        <Answer2 />
      </Card>

      {/* 第三題 */}
      <Card>
        <Question3 />
        <Answer3 />
      </Card>

      {/* 第四題 */}
      <Card>
        <Question4 />
        <Answer4 />
      </Card>
    </main>
  );
}

export default App;
