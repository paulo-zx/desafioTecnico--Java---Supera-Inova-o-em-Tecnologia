
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import { deleteTask } from '../services/api'; // Mock da função deleteTask

// Mock da função de buscar tarefas da API
jest.mock('../services/api', () => ({
  getTasks: jest.fn(),
  deleteTask: jest.fn(),
}));

test('deve renderizar uma lista de tarefas', async () => {
  const taskLists = [
    { id: 1, name: 'Lista 1', items: [{ id: 1, title: 'Comprar leite', completed: false }] },
    { id: 2, name: 'Lista 2', items: [{ id: 2, title: 'Lavar o carro', completed: false }] }
  ];

  render(<TaskList taskLists={taskLists} setTaskLists={() => {}} />);
  
  // Verifica se os itens da lista estão presentes
  expect(screen.getByText(/comprar leite/i)).toBeInTheDocument();
  expect(screen.getByText(/lavar o carro/i)).toBeInTheDocument();
});

test('deve remover uma lista de tarefas ao clicar no botão de deletar', async () => {
  const taskLists = [
    { id: 1, name: 'Lista 1', items: [{ id: 1, title: 'Comprar leite', completed: false }] },
  ];
  
  const setTaskLists = jest.fn();
  deleteTask.mockResolvedValueOnce(); // Mock da função deleteTask

  render(<TaskList taskLists={taskLists} setTaskLists={setTaskLists} />);
  
  // Simula o clique no botão de deletar
  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  // Verifica se a função setTaskLists foi chamada após a remoção
  expect(setTaskLists).toHaveBeenCalledWith([]);
});
