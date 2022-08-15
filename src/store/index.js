import { configureStore } from '@reduxjs/toolkit'
import users from './usersSlice';
import filters from './filtersSlice';

export default configureStore({
  reducer: {
    users,
    filters,
  },
})