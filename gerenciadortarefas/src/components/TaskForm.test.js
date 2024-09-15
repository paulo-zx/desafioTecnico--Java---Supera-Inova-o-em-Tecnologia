
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

test('deve exibir o formulário e permitir o envio de uma nova lista', () => {
  const setTaskLists = jest.fn();  // Mock da função setTaskLists
  render(<TaskForm setTaskLists={setTaskLists} taskLists={[]} />);

  // Simular a entrada do título
  const titleInput = screen.getByLabelText(/título da lista/i);
  fireEvent.change(titleInput, { target: { value: 'Minha Nova Lista' } });

  // Simular a entrada da descrição
  const descriptionInput = screen.getByLabelText(/descrição da lista/i);
  fireEvent.change(descriptionInput, { target: { value: 'Descrição da minha nova lista' } });

  // Simular o clique no botão de adicionar lista
  const addButton = screen.getByText(/adicionar lista/i);
  fireEvent.click(addButton);

  // Verificar se a função setTaskLists foi chamada
  expect(setTaskLists).toHaveBeenCalled();

  // Verificar se setTaskLists foi chamada com uma lista contendo o título e descrição
  expect(setTaskLists).toHaveBeenCalledWith(expect.arrayContaining([
    expect.objectContaining({
      name: 'Minha Nova Lista',
      description: 'Descrição da minha nova lista',
    }),
  ]));
}); 
