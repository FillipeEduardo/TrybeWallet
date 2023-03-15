import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoTrybe from '../img/logoTrybeWallet.png';
import iconeDespesa from '../img/expend.png';
import iconeEmail from '../img/email.png';
import '../css/header.css';

class Header extends Component {
  total = () => {
    const { despesas } = this.props;
    let total = 0;
    despesas.forEach((despesa) => {
      total += +despesa.value * despesa.exchangeRates[despesa.currency].ask;
    });
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <img className="logo" src={ logoTrybe } alt="LogoTrybe" />
        <div className="despesa">
          <img src={ iconeDespesa } alt="iconeDespesa" />
          <span className="texto-p">Total de despesas: </span>
          <span data-testid="total-field">{ this.total() }</span>
          <span className="brl" data-testid="header-currency-field">BRL</span>
        </div>
        <div className="email">
          <img src={ iconeEmail } alt="iconeEmail" />
          <span className="texto-p" data-testid="email-field">{email}</span>
        </div>

      </div>
    );
  }
}

Header.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.shape()),
  email: PropTypes.string,
};

Header.defaultProps = {
  email: '',
  despesas: [],
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
