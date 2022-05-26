import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { getByAltText, getByRole, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'

const initialStateHeader = {
  player: {
    name: 'klaus'
  }
}


describe('Testa a Game page e suas funcionalidades', () => {
  test('testa se existe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')    
    
    // const playerImg = screen.getByAltText(/Profile-Img/i);
    // const playerImg = screen.getByTestId('header-profile-picture')
    // const playerImg = screen.getByRole('img', {name: /Profile-Img/i})
  
    // expect(playerImg).toBeInTheDocument();
    // expect(playerImg).toHaveAttribute('src','https://www.gravatar.com/avatar/')

    const playerName = screen.getByTestId('header-player-name')
    expect(playerName).toBeInTheDocument();

    // const playerScore = screen.getByRole('', {name:})
    // expect(playerScore).toBeInTheDocument();
    // expect(playerScore).toBe(0);
  })
  test('testa se é feito a requisição para a API de perguntas',() => {

  })
})