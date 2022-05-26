import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { getByAltText, getByRole, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'

const initialStateHeader = {
  player: {
    name: 'player name',
    score: 0,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
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
    
    const playerImg = screen.getByRole('img', {name: /Profile-Img/i})
  
    expect(playerImg).toBeInTheDocument();
    expect(playerImg).toHaveAttribute('src')  // verificar como achar valor src correto 

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    // const playerScore = screen.getByRole('', {name: score}) // seria melhor usar role do que Id, mas precisa mudar a tag no Header component
    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    // expect(playerScore).toHaveValue(0); // descobrir porque nao funciona
  })
  // test('testa se é feito a requisição para a API de perguntas',() => {

  // })
})