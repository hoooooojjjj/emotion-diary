import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  // // query stirng -> ?키=값&키=값&키=값....
  // const [searchParams, setsearchParams] = useSearchParams();
  // const id = searchParams.get("id"); // searchParams는 키를 매개변수로 보내 전달받은 값을 사용할 수 있음
  // const mode = searchParams.get("mode");
  // console.log(id, mode);
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  // path moving
  const nav = useNavigate(); // 강제로 다른 경로로 보내버릴 때 등에 사용할 수 있음. 뒤로가기, 앞으로 가기 등도 가능
  const [orginData, setorginData] = useState();

  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = `감정 일기장 - ${id}번 일기 수정 `;
  }, []);
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => {
        return parseInt(it.id) === parseInt(id);
      });
      console.log(targetDiary);
      if (targetDiary) {
        setorginData(targetDiary);
      } else {
        alert("없는 일기입니다");
        // replace : true를 해주면 뒤로가기를 못함
        nav("/", { replace: true });
      }
    }
  }, [diaryList, id]);
  return (
    <div>
      {orginData && <DiaryEditor isEdit={true} orginData={orginData} />}
    </div>
  );
};

export default Edit;
