import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
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
  it('Testar a exclusão de despesa', async () => {
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
    expect(await screen.findByRole('button', { name: /excluir/i })).toBeInTheDocument();
    userEvent.click(await screen.findByRole('button', { name: /excluir/i }));
  });
  it('Testar a edição da despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    userEvent.type(screen.getByRole('spinbutton'), '1');
    userEvent.type(screen.getByRole('textbox'), 'Hotdog');
    const dolar = await screen.findByRole('option', { name: /usd/i });
    const credito = screen.getByRole('option', { name: /cartão de crédito/i });
    const lazer = screen.getByRole('option', { name: /lazer/i });
    userEvent.selectOptions(screen.getByRole('combobox', { name: /moeda/i }), dolar);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /método de pagamento/i }), credito);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /tag/i }), lazer);
    const botaoAdicionar = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(botaoAdicionar.textContent).toBe('Adicionar despesa');
    userEvent.click(botaoAdicionar);
    const botaoEditar = await screen.findByRole('button', { name: /editar/i });
    expect(botaoEditar.textContent).toBe('Editar');
    userEvent.click(botaoEditar);
    const salvar = screen.getAllByRole('button', { name: /edit/i })[0];
    expect(salvar.textContent).toBe('Editar despesa');
    userEvent.type(screen.getByRole('spinbutton'), '2');
    userEvent.type(screen.getByRole('textbox'), 'carne');
    const euro = await screen.findByRole('option', { name: /eur/i });
    const dinheiro = screen.getByRole('option', { name: /dinheiro/i });
    const trabalho = screen.getByRole('option', { name: /trabalho/i });
    userEvent.selectOptions(screen.getByRole('combobox', { name: /moeda/i }), euro);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /método de pagamento/i }), dinheiro);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /tag/i }), trabalho);
    userEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
  });
});
