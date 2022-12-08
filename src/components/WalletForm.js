import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletReducer } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    descricao: '',
    moeda: 'USD',
    metodoPagamento: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletReducer());
  }

  handlerchange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valor, descricao, moeda, metodoPagamento, tag } = this.state;
    const { moedas } = this.props;
    return (
      <div>
        <input
          data-testid="value-input"
          onChange={ this.handlerchange }
          value={ valor }
          type="number"
          name="valor"
          id="valor"
        />
        <input
          value={ descricao }
          onChange={ this.handlerchange }
          data-testid="description-input"
          type="text"
          name="descricao"
          id="descricao"
        />
        <label htmlFor="moeda">
          Moeda
          <select
            data-testid="currency-input"
            name="moeda"
            id="moeda"
            value={ moeda }
            onChange={ this.handlerchange }
          >
            { moedas.map((m) => (
              <option key={ m } value={ m }>
                {m}
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="metodoPagamento">
          Método de Pagamento
          <select
            name="metodoPagamento"
            id="metodoPagamento"
            data-testid="method-input"
            value={ metodoPagamento }
            onChange={ this.handlerchange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handlerchange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
