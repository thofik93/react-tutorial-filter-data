import { createSlice } from '@reduxjs/toolkit';
import {
  get,
} from './usersThunks';

export const { reducer } = createSlice({
    name: 'users',
    initialState: {
      data: null,
      statusData: 'idle',
    },
    reducers: {
      setData(state, data) {
        state.data = data;
      },
      setStatusData(state, data) {
        state.statusData = data;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(get.rejected, (state) => {
          state.statusData = 'failed';
        })
        .addCase(get.pending, (state) => {
          state.statusData = 'loading';
        })
        .addCase(get.fulfilled, (state, { payload }) => {
          state.data = payload.results;
          state.statusData = 'succeeded';
        })
    },
  });
  
  export default reducer;