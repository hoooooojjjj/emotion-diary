export const getStingDate = (date) => {
  // 0000-00-00 형식으로 바꿔줌.
  return date.toISOString().slice(0, 10);
};
