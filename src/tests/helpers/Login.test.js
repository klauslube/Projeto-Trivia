import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'

import {
  VALID_USER, 
  INVALID_USER,
  VALID_EMAIL, 
  INVALID_EMAIL_0, 
  INVALID_EMAIL_1, 
  INVALID_EMAIL_2,
  INVALID_EMAIL_3,
} from './constants';

const initialState = {
  player: {
    name: '',
    email: '',
  }
}


const token = {
  response_code:0,
  response_message:"Token Generated Successfully!",
  token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

afterEach(() => jest.clearAllMocks());

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(token),
});

global.fetch = jest.fn(() => apiResponse);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;


describe('Testa a page Login', () => {
  test('teste se a página é renderizada no endpoint "/"', () => {
    const {history} = renderWithRouterAndRedux(<App />, initialState, "/");
    expect(history.location.pathname).toBe('/');
  })
  test('testa se o input user e email são renderizados', () => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const Input =  screen.getAllByRole('textbox');
    expect(Input[0] && Input[1]).toBeInTheDocument();
  })
  test('testa se existe um elemento button play e settings na página',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const button = screen.getAllByRole('button');
    expect(button[0] && button[1]).toBeInTheDocument();
  })
  test('testa se o elemento button play esta inicialmente desabilitado',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const button = screen.getAllByRole('button');
    expect(button[0]).toBeDisabled();
  })
  test('testa se o elemento button play esta desabilitado caso os inputs não estejam preenchidos',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const Input = screen.getAllByRole('textbox');
    expect(Input[0] && Input[1]).toHaveValue('');
    const button = screen.getAllByRole('button');
    expect(button[0]).toBeDisabled();
  })
  test('testa se o elemento button play esta desabilitado caso o user não está preenchido',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const Input = screen.getAllByRole('textbox');
    const button = screen.getAllByRole('button');

    userEvent.type(Input[0], INVALID_USER);
    expect(button[0]).toBeDisabled();
  })
  test('testa se o elemento button play esta desabilitado caso o email não está preenchido de forma correta',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const Input = screen.getAllByRole('textbox');
    const button = screen.getAllByRole('button');

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_0);
    expect(button[0]).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_1);
    expect(button[0]).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_2);
    expect(button[0]).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_3);
    expect(button[0]).toBeDisabled();
  })
  test('testa se o elemento button play é habilitado após os inputs user e email serem preenchidos ',() => {
    renderWithRouterAndRedux(<App />, initialState, "/");

    const Input = screen.getAllByRole('textbox');
    const button = screen.getAllByRole('button');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    expect(button[0]).toBeEnabled();
  })
  test('testa se ao clicar no elemento button play o usuario é redirecionado para a página do jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/");

    const button = screen.getAllByRole('button');
    const Input = screen.getAllByRole('textbox');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    userEvent.click(button[0]);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
      
    })
     
   })
  test('testa se ao clicar no elemento button settings o usuario é redirecionado para a página de configurações', () => {
   const { history } = renderWithRouterAndRedux(<App />, initialState, "/");

    const button = screen.getAllByRole('button');
    userEvent.click(button[1]);
    expect(history.location.pathname).toBe('/settings')

  })
  // test('teste se ao clicar no button play, é feita uma requisição para a API e recebido um token', async () => {
  //   renderWithRouterAndRedux(<App />, initialState, "/");
  
  //   const button = screen.getAllByRole('button');
  //   const Input = screen.getAllByRole('textbox');
  //   userEvent.type(Input[0], VALID_USER);
  //   userEvent.type(Input[1], VALID_EMAIL);
  //   userEvent.click(button[0]);

  //   await waitFor(() => {
  //     expect(global.fetch).toBeCalled();
  //     expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
  //     expect(global.fetch).toHaveReturnedWith(token);

  //   })

  // })
  // test('teste se o token recebido da API é salvo no localStorage', () => {
  //   renderWithRouterAndRedux(<App />, initialState, "/");

  //   const button = screen.getAllByRole('button');
  //   const Input = screen.getAllByRole('textbox');
  //   userEvent.type(Input[0], VALID_USER);
  //   userEvent.type(Input[1], VALID_EMAIL);
  //   userEvent.click(button[0]);

  //   expect(localStorageMock.getItem).toHaveBeenCalledWith(token)
  // })
})