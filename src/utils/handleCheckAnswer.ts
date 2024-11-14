// 答え合わせを行う関数
export const handleCheckAnswer = (
  selectedTypes: string[],
  correctTypes: string[],
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>
) => {
  console.log("Selected Types:", selectedTypes);
  console.log("Correct Types:", correctTypes);
  const isCorrect =
    selectedTypes.length === correctTypes.length &&
    selectedTypes.every((selectedType) =>
      correctTypes.some((correctType) => correctType.includes(selectedType))
    );
  setIsCorrect(isCorrect);
  console.log("Is Correct:", isCorrect);
};
