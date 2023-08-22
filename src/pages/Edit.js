import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // query stirng -> ?키=값&키=값&키=값....
  const [searchParams, setsearchParams] = useSearchParams();
  const id = searchParams.get("id"); // searchParams는 키를 매개변수로 보내 전달받은 값을 사용할 수 있음
  const mode = searchParams.get("mode");
  console.log(id, mode);

  // path moving
  const nav = useNavigate(); // 강제로 다른 경로로 보내버릴 때 등에 사용할 수 있음. 뒤로가기, 앞으로 가기 등도 가능
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지입니다</p>
      <button
        onClick={() => {
          // setsearchParams는 키와 값을 객체로 전달하여 새로 만들어주거나 변경할 수 있음
          setsearchParams({ who: "sono" });
        }}
      >
        바꾸기
      </button>
      <button
        onClick={() => {
          nav("/");
        }}
      >
        홈으로 가기
      </button>
      <button
        onClick={() => {
          nav(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Edit;
