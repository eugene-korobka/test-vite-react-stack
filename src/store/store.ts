import { configureStore } from '@reduxjs/toolkit';

import { createItemSlice } from 'pages/ItemsList/CreateItemWidget/store/createItem.slice';
import { itemsListFilterSlice } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { modalManagerSlice } from 'components/ModalManager/store/modalManager.slice';

import { baseApi } from 'store/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalManagerSlice.name]: modalManagerSlice.reducer,
    [itemsListFilterSlice.name]: itemsListFilterSlice.reducer,
    [createItemSlice.name]: createItemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
