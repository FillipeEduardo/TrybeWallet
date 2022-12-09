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

const total = () => {
  const despesas = store.getState().wallet.expenses;
  let soma = 0;
  despesas.forEach((despesa) => {
    const valorPreenchido = +despesa.value;
    const moedaEscolhida = despesa.currency;
    let ask = 0;
    Object.keys(despesa.exchangeRates).forEach((e) => {
      if (e === moedaEscolhida) ask = +despesa.exchangeRates[e].ask;
    });
    soma += valorPreenchido * ask;
  });

  soma = soma.toFixed(2);
  return ({
    type: 'SOMA',
    payload: soma,
  });
};

export const saveExpense = (state) => async (dispatch) => {
  dispatch(requestStarted());
  try {
    const moedas = await fetchCotacoes();
    const dados = {
      ...state,
      exchangeRates: moedas,
    };
    dispatch(saveSucess(dados));
    dispatch(total());
  } catch (error) {
    requestFailed(error);
  }
};
