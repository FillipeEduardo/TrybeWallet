import store from '../store';

export const saveEmailAction = (email) => ({
  type: 'SAVE_EMAIL_ACTION',
  email,
});

const requestSuccessful = (dados) => ({
  type: 'REQUEST_SUCCESSFUL',
  payload: dados,
});

const fetchCotacoes = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = response.json();
  return json;
};

export const walletAction = () => async (dispatch) => {
  let moedas = Object.keys(await fetchCotacoes());
  moedas = moedas.filter((m) => m !== 'USDT');
  dispatch(requestSuccessful(moedas));
};

const saveSucess = (dados) => ({
  type: 'SAVE_SUCESS',
  payload: dados,
});

export const deletarDespesaAction = (id) => (dispatch) => {
  let despesas = [...store.getState().wallet.expenses];
  despesas = despesas.filter((despesa) => despesa.id !== id);
  dispatch({
    type: 'DELETE_DESPESA',
    payload: despesas,
  });
};

export const editarDespesaAction = (id) => (dispatch) => {
  dispatch({ type: 'EDITAR_DESPESA', idToEdit: id });
};

export const salvarEdicao = ({ value, description, currency, method,
  tag }) => (dispatch) => {
  let despesas = [...store.getState().wallet.expenses];
  const { idToEdit } = store.getState().wallet;
  despesas = despesas.map((despesa) => {
    switch (despesa.id) {
    case idToEdit:
      return ({
        ...despesa,
        value,
        description,
        currency,
        method,
        tag,
      });

    default:
      return despesa;
    }
  });
  dispatch({
    type: 'SALVAR_EDICAO',
    att: despesas,
  });
};

export const saveExpense = (state) => async (dispatch) => {
  const moedas = await fetchCotacoes();
  const dadosPadrao = {
    ...state,
    exchangeRates: moedas,
  };
  dispatch(saveSucess(dadosPadrao));
};
