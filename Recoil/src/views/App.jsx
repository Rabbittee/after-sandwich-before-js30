import clsx from "clsx";
import QuestionOne from "../components/Q1/Q1";
import QuestionTwo from "../components/Q2/Q2";
import QuestionThree from "../components/Q3/Q3";
import QuestionFour from "../components/Q4/Q4";

function App() {
  return (
    <div className="App">
      <main
        className={clsx(
          "flex flex-col",
          "w-screen max-w-3xl",
          "mx-auto my-16 space-y-6"
        )}
      >
        <h4 className="text-2xl font-black">JS讀書會後測啦</h4>
        <QuestionOne />
        <QuestionTwo />
        <QuestionThree />
        <QuestionFour />
      </main>
    </div>
  );
}

export default App;
