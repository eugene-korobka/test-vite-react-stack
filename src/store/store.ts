import { configureStore } from '@reduxjs/toolkit';

import { itemsListFilterSlice } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { baseApi } from 'store/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [itemsListFilterSlice.name]: itemsListFilterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
