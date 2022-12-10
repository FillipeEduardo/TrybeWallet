import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{ this.total() }</span>
        <span data-testid="header-currency-field">BRL</span>
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
