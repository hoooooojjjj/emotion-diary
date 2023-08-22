// 공통 컴포넌트 -> 공통으로 사용할 컴포넌트를 미리 만들어두고 가져다가 씀
// 바뀔 내용들을 Props로 받아서 사용하면 됨.
const Mybutton = ({ text, type, onclick }) => {
  // type에 이상한 문자열이 오면 default로
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={`MyButton MyButton_${btnType}`} onClick={onclick}>
      {text}
    </button>
  );
};
Mybutton.dafaultProps = {
  type: "default",
};
export default Mybutton;
