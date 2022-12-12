import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import Wallet from '../pages/Wallet';
import { salvarEdicao } from '../redux/actions';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const estado = {
  value: '1',
  description: 'hotdog',
  currency: 'ARS',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 10,
};

describe('Teste da pagina "carteira"', () => {
  it('Testar se todos os campos de input e o botão aparecem ', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        mockData,
      ),
    });
    renderWithRouterAndRedux(<Wallet />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /moeda/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /método de pagamento/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /tag/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
  });
  it('Testar o preenchimento dos campos e alimentação do estado global', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        mockData,
      ),
    });
    renderWithRouterAndRedux(<Wallet />);
    userEvent.type(screen.getByRole('spinbutton'), '1');
    userEvent.type(screen.getByRole('textbox'), 'Hotdog');
    const dolar = await screen.findByRole('option', { name: /usd/i });
    const credito = screen.getByRole('option', { name: /cartão de crédito/i });
    const lazer = screen.getByRole('option', { name: /lazer/i });
    userEvent.selectOptions(screen.getByRole('combobox', { name: /moeda/i }), dolar);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /método de pagamento/i }), credito);
    userEvent.selectOptions(screen.getByRole('combobox', { name: /tag/i }), lazer);
    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    act(() => userEvent.click(addButton));
  });
  it('Testar a exclusão de despesa', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        mockData,
      ),
    });
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
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        mockData,
      ),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByRole('spinbutton');
    const descriptionInput = screen.getByRole('textbox');
    const moedaInput = screen.getByRole('combobox', { name: /moeda/i });
    const metodoPagamento = screen.getByRole('combobox', { name: /método de pagamento/i });
    const tagInput = screen.getByRole('combobox', { name: /tag/i });
    const opcaoDolar = await screen.findByRole('option', { name: /usd/i });
    const opcaoDinheiro = screen.getByRole('option', { name: /dinheiro/i });
    const opcaoLazer = screen.getByRole('option', { name: /lazer/i });

    userEvent.type(valueInput, '1');
    expect(valueInput.value).toBe('1');

    userEvent.type(descriptionInput, 'Cachorro quente');
    expect(descriptionInput.value).toBe('Cachorro quente');

    userEvent.selectOptions(moedaInput, opcaoDolar);
    expect(moedaInput.value).toBe('USD');

    userEvent.selectOptions(metodoPagamento, opcaoDinheiro);
    expect(metodoPagamento.value).toBe('Dinheiro');

    userEvent.selectOptions(tagInput, opcaoLazer);
    expect(tagInput.value).toBe('Lazer');

    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    act(() => userEvent.click(addButton));
    expect(valueInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    const btnEdit = await screen.findByTestId('edit-btn');
    expect(btnEdit.textContent).toBe('Editar');
    userEvent.click(btnEdit);
    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Coca Cola');
    expect(valueInput.value).toBe('2');
    expect(descriptionInput.value).toBe('Coca Cola');
    const btnSalvarEdicao = screen.getByRole('button', { name: /editar despesa/i });
    expect(btnSalvarEdicao.textContent).toBe('Editar despesa');
    act(() => userEvent.click(btnSalvarEdicao));
    expect(salvarEdicao(estado)).toBe('function');
  });
});
