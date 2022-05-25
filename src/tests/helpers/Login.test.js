import React from "react";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
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
  user: {
    name: '',
    email: '',
  }
}
describe('Testa a page Login', () => {
  test('testa se o input user e email são renderizados', () => {
    renderWithRouterAndRedux(<App />, initialState);

    const Input =  screen.getAllByRole('textbox');
    expect(Input[0] && Input[1]).toBeInTheDocument();
  })
  test('testa se existe um elemento button na página',() => {
    renderWithRouterAndRedux(<App />, initialState);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  })
  test('testa se o elemento button esta desabilitado caso os inputs não estejam preenchidos',() => {
    renderWithRouterAndRedux(<App />, initialState);

    const Input = screen.getAllByRole('textbox');
    expect(Input[0] && Input[1]).toHaveValue('');
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  })
  test('testa se o elemento button esta desabilitado caso o user não está preenchido',() => {
    renderWithRouterAndRedux(<App />, initialState);

    const Input = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(Input[0], INVALID_USER);
    expect(button).toBeDisabled();
  })
  test('testa se o elemento button esta desabilitado caso o email não está preenchido de forma correta',() => {
    renderWithRouterAndRedux(<App />, initialState);

    const Input = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_0);
    expect(button).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_1);
    expect(button).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_2);
    expect(button).toBeDisabled();

    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], INVALID_EMAIL_3);
    expect(button).toBeDisabled();
  })
  test('testa se o elemento button é habilitado após os inputs user e email serem preenchidos ',() => {
    renderWithRouterAndRedux(<App />, initialState);

    const Input = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    userEvent.type(Input[0], VALID_USER);
    userEvent.type(Input[1], VALID_EMAIL);
    expect(button).toBeEnabled();
  })
  
})