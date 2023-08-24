import { useParams, useNavigate } from "react-router";
import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getStingDate } from "../util/date";
import Myheader from "../components/Myheader";
import Mybutton from "../components/Mybutton";
import { emotionList } from "../util/emotion";
const Diary = () => {
  // Path Variable -> url에 변수를 전달할 수 있음. -> /:id
  const { id } = useParams();
  const Diarylist = useContext(DiaryStateContext);
  const nav = useNavigate();
  const [orgindata, setorgindata] = useState();

  useEffect(() => {
    if (Diarylist.length >= 1) {
      const targetDiary = Diarylist.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setorgindata(targetDiary);
      } else {
        alert("없는 일기입니다");
        nav("/", { replace: true });
      }
    }
  }, [id, Diarylist]);

  if (!orgindata) {
    return <div className="DiaryPage">로딩 중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.id) === parseInt(orgindata.emotion)
    );
    console.log(curEmotionData);
    return (
      <div className="DiaryPage">
        <Myheader
          headText={`${getStingDate(new Date(orgindata.date))} 기록`}
          leftchild={
            <Mybutton
              text={"뒤로 가기"}
              onclick={() => {
                nav(-1);
              }}
            />
          }
          rightchild={
            <Mybutton
              text={"수정하기"}
              onclick={() => {
                nav(`/edit/${orgindata.id}`);
              }}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={`diary_img_wrapper diary_img_wrapper_${orgindata.emotion}`}
            >
              <img src={curEmotionData.emotion_img}></img>
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{orgindata.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
