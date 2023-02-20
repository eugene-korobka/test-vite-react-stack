import { configureStore } from '@reduxjs/toolkit';

import { createItemSlice } from 'pages/ItemsList/CreateItemWidget/store/createItem.slice';
import { editItemSlice } from 'pages/ItemsList/EditItemWidget/store/editItem.slice';
import { itemsListFilterSlice } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';
import { removeItemSlice } from 'pages/ItemsList/RemoveItemButtonWidget/store/removeItem.slice';

import { modalManagerSlice } from 'components/ModalManager/store/modalManager.slice';

import { baseApi } from 'store/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalManagerSlice.name]: modalManagerSlice.reducer,
    [itemsListFilterSlice.name]: itemsListFilterSlice.reducer,
    [createItemSlice.name]: createItemSlice.reducer,
    [removeItemSlice.name]: removeItemSlice.reducer,
    [editItemSlice.name]: editItemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export function selectRootState(state: RootState) {
  return state;
}

export function selectSelectorParams(_: RootState, params) {
  return params;
}
