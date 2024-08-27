import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import emptySplitApi from './empty-slice-api';

const store = configureStore({
   reducer: rootReducer,
   devTools: true,
   middleware: gDm => gDm().concat(emptySplitApi.middleware),
});

window.store = store;

export default store;
