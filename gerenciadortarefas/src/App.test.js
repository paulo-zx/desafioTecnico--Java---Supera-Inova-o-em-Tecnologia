import { render, screen } from '@testing-library/react';
import App from './App';

test('deve renderizar o título Gerenciador de Tarefas', () => {
  render(<App />);
  const titleElement = screen.getByText(/gerenciador de tarefas/i);
  expect(titleElement).toBeInTheDocument();
});
