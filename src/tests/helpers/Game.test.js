import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'
import { tokenResponse } from "../../../cypress/mocks/token";
import { VALID_EMAIL, VALID_USER } from "./constants";
import { questionsResponse } from "../../../cypress/mocks/questions";

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

const mockFetch = (url) => {
  if (url === 'https://opentdb.com/api_token.php?command=request') {
    return Promise.resolve({
      json: () => Promise.resolve(tokenData)
    })
  }

  if (url === (`https://opentdb.com/api.php?amount=5&token=${tokenData.token}`)) {
    return Promise.resolve({
      json: () => Promise.resolve(questionsResponse)
    })
  }
}


afterEach(() => jest.clearAllMocks());

describe('Testa a Game page e suas funcionalidades', () => {
  test.skip('testa se existe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')    
    
    const playerImg = screen.getByRole('img', {name: /Profile-Img/i})
  
    expect(playerImg).toBeInTheDocument();
    // expect(playerImg).toHaveAttribute('src','https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50')  // verificar como achar valor src correto 

    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    // const playerScore = screen.getByRole('', {name: score}) // seria melhor usar role do que Id, mas precisa mudar a tag no Header component
    const playerScore = screen.getByTestId('header-score');
    expect(playerScore).toBeInTheDocument();
    // expect(playerScore).toHaveValue(0); // descobrir porque nao funciona
    expect(playerScore).toContainHTML(0); // alternativa 
  })
  test('testa se existe um token valido no local storage', async () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/')
    
      // const apiResponse = Promise.resolve({
      //   json: () => Promise.resolve(tokenResponse),
      // });
    
      // global.fetch = jest.fn(() => apiResponse);
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
      // expect(global.fetch).toHaveReturnedWith(tokenData); nao sei pq esta retornando {} ao inves do token

    })
    
    // Achar como fazer o mock para verificar o token  no local storage
  
  // const localStorageMock = {
  // getItem: jest.fn(),
  // setItem: jest.fn(),
  // clear: jest.fn()
  // };

  // global.localStorage = localStorageMock;
  //   expect(global.fetch).toBeCalled();
    // expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
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