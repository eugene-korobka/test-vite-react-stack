import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

const selectModalDomain = createSelector(
  (state: RootState) => state,
  (state) => state.modalManager,
);

const selectModalIsOpen = createSelector(selectModalDomain, (state) => state.isOpen);

const selectModalIsOpenById = createSelector(selectModalDomain, (_, params) => params, (state, params) => {
  return state.modals[params];
});

export const modalManagerSelectors = {
  selectModalIsOpen,
  selectModalIsOpenById,
};
