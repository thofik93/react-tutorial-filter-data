import { createSlice } from '@reduxjs/toolkit';

export const { reducer } = createSlice({
    name: 'filters',
    initialState: {
      params: {},
    },
    reducers: {
      setParams(state, { data }) {
        state.params = data;
      },
    },
  });
  
  export default reducer;