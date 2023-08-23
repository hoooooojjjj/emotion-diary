import React, { useMemo, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// COMPONENTS

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE":
      {
        newState = [...action.data, , ...state];
      }
      break;
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const dummydata = [
  {
    id: 1,
    content: "일기 1번",
    date: 1692710029216,
    emotion: 1,
  },
  {
    id: 2,
    content: "일기 2번",
    date: 1692710029217,
    emotion: 2,
  },
  {
    id: 3,
    content: "일기 3번",
    date: 1692710029218,
    emotion: 3,
  },
  {
    id: 4,
    content: "일기 4번",
    date: 1692710029219,
    emotion: 4,
  },
  {
    id: 5,
    content: "일기 5번",
    date: 1692710029220,
    emotion: 5,
  },
];
function App() {
  const [data, dispatch] = useReducer(reducer, dummydata);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      date: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const MemoizedDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={MemoizedDispatches}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              {/* // Path Variable */}
              <Route path="/diary/:id" element={<Diary />} />
              {/* <Route path="/diary:" element={<Diary />} /> => id없는 페이지가 존재한다면 예외처리해줘야함.*/}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
