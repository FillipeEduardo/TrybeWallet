const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const fetchCotacoes = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = response.json();
  return json;
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_DESPESA_ACTION':
    return ({
      ...state,
    });
  default:
    return state;
  }
};

export default walletReducer;
