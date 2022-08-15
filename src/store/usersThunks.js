import { createAsyncThunk } from '@reduxjs/toolkit';
import { Users } from '../api/users';

export const get = createAsyncThunk(
  'users/get',
  async (params) => {
    const response = await Users.get(params);
    return response.data;
  },
);