import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


interface Geography {
    lat: string, 
    lng: string,
}

interface Adress  {
    street: string,
    suite: string,
    city: string,
    zipcode: string
    geo: Geography,
}

interface Company  {
    name: string,
    catchPhrase: string,
    bs: string,
}

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    adress: Adress,
    phone: string,
    website: string,
    company: Company,
}

export interface UsersState {
  users: User[];
  status: 'loading' | 'error' | 'success';
}

const initialState: UsersState = {
  users: [],
  status: 'loading',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch(err) {
        console.error('Ошибка в получении данных', err)
    }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
      state.users = [];
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'error';
      state.users = [];
    });
  },
});

export default usersSlice.reducer;