import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

interface Task {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}

interface TasksState {
  tasks: Task[];
  status: 'loading' | 'error' | 'success';
}

const initialState: TasksState = {
  tasks: [],
  status: 'loading',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    const response = await axios.get('/todos');
    return response.data;
  } catch(err) {
    console.error('Ошибка в получении данных', err)
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
      state.tasks = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = 'error';
      state.tasks = [];
    });
  },
});

export default tasksSlice.reducer;