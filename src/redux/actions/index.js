export const saveEmailAction = (email) => ({
  type: 'SAVE_EMAIL_ACTION',
  email,
});

const requestStarted = () => ({ type: 'REQUEST_STARTED' });

const requestSuccessful = (arrayMoedas) => ({
  type: 'REQUEST_SUCCESSFUL',
  payload: arrayMoedas,
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

export const walletReducer = () => async (dispatch) => {
  dispatch(requestStarted());
  try {
    let moedas = Object.keys(await fetchCotacoes());
    moedas = moedas.filter((m) => m !== 'USDT');
    dispatch(requestSuccessful(moedas));
  } catch (error) {
    requestFailed(error);
  }
};
