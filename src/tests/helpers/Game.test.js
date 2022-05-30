import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../../App'
import { tokenResponse, invalidTokenResponse } from "../../../cypress/mocks/token";
import { questionsResponse, invalidTokenQuestionsResponse } from "../../../cypress/mocks/questions";
import { VALID_EMAIL, VALID_USER } from "./constants";
import { toBeInTheDocument } from "@testing-library/jest-dom";


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

const mockFecthInvalid = (url) => {
  if (url === 'https://opentdb.com/api_token.php?command=request') {
    return Promise.resolve({
      json: () => Promise.resolve(invalidTokenResponse)
    })
  }

  if (url === (`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)) {
    return Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse)
    })
  }

}

afterEach(() => jest.clearAllMocks());

describe('Testa a Game page e suas funcionalidades', () => {
  test('testa se existe as informações da pessoa jogadora', () => {
    renderWithRouterAndRedux(<App /> , initialStateHeader, '/game')    
    
    const playerImg = screen.getByRole('img', {  name: /profile\-img/i})
  
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
  test('testa se é feito a requisição para a API de perguntas ', async () => {
    const {history} = renderWithRouterAndRedux(<App /> , {}, '/')
    
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
      // expect(global.fetch).toHaveReturnedWith(tokenResponse);
      expect(global.fetch).toBeCalledTimes(1);
    })

    expect(history.location.pathname).toBe('/game');
    expect(global.fetch).toBeCalledWith(`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`)
    
    // Achar como fazer o mock para verificar o token  no local storage
  
  // const localStorageMock = {
  // getItem: jest.fn(),
  // setItem: jest.fn(),
  // clear: jest.fn()
  // };

  // global.localStorage = localStorageMock;
    // expect(global.fetch).toBeCalled();
    // expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorageMock.getItem.mock.calls.length).toBe(1)
    // expect(localStorageMock.getItem).toHaveBeenCalledWith(tokenResponse.token)
  })
  test.skip('testa se o usuario é redirecionado para a page de login caso esteja com um token invalido, e se esse token é deletado', () => {
    const {history} = renderWithRouterAndRedux(<App /> ,{}, "/")  ;
    jest.spyOn(global, 'fetch').mockImplementation(mockFecthInvalid);

    const button = screen.getAllByRole('button');
    const Input = screen.getAllByRole('textbox');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    userEvent.click(button[0]);
    
    // const localStorageMock = {
    //   getItem: jest.fn(),
    //   setItem: jest.fn(),
    //   removeItem: jest.fn(),
    
      // global.localStorage = localStorageMock;
      //  expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1);
    const localStorageItem = localStorage.getItem('token');

    expect(localStorageItem).toBeNull();
    expect(history.location.pathname).toBe('/')

    })
  test('testa se é exibido a categoria, texto e alternativas da pergunta de forma correta e btn next',async () => {
    const {history, debug} = renderWithRouterAndRedux(<App /> , {},"/");

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
    history.push('/game');

    const questionCardDataId = [
      "question-text",
      "question-category",
      "answer-options",
      "correct-answer",
      'wrong-answer-0',
      'wrong-answer-1',
      'wrong-answer-2',
    ];

    
    expect(screen.getAllByTestId(questionCardDataId[0])).toHaveLength(1); // testa se mostra uma pergunta de cada vez

    const correctAnswer = screen.getByTestId('correct-answer'); 
    userEvent.click(correctAnswer);
    expect(screen.getByTestId('btn-next')).toBeInTheDocument(); // testa se ao clicar na reposta certa aparece btn next

    const wrongAnswer = screen.getByTestId('wrong-answer-0');
    userEvent.click(wrongAnswer);
    expect(screen.getByTestId('btn-next')).toBeInTheDocument(); // testa se ao clicar na reposta errada aparece btn next
    
    userEvent.click(screen.getByTestId('btn-next'));
    // debug()
    
    questionCardDataId.forEach((dataId) => {
      expect(screen.getByTestId(dataId)).toBeInTheDocument();
      expect(screen.getByTestId(dataId)).toBeEnabled();
    })
    userEvent.click(screen.getByTestId(questionCardDataId[3]));
    const btnsDisabled = screen.getAllByRole('button');
    expect(btnsDisabled[0] && btnsDisabled[1] && btnsDisabled[2] && btnsDisabled[3]).toBeDisabled();
    

  })
  // test('testa se as alternativas são exibidas em ordem aleatória', () => {

  // })
  test('testa se a alternativa correta fica com a cor verde ao acertar a questão, e as erradas com cor vermelha', async () => {
    const {history} = renderWithRouterAndRedux(<App /> , {},"/");

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
    history.push('/game');

    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer = screen.getByTestId('wrong-answer-0');
    userEvent.click(correctAnswer);
    expect(wrongAnswer).toHaveClass('redButton');
    expect(correctAnswer).toHaveClass('greenButton');
  })
  test('testa o temporizador das perguntas', async () => {
    const {history} = renderWithRouterAndRedux(<App /> , {},"/");

    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

    jest.useFakeTimers();
    // const timerMock = jest.spyOn(global, 'setInterval');

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
    history.push('/game');
    
    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer = screen.getByTestId('wrong-answer-0');

    expect(correctAnswer && wrongAnswer).toBeInTheDocument();

    const timerText = screen.getByText(/Tempo Restante/i);
    expect(timerText).toBeInTheDocument();

    expect(correctAnswer && wrongAnswer).toBeEnabled();
    jest.advanceTimersByTime(30000);
    expect(correctAnswer && wrongAnswer).toBeDisabled();


  })
    test('testa uma partida com cinco acertos', async () => {
      const {history, debug} = renderWithRouterAndRedux(<App /> , {},"/");

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
    history.push('/game');

    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer = screen.getByTestId('wrong-answer-0'); 
    
    expect(correctAnswer && wrongAnswer).toBeInTheDocument();
    userEvent.click(screen.getByTestId('correct-answer'));
    
    

    expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
    debug();
    
    })
})