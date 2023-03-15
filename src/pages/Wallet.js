import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../css/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container-wallet">
        <div className="container-azul">
          <Table />
        </div>
        <div className="box-branco">
          <Header />
          <WalletForm />
        </div>

      </div>
    );
  }
}

export default connect()(Wallet);
