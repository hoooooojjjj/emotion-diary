const EmotionItem = ({
  id,
  emotion_img,
  emotion_descript,
  onclick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => {
        onclick(id);
      }}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on${id}` : "EmotionItem_off"
      }`}
    >
      <img src={emotion_img}></img>
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
