import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { walletAction, saveExpense } from '../redux/actions';
import editExpense from '../tests/helpers/editExpense';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletAction());
  }

  handlerchange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handlerEditar = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const editedExpenses = editExpense(expenses, this.state, idToEdit);
    dispatch({ type: 'SALVAR_EDICAO', att: editedExpenses });
  };

  handlerClick = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(saveExpense(this.state));
    const CountId = id + 1;
    this.setState({
      id: CountId,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { moedas, editor } = this.props;
    return (
      <div>
        <input
          data-testid="value-input"
          onChange={ this.handlerchange }
          value={ value }
          type="number"
          name="value"
          id="value"
        />
        <input
          value={ description }
          onChange={ this.handlerchange }
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
        />
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handlerchange }
          >
            { moedas.map((m) => (
              <option data-testid="opcoes-moeda" key={ m } value={ m }>
                {m}
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
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
        { (editor)
          ? (
            <button
              data-testid="save-edit"
              onClick={ this.handlerEditar }
              type="button"
            >
              Editar despesa
            </button>)
          : (
            <button
              onClick={ this.handlerClick }
              type="button"
            >
              Adicionar despesa
            </button>) }
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
