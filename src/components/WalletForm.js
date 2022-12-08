import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    valor: '',
    descricao: '',
  };

  handlerchange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valor, descricao } = this.state;
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
      </div>
    );
  }
}

export default WalletForm;
