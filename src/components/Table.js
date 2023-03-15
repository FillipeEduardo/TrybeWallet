import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletarDespesaAction, editarDespesaAction } from '../redux/actions';
import '../css/table.css';
import iconeEditar from '../img/editar.png';
import iconeApagar from '../img/apagar.png';

class Table extends Component {
  deletarDespesa = (id) => {
    const { dispatch } = this.props;
    dispatch(deletarDespesaAction(id));
  };

  editarDespesa = (id) => {
    const { dispatch } = this.props;
    dispatch(editarDespesaAction(id));
  };

  render() {
    const { despesas } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { despesas.map(
            ({ description, tag, method, value, exchangeRates, id, currency }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(+value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{(+exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {
                    ((+exchangeRates[currency].ask) * (+value)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="icone"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => { this.editarDespesa(id); } }
                  >
                    <img src={ iconeEditar } alt="editar" />
                  </button>
                  <button
                    className="icone"
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => { this.deletarDespesa(id); } }
                  >
                    <img src={ iconeApagar } alt="editar" />
                  </button>
                </td>
              </tr>
            ),
          ) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
