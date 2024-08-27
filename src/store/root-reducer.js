import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../store/user';
import emptySplitApi from './empty-slice-api';

const createReducer = combineReducers({
   // posts: postsSlice,
   // auth: authSlice,
   // users: usersSlice,
   user: userSlice,
   [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

const rootReducer = (state, action) => {
   if (action.type === 'RESET') {
      state = undefined;
      emptySplitApi.util.resetApiState();
   }
   return createReducer(state, action);
};

export default rootReducer;
