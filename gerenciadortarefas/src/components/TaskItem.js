import React, { useState } from 'react';
import { updateTask } from '../services/api';  // Importando a função para atualizar a lista no backend
import { Box, Button, TextField, IconButton, List, ListItem, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const TaskItem = ({ list, taskLists, setTaskLists }) => {
  const [newItem, setNewItem] = useState('');
  const [filter] = useState('all');

  // Função para atualizar a lista no backend
  const updateListInBackend = async (updatedList) => {
    try {
      console.log('Dados enviados para o backend:', updatedList);  // Verificando os dados antes de enviar para o backend
      await updateTask(list.id, updatedList);  // Chama o backend para atualizar a lista
    } catch (error) {
      console.error('Erro ao atualizar a lista no backend:', error);
    }
  };

  const handleAddItem = async () => {
    if (newItem.trim().length < 3) return alert("Título muito curto!");

    if (list.items && list.items.some(item => item.title === newItem.trim())) {
      return alert("Esse item já existe na lista.");
    }

    const updatedList = {
      ...list,
      items: [...(list.items || []), { id: Date.now(), title: newItem, completed: false, priority: false }]
    };

    const updatedLists = taskLists.map(l =>
      l.id === list.id ? updatedList : l
    );

    setTaskLists(updatedLists);
    setNewItem('');

    console.log('Lista atualizada após adicionar item:', updatedList);  // Verificando a lista atualizada
    await updateListInBackend(updatedList);  // Sincronizar com o backend após adicionar o item
  };

  const handleToggleComplete = async (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    };

    const updatedLists = taskLists.map(l =>
      l.id === list.id ? updatedList : l
    );

    setTaskLists(updatedLists);

    console.log('Lista atualizada após alternar completado:', updatedList);  // Verificando a lista atualizada
    await updateListInBackend(updatedList);  // Sincronizar com o backend após marcar/desmarcar completado
  };

  const handleEditItem = async (itemId, newTitle) => {
    if (newTitle.trim().length < 3) return alert("Título muito curto!");

    const updatedList = {
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, title: newTitle } : item
      )
    };

    const updatedLists = taskLists.map(l =>
      l.id === list.id ? updatedList : l
    );

    setTaskLists(updatedLists);

    console.log('Lista atualizada após editar item:', updatedList);  // Verificando a lista atualizada
    await updateListInBackend(updatedList);  // Sincronizar com o backend após editar o item
  };

  const handleRemoveItem = async (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.filter(item => item.id !== itemId)
    };

    const updatedLists = taskLists.map(l =>
      l.id === list.id ? updatedList : l
    );

    setTaskLists(updatedLists);

    console.log('Lista atualizada após remover item:', updatedList);  // Verificando a lista atualizada
    await updateListInBackend(updatedList);  // Sincronizar com o backend após remover o item
  };

  const handleTogglePriority = async (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, priority: !item.priority } : item
      )
    };

    const updatedLists = taskLists.map(l =>
      l.id === list.id ? updatedList : l
    );

    setTaskLists(updatedLists);

    console.log('Lista atualizada após alternar prioridade:', updatedList);  // Verificando a lista atualizada
    await updateListInBackend(updatedList);  // Sincronizar com o backend após alterar prioridade
  };

  const filteredItems = (list.items || []).filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'pending') return !item.completed;
    return true;
  });

  return (
    <Box>
      <TextField
        label="Novo item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button onClick={handleAddItem} variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
        Adicionar Item
      </Button>

      <List>
        {filteredItems
          .sort((a, b) => b.priority - a.priority)
          .map(item => (
            <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Checkbox
                checked={item.completed}
                onChange={() => handleToggleComplete(item.id)}
              />
              <TextField
                value={item.title}
                onChange={(e) => handleEditItem(item.id, e.target.value)}
                fullWidth
                sx={{ mx: 2 }}
              />
              <IconButton onClick={() => handleTogglePriority(item.id)}>
                {item.priority ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
              <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default TaskItem;
