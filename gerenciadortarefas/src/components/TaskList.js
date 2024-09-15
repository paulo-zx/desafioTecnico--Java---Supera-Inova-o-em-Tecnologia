import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';  // Para gerenciar itens dentro das listas
import { getTasks, deleteTask } from '../services/api'; // Função para buscar e remover listas da API
import { Box, Typography, List, IconButton, Card, CardContent, Alert, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ taskLists, setTaskLists }) => {
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Estado para controlar o filtro

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromBackend = await getTasks();
        setTaskLists(tasksFromBackend);
      } catch (error) {
        setError("Erro ao carregar listas.");
      }
    };

    fetchTasks();
  }, [setTaskLists]);

  const handleRemoveList = async (listId) => {
    try {
      await deleteTask(listId); // Remover a lista pelo ID
      setTaskLists(taskLists.filter((list) => list.id !== listId)); // Atualizar o estado
    } catch (error) {
      setError("Erro ao remover lista.");
    }
  };

  // Função para filtrar os itens dentro das listas com base no estado de completado
  const filterItemsInList = (list) => {
    if (filter === 'completed') {
      // Mostrar apenas itens que estão completados
      return list.items.filter((item) => item.completed);
    }
    if (filter === 'pending') {
      // Mostrar apenas itens que não estão completados
      return list.items.filter((item) => !item.completed);
    }
    // Retorna todos os itens no filtro "all"
    return list.items;
  };

  // Utilizando a função de filtragem de itens e retornando listas que ainda têm itens a exibir
  const filteredTaskLists = taskLists.map((list) => ({
    ...list,
    items: filterItemsInList(list),  // Filtrar os itens de acordo com o filtro
  }));

  return (
    <Box sx={{ mt: 4, bgcolor: '#f0f0f0', minHeight: '100vh', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#333' }}>
        Lista de Tarefas
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      {/* Abas de Filtragem */}
      <Tabs 
        value={filter} 
        onChange={(e, newValue) => setFilter(newValue)} 
        sx={{ mb: 2, justifyContent: 'center', display: 'flex' }}
      >
        <Tab label="Todas" value="all" />
        <Tab label="Pendentes" value="pending" />
        <Tab label="Concluídas" value="completed" />
      </Tabs>

      {/* Renderizar listas filtradas */}
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {filteredTaskLists.map((list) => (
          <Card key={list.id} sx={{ mb: 2, width: '80%', maxWidth: 600 }}>
            <CardContent>
              {/* Exibir o nome da lista acima do botão de adicionar item */}
              <Typography variant="h6" sx={{ mb: 2, color: '#444' }}>
                {list.name}
              </Typography>

              {/* Exibir todos os itens filtrados */}
              <TaskItem
                list={list}
                taskLists={taskLists}
                setTaskLists={setTaskLists}
              />

              {/* Manter o botão de adicionar item existente visível */}
              <Box sx={{ mt: 2 }}>
                {/* Presumindo que o botão para adicionar novos itens já está presente no TaskItem */}
              </Box>

              <IconButton onClick={() => handleRemoveList(list.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
