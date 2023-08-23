import { useContext, useEffect, useState } from "react";
import Myheader from "./../components/Myheader.js";
import Mybutton from "./../components/Mybutton.js";
import DiaryList from "./../components/DiaryList.js";
import { DiaryStateContext } from "../App.js";

const Home = () => {
  const Diarylist = useContext(DiaryStateContext);
  const [data, setdata] = useState([]);

  const [curDate, setcurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    // 일기 리스트가 존재 할 때만 작업을 수행하여 최적화
    if (Diarylist.length >= 1) {
      //  (사용자가 변경한)현재 curDate 달의 첫 날짜의 밀리세컨즈
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      // 현재 curDate 달의 마지막 날짜의 밀리세컨즈
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
      // 현재 curDate 달의 첫 날짜와 마지막 날짜 사이에 있는 일기 리스트만 필터링
      setdata(
        Diarylist.filter(
          (item) => item.date >= firstDay && item.date <= lastDay
        )
      );
    }
  }, [curDate, Diarylist]);

  const increaseMonth = () => {
    // new Date에 인자로 원하는 날짜를 넣어주면 그 날짜대로 날짜를 출력함. -> 원하는 날짜를 가져올 수 있다.
    // 그래서 날짜를 추가 , 빼기 하려면 상태변화함수에 new Date(추가, 뺴기 할 날짜)를 인자로 넣어주면 됨.
    // 이렇게 하면 단순히 숫자만 변하는 것이 아니라 진짜 날짜가 바뀜.
    setcurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setcurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  return (
    <div>
      <Myheader
        headText={headText}
        leftchild={<Mybutton text={"<"} onclick={decreaseMonth} />}
        rightchild={<Mybutton text={">"} onclick={increaseMonth} />}
      />
      <div>
        <DiaryList DiaryList={data} />
      </div>
    </div>
  );
};

export default Home;
