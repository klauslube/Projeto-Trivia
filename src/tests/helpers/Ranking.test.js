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

describe('Testa a Ranking page e suas funcionalidades', () => {
  test('testa se existe as informações da pessoa jogadora no ranking', async () => {
    const {history, debug} = renderWithRouterAndRedux(<App /> , initialStateHeader, '/')    
    // JOGADOR 1
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

    // expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-next'));
    // expect(screen.getByText('40')).toHaveTextContent('40');

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    // expect(screen.getByText('140')).toHaveTextContent('140');
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
  
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    // expect(screen.getByTestId('header-score')).toHaveTextContent('350');
    
    expect(history.location.pathname).toBe('/feedback');
    // expect(screen.getByText('Well Done!')).toBeInTheDocument();

    // const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
    // userEvent.click(playAgainBtn);
    // expect(history.location.pathname).toBe('/');
    // history.push('/feedback');
    
    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');

    expect(screen.getByRole('heading', {  name: /ranking/i})).toBeInTheDocument();

    // const playerImg = screen.getByRole('img', {  name: /profile\-img/i})
    expect(screen.getByRole('img', {  name: /avatar/i})).toBeInTheDocument();
    // expect(playerImg).toBeInTheDocument();
    // expect(playerImg).toHaveAttribute('src');

    const playerName = screen.getByTestId('player-name-0');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('player-score-0');
    expect(playerScore).toBeInTheDocument();
    expect(playerScore).toContainHTML(350);

    expect(screen.getByRole('button', {name: /Home page/i})).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', {name: /Home page/i}));
    expect(history.location.pathname).toBe('/');
  

    //JOGADOR 2 

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    const button2 = screen.getAllByRole('button');
    const Input2 = screen.getAllByRole('textbox');
    userEvent.type(Input2[0], VALID_USER);
    userEvent.type(Input2[1], VALID_EMAIL);
    userEvent.click(button2[0]);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
      expect(global.fetch).toHaveReturned();
    })

    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)
    expect(history.location.pathname).toBe('/game');

    userEvent.click(screen.getByTestId('correct-answer'));

    // expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-next'));
    // expect(screen.getByText('40')).toHaveTextContent('40');

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    // expect(screen.getByText('140')).toHaveTextContent('140');
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
  
    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    
    expect(history.location.pathname).toBe('/feedback');
 
    const rankingBtn2 = screen.getByRole('button', {  name: /ranking/i});
    userEvent.click(rankingBtn2);
    expect(history.location.pathname).toBe('/ranking');

    expect(screen.getByRole('heading', {  name: /ranking/i})).toBeInTheDocument();

    expect(screen.getAllByRole('img')[1]).toBeInTheDocument();
    
    const playerName2 = screen.getByTestId('player-name-1');
    expect(playerName2).toBeInTheDocument();

    const playerScore2 = screen.getByTestId('player-score-1');
    expect(playerScore2).toBeInTheDocument();
    expect(playerScore2).toContainHTML(250);
    
    // const il = screen.getAllByRole('listitem');
    // expect(il[2]).toContainHTML(350);
    // expect(il[5]).toContainHTML(250);
    // expect(il[2]).
    // debug();
    // console.log(JSON.parse(localStorage.getItem('ranking')));
  })
  test('testa ordem do ranking', () => {
    const localStorageMock = 
      [
        {
          name: 'klauss',
          score: 150,
          picture: 'https://www.gravatar.com/avatar/a975b85afa77aa23d9d4463c5c77c6b9'
        },
        {
          name: 'Italo',
          score: 250,
          picture: 'https://www.gravatar.com/avatar/a975b85afa77aa23d9d4463c5c77c6b9'
        },
        {
          name: 'xablau',
          score: 350,
          picture: 'https://www.gravatar.com/avatar/a975b85afa77aa23d9d4463c5c77c6b9'
        }
      ]
      localStorage.clear('ranking');
      localStorage.setItem('ranking', JSON.stringify(localStorageMock));
      const {debug} = renderWithRouterAndRedux(<App /> , initialStateHeader, '/ranking');

      expect(screen.getByTestId('player-name-0')).toContainHTML('xablau');
      expect(screen.getByTestId('player-name-1')).toContainHTML('Italo');
      expect(screen.getByTestId('player-name-2')).toContainHTML('klauss');

      // debug();
  })
})