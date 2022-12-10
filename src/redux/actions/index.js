import store from '../store';

export const saveEmailAction = (email) => ({
  type: 'SAVE_EMAIL_ACTION',
  email,
});

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

export const saveExpense = (state) => async (dispatch) => {
  try {
    const moedas = await fetchCotacoes();
    const dadosPadrao = {
      ...state,
      exchangeRates: moedas,
    };
    dispatch(saveSucess(dadosPadrao));
  } catch (error) {
    requestFailed(error);
  }
};
