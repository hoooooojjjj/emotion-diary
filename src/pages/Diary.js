import { useParams } from "react-router";

const Diary = () => {
  // Path Variable -> url에 변수를 전달할 수 있음. -> /:id
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지입니다</p>
    </div>
  );
};

export default Diary;
