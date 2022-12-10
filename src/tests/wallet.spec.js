import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste da pagina "carteira"', () => {
  it('Testar se todos os campos de input e o botão aparecem ', () => {
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /moeda/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /método de pagamento/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /tag/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });
  it('Testar o preenchimento dos campos e alimentação do estado global', async () => {
    renderWithRouterAndRedux(<Wallet />);
    userEvent.type(screen.getByRole('spinbutton'), '1');
    userEvent.type(screen.getByRole('textbox'), 'Hotdog');
    const dolar = await screen.findByRole('option', { name: /usd/i });
    const credito = screen.getByRole('option', { name: /cartão de crédito/i });
    const lazer = screen.getByRole('option', { name: /lazer/i });
    userEvent.selectOptions(screen.getByRole('combobox', { name: /moeda/i }), dolar);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /método de pagamento/i }), credito);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /tag/i }), lazer);
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
  });
});
