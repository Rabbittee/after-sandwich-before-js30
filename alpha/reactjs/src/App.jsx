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
import {
  Link,
  Route,
  Routes,
  useResolvedPath,
  useMatch,
} from "react-router-dom";
import clsx from "clsx";

function Layout({ children }) {
  return (
    <main className="w-screen max-w-3xl flex flex-col mx-auto my-16 space-y-6 px-4">
      <h4 className="text-2xl font-black text-emerald-800">JS讀書會後測啦</h4>
      {children}
    </main>
  );
}

function Part1() {
  return (
    <Card>
      <Question1 />
      <Answer1 />
    </Card>
  );
}

function Part2() {
  return (
    <Card>
      <Question2 />
      <Answer2 />
    </Card>
  );
}
function Part3() {
  return (
    <Card>
      <Question3 />
      <Answer3 />
    </Card>
  );
}
function Part4() {
  return (
    <Card>
      <Question4 />
      <Answer4 />
    </Card>
  );
}
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={clsx(
          match ? "text-white bg-green-500 " : "text-gray-400",
          "px-4 py-1 rounded-md"
        )}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
function App() {
  return (
    <Layout>
      <nav className="flex space-x-2">
        <CustomLink to="/">Part1</CustomLink>
        <CustomLink to="/part2">Part2</CustomLink>
        <CustomLink to="/part3">Part3</CustomLink>
        <CustomLink to="/part4">Part4</CustomLink>
      </nav>
      {/* 第一題 */}
      <Routes>
        <Route index element={<Part1 />} exact />
        {/* 第二題 */}
        <Route path="/part2" element={<Part2 />} />
        {/* 第三題 */}
        <Route path="/part3" element={<Part3 />} />
        {/* 第四題 */}
        <Route path="/part4" element={<Part4 />} />
      </Routes>
    </Layout>
  );
}

export default App;
