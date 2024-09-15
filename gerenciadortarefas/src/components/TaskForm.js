import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { createTask } from '../services/api';

const TaskForm = ({ setTaskLists, taskLists = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskLists.some(list => list.name === title.trim())) {
      return setError("Uma lista com esse título já existe.");
    }

    const newList = {
      name: title.trim(),
      description: description.trim(),
      items: [],
    };

    try {
      const createdList = await createTask(newList);
      setTaskLists(prevLists => [...prevLists, createdList]);
      setTitle('');
      setDescription('');
      setError(null);
    } catch (error) {
      setError("Erro ao criar lista. Tente novamente.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Nova Lista
      </Typography>
      <TextField
        label="Título da Lista"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descrição da Lista"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        Adicionar Lista
      </Button>
    </Box>
  );
};

export default TaskForm;
