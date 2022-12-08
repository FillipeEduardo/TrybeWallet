import React from 'react';
import { connect } from 'react-redux';
import saveEmailAction from '../redux/actions';

const SIX_DIGITS = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handlerchange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validacao = () => {
    const { email, password } = this.state;
    const validacaoSenha = (password.length < SIX_DIGITS);
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validacaoEmail = !regexEmail.test(email);
    return validacaoSenha || validacaoEmail;
  };

  handlerClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmailAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            value={ email }
            name="email"
            id="email"
            onChange={ this.handlerchange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            onChange={ this.handlerchange }
            value={ password }
            id="password"
            data-testid="password-input"
          />
          <button
            onClick={ this.handlerClick }
            disabled={ this.validacao() }
            type="button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
