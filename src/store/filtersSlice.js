import { createSlice } from '@reduxjs/toolkit';
import { listInfoUser } from '../global-data'


export const { reducer } = createSlice({
    name: 'filters',
    initialState: {
      params: {},
      listInfoUser, 
      activeColumnSortIndex: -1,
    },
    reducers: {
      setParams(state, { data }) {
        state.params = data;
      },
      setListInfoUser(state, {data}) {
        state.listInfoUser = data;
      },
      setActiveColumnSortIndex(state, {data}) {
        state.activeColumnSortIndex = data;
      }
    },
  });
  
  export default reducer;