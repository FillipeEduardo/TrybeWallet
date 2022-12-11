const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  countId: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_SUCCESSFUL':
    return ({
      ...state,
      isLoading: false,
      currencies: action.payload,
    });
  case 'SAVE_SUCESS':
    return ({
      ...state,
      isLoading: false,
      expenses: [...state.expenses, action.payload],
    });
  case 'DELETE_DESPESA':
    return ({
      ...state,
      expenses: action.payload,
    });
  case 'EDITAR_DESPESA':
    return ({
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    });
  case 'SALVAR_EDICAO':
    return ({
      ...state,
      expenses: action.att,
      editor: false,
    });
  default:
    return state;
  }
};

export default walletReducer;
