import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { getByAltText, getByRole, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'

const initialStateHeader = {
  player: {
    name: 'player name',
    score: 0,
  }
}

// afterEach(() => jest.clearAllMocks());

// const apiResponse = Promise.resolve({
//   json: () => Promise.resolve(token),
// });

// global.fetch = jest.fn(() => apiResponse);


describe('Testa a Game page e suas funcionalidades', () => {
  test('testa se existe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')    
    
    // const playerImg = screen.getByAltText(/Profile-Img/i);
    // const playerImg = screen.getByTestId('header-profile-picture')
    // const playerImg = screen.getByRole('img', {name: /Profile-Img/i})
  
    // expect(playerImg).toBeInTheDocument();
    // expect(playerImg).toHaveAttribute('src','https://www.gravatar.com/avatar/')

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    // const playerScore = screen.getByRole('', {name:})
    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    expect(playerScore).toHaveValue(0);
  })
  // test('testa se é feito a requisição para a API de perguntas',() => {

  // })
})