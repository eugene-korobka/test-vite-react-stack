import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from 'store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAppSelector<T extends (state: RootState, params: Parameters<T>[1]) => ReturnType<T>>(
  selector: T,
  params?: Parameters<T>[1],
) {
  return useReduxSelector((state) => selector(state, params));
}
