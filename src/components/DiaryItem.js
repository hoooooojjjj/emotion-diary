import { useNavigate } from "react-router-dom";
import Mybutton from "./Mybutton";

const DiaryItem = ({ id, content, date, emotion }) => {
  const nav = useNavigate();
  const strDate = new Date(date).toLocaleDateString();

  const goDetail = () => {
    // 경로에 ${id}를 붙여서 전달하여 path varialbe을 사용할 수 있다.
    nav(`/diary/${id}`);
  };

  const goEdit = () => {
    nav(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={`emotion_img_wrapper emotion_img_wrapper_${emotion}`}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        ></img>
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <Mybutton text={"수정하기"} onclick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;
