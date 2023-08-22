import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import RouteTest from "./components/RouteTest";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          {/* // Path Variable */}
          <Route path="/diary/:id" element={<Diary />} />
          {/* <Route path="/diary:" element={<Diary />} /> => id없는 페이지가 존재한다면 예외처리해줘야함.*/}
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
