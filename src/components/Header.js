import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{ total }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.string,
};

Header.defaultProps = {
  email: '',
  total: '0',
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
