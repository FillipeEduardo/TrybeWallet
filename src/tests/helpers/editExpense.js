const editExpense = (array, newObj, idToEdit) => {
  const newArray = [...array];
  const { value, description, currency, method, tag } = newObj;
  newArray.forEach((e, index) => {
    if (e.id === idToEdit) {
      newArray[index] = ({
        ...e,
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  });
  return newArray;
};

export default editExpense;
