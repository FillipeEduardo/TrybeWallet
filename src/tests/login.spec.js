import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_TESTE = 'teste@teste.com.br';

describe('Pagina de Login', () => {
  it('Testas se o campo de e-mail e senha aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });
  it('Testas se existe um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
  it('testar um email invalido', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), 'teste');
    userEvent.type(screen.getByPlaceholderText(/senha/i), '123456');
    expect(screen.getByRole('button', { name: /entrar/i }).disabled).toBe(true);
  });
  it('testar uma senha invalida', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), EMAIL_TESTE);
    userEvent.type(screen.getByPlaceholderText(/senha/i), '12345');
    expect(screen.getByRole('button', { name: /entrar/i }).disabled).toBe(true);
  });
  it('testar se ao clicar no botão, alimenta o estado global e redireciona para a carteira', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), EMAIL_TESTE);
    userEvent.type(screen.getByPlaceholderText(/senha/i), '123456');
    expect(screen.getByRole('button', { name: /entrar/i }).disabled).toBe(false);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(EMAIL_TESTE);
  });
});
