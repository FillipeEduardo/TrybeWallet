import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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
              </tr>
            ),
          ) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  despesas: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
