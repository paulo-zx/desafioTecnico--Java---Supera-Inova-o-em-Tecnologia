import axios from 'axios';

const API_URL = 'http://localhost:8080/api/lists';

// Função para buscar todas as listas
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar listas", error);
    throw error;
  }
};

// Função para criar uma nova lista
export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar lista", error);
    throw error;
  }
};

// Função para remover uma lista
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar lista", error);
    throw error;
  }
};

// Função para atualizar uma lista com os novos itens
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar lista", error);
    throw error;
  }
};

