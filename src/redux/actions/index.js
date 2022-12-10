import store from '../store';

export const saveEmailAction = (email) => ({
  type: 'SAVE_EMAIL_ACTION',
  email,
});

const requestStarted = () => ({ type: 'REQUEST_STARTED' });

const requestSuccessful = (dados) => ({
  type: 'REQUEST_SUCCESSFUL',
  payload: dados,
});

const requestFailed = (error) => ({
  type: 'REQUEST_FAILED',
  payload: error,
});

const fetchCotacoes = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = response.json();
  return json;
};

export const walletAction = () => async (dispatch) => {
  dispatch(requestStarted());
  try {
    let moedas = Object.keys(await fetchCotacoes());
    moedas = moedas.filter((m) => m !== 'USDT');
    dispatch(requestSuccessful(moedas));
  } catch (error) {
    requestFailed(error);
  }
};

const saveSucess = (dados) => ({
  type: 'SAVE_SUCESS',
  payload: dados,
});

const atualizarTotal = () => {
  const infos = store.getState().wallet.expenses;
  const total = infos.reduce((acc, curr) => acc + curr.valorConvertido, 0);
  return ({
    type: 'ATUALIZAR_TOTAL',
    payload: total,
  });
};

export const saveExpense = (state) => async (dispatch) => {
  dispatch(requestStarted());
  try {
    const moedas = await fetchCotacoes();
    const dados = {
      ...state,
      exchangeRates: moedas,
      cambio: moedas[state.currency].ask,
      moeda: moedas[state.currency].name,
      moedaDeConversao: 'Real',
      valorConvertido: +moedas[state.currency].ask * +state.value,
    };
    dispatch(saveSucess(dados));
    dispatch(atualizarTotal());
  } catch (error) {
    requestFailed(error);
  }
};
