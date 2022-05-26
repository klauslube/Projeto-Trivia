import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'
import { tokenResponse } from "../../../cypress/mocks/token";

const tokenData = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

const initialStateHeader = {
  player: {
    name: 'player name',
    score: 0,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  },
}



afterEach(() => jest.clearAllMocks());

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
    expect(playerScore).toContainHTML(0); // alternativa 
  })
  test('testa se existe um token valido no local storage', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')


  const apiResponse = Promise.resolve({
    json: () => Promise.resolve(tokenResponse),
  });

  global.fetch = jest.fn(() => apiResponse);

  const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
  };

  global.localStorage = localStorageMock;

    expect(localStorageMock.setItem).toHaveBeenCalled();
    // expect(localStorageMock.getItem).toHaveBeenCalledWith(tokenResponse.token)


  })
  // test('testa se o usuario é redirecionado para a page de login caso esteja com um token invalido, e se esse token é deletado', () => {
    
  // })
  // test('testa se é feito a requisição para a API de perguntas',() => {
  //   renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')

  //   // expect(localStorageMock.getItem).toHaveBeenCalled();
  //   // expect(localStorageMock.getItem).toHaveBeenCalledWith(token.token)

  // })
  // test('testa se é exibido a categoria, texto e alternativas da pergunta',() => {

  // })
  // test('testa se apenas uma pergunta é exibida por vez', () => {

  // })
  // test('testa se existe apenas um elemento com resposta certa', () => {

  // })
  // test('testa se as alternativas são exibidas em ordem aleatória', () => {

  // })
  // test('testa se a alternativa correta fica com a cor verde ao acertar a questão, e as erradas com cor vermelha',() => {

  // })
  // test('testa se as alternativas erradas tem cor vermelha ao errar a questão, e a certa com cor verde', () => {

  // })
  // test('testa o temporizador das perguntas', () => {

  // })
})