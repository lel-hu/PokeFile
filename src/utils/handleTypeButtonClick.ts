// タイプボタンがクリックされた時の処理
export const handleTypeButtonClick = (
  type: string,
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setSelectedTypes((prevSelectedTypes) => {
    if (prevSelectedTypes.includes(type)) {
      return prevSelectedTypes.filter((t) => t !== type);
    } else if (prevSelectedTypes.length < 2) {
      return [...prevSelectedTypes, type];
    } else {
      return [type];
    }
  });
};
