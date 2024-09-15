import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm'; // Importar o formulário para criar listas
import { Box, Typography } from '@mui/material';


function App() {
  const [taskLists, setTaskLists] = useState([]); // Estado que armazena as listas de tarefas

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
         bgcolor: '#33ff93 '
      }}
    >
      <Typography variant="h1">Gerenciador de Tarefas</Typography>
      <TaskForm setTaskLists={setTaskLists} /> {/* Adicionar formulário para criar listas */}
      <TaskList taskLists={taskLists} setTaskLists={setTaskLists} /> {/* Exibir as listas criadas */}
      {/* Adicione outros componentes abaixo */}
    </Box>
  );

  
}

export default App;
