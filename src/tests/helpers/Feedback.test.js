import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'
import { tokenResponse } from "../../../cypress/mocks/token";
import { questionsResponse } from "../../../cypress/mocks/questions";
import { VALID_EMAIL, VALID_USER } from "./constants";

const initialStateHeader = {
  player: {
    name: 'player name',
    score: 0,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  },
}

const mockFetch = (url) => {
  if (url === 'https://opentdb.com/api_token.php?command=request') {
    return Promise.resolve({
      json: () => Promise.resolve(tokenResponse)
    })
  }

  if (url === (`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)) {
    return Promise.resolve({
      json: () => Promise.resolve(questionsResponse)
    })
  }

}

afterEach(() => jest.clearAllMocks());

describe('Testa a Feedback page e suas funcionalidades', () => {
  test('testa se existe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/feedback')    
  
    const playerImg = screen.getByRole('img', {  name: /profile\-img/i})
  
    expect(playerImg).toBeInTheDocument();
    expect(playerImg).toHaveAttribute('src');

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    expect(playerScore).toContainHTML(0);
  })
  test('testa se é exibido a pontuação total, acertos, mensagem e botão', () => {
    const {debug} = renderWithRouterAndRedux(<App /> , initialStateHeader, '/feedback');
    
    const message = screen.getByTestId('feedback-text');
    const totalScore = screen.getByRole('heading', {  name: /sua pontuação foi de:/i});
    const totalAssertions = screen.getByRole('heading', {  name: /você acertou:/i});
    const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    expect(message).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(totalAssertions).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  })
  test('testa se é exibido a mensagem de jogo "Well Done!" caso o jogador tenha acertado 3 ou mais perguntas', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App /> , {}, '/');

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const button = screen.getAllByRole('button');
    const Input = screen.getAllByRole('textbox');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    userEvent.click(button[0]);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
      expect(global.fetch).toHaveReturned();
    })

    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)
    expect(history.location.pathname).toBe('/game');

    userEvent.click(screen.getByTestId('correct-answer'));

    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByText('40')).toHaveTextContent('40');

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByText('140')).toHaveTextContent('140');
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
  
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByTestId('header-score')).toHaveTextContent('350');
    
    expect(history.location.pathname).toBe('/feedback');
    expect(screen.getByText('Well Done!')).toBeInTheDocument();

  })
  test('testa se é exibido a mensagem de jogo "Could be Better..." caso o jogador tenha acertado menos que 3 perguntas', async () => {
    const { history } = renderWithRouterAndRedux(<App /> , {}, '/');

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const button = screen.getAllByRole('button');
    const Input = screen.getAllByRole('textbox');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    userEvent.click(button[0]);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
      expect(global.fetch).toHaveReturned();
    })

    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)
    expect(history.location.pathname).toBe('/game');

    userEvent.click(screen.getByTestId('wrong-answer-0'));

    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByText('0')).toHaveTextContent('0');

    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByText('0')).toHaveTextContent('0');
    
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));
  
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));
    expect(screen.getByTestId('header-score')).toHaveTextContent('0');
    
    expect(history.location.pathname).toBe('/feedback');
    expect(screen.getByText('Could be better...')).toBeInTheDocument();

  })
  test('testa redirecionamento do botão play again e ranking', () => {
    const { history } = renderWithRouterAndRedux(<App /> , {}, '/feedback');

    const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
    history.push('/feedback');
    
    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    userEvent.click(rankingBtn);
 
    expect(history.location.pathname).toBe('/ranking');
  })
})