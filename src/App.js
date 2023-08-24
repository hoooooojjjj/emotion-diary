import React, { useEffect, useMemo, useReducer, useRef } from "react";
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
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }
  // 모든 데이터를 변경하는 reducer함수에 "마지막에 newState를 리턴시키고 그 전에 localStorige에 newState를 저장"하면,
  // 저절로 모든 것이 로컬 스토로지에 저장됨!
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // 로컬 스토리지에서 저장한 Id와 새로고침하고 다시 생성한 id가 겹침
    // 그래서 dataId를 저정한 배열의 Id의 최댓값의 +1을 해줌
    const localData = localStorage.getItem("diary");
    if (localData) {
      // 오름차순 정렬
      const DiaryList = JSON.parse(localData).sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id);
      });
      // 최댓값의 +1
      if (DiaryList.length > 0) {
        dataId.current = parseInt(DiaryList[0].id) + 1;
      }

      // state의 초깃값을 getitem으로 설정
      dispatch({ type: "INIT", data: JSON.parse(localData) });
    }
  }, []);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
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
              <Route path="/edit/:id" element={<Edit />} />
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
