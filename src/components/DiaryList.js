import React, { useState } from "react";
import Mybutton from "./Mybutton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  {
    value: "lastest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
];

const filterOptionList = [
  {
    value: "all",
    name: "전부 다",
  },
  {
    value: "good",
    name: "좋은 감정만",
  },
  {
    value: "bad",
    name: "안 좋은 감정만",
  },
];
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ DiaryList }) => {
  const [sortType, serSortType] = useState("lastest");
  const [filter, setfilter] = useState("all");
  const nav = useNavigate();

  // 정렬 함수
  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    // 최신 순, 오래된 순 정렬 로직
    // 비교 함수를 사용하여 sort() 메서드를 사용
    const compare = (a, b) => {
      if (sortType === "lastest") {
        // 배열 안에 요소가 객체 일땐, a.date 이런식으로 비교할 값의 속성값을 가져와야 한다.
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // sort() 메서드 등 배열 자체를 바꾸는 메서드는 데이터를 아예 바꿔버릴 수 있기 때문에 copy를 해야한다.
    // 이때, JSON.parse와 JSON.stringify를 사용해서 copy해야 안전하다.
    const copyList = JSON.parse(JSON.stringify(DiaryList));

    // 감정별 정렬 로직
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it) => {
            return filterCallback(it);
          });
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={serSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setfilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <Mybutton
            type={"positive"}
            text={"새 일기 쓰기"}
            onclick={() => {
              nav("/new");
            }}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  DiaryList: [],
};
export default React.memo(DiaryList);
