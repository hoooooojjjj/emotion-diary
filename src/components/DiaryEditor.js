import { useNavigate } from "react-router-dom";
import Mybutton from "./Mybutton";
import Myheader from "./Myheader";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStingDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, orginData }) => {
  useEffect(() => {
    if (isEdit) {
      setdate(getStingDate(new Date(parseInt(orginData.date))));
      setemotion(orginData.emotion);
      setcontent(orginData.content);
    }
  }, [isEdit, orginData]);
  const nav = useNavigate();

  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const [date, setdate] = useState(getStingDate(new Date()));
  const [emotion, setemotion] = useState(3);
  const [content, setcontent] = useState("");

  const handleClickEmote = useCallback((emotion) => {
    setemotion(emotion);
  }, []);

  const handleSudmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(orginData.id, date, content, emotion);
      }

      nav("/", { replace: true });
    }
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(orginData.id);
      nav("/", { replace: true });
    }
  };
  return (
    <div className="DiaryEditor">
      <Myheader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftchild={
          <Mybutton
            text={"< 뒤로 가기"}
            onclick={() => {
              nav(-1);
            }}
          />
        }
        rightchild={
          isEdit && (
            <Mybutton
              text={"삭제하기"}
              type={"negative"}
              onclick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                onclick={handleClickEmote}
                isSelected={it.id === emotion}
                key={it.id}
                {...it}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setcontent(e.target.value);
              }}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <Mybutton
              text={"취소하기"}
              onclick={() => {
                nav(-1);
              }}
            />
            <Mybutton
              text={"작성완료"}
              type={"positive"}
              onclick={handleSudmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
