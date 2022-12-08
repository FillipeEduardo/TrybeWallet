const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL_ACTION':
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};

export default userReducer;
