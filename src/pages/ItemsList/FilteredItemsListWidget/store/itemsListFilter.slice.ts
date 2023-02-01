import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const titleFilterInitialValue = 'All';

const initialState = {
  titleFilter: titleFilterInitialValue,
};

export const itemsListFilterSlice = createSlice({
  name: 'itemsListFilter',
  initialState,
  reducers: {
    setTitleFilter(state, action: PayloadAction<string>) {
      state.titleFilter = action.payload;
    },
    resetTitleFilter(state) {
      state.titleFilter = titleFilterInitialValue;
    },
  },
});

export const itemsListFilterActions = itemsListFilterSlice.actions;

export const itemsListFilterReducer = itemsListFilterSlice.reducer;
