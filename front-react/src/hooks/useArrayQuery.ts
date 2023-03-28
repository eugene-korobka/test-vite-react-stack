import { TypedUseQueryHookResult } from "@reduxjs/toolkit/dist/query/react";

const emptyArray = [];

type UseArrayQueryResultReturnType<R> = {
  data: R[];
  isFetching: boolean;
  noElements: boolean;
  hasElements: boolean;
}

export function useArrayQueryResult<R>(queryResult: TypedUseQueryHookResult<R[], any, any>): UseArrayQueryResultReturnType<R> {
  const { data = emptyArray, isFetching } = queryResult;

  const noElements = !isFetching && !data?.length;
  const hasElements = !isFetching && !!data?.length;

  return {
    data,
    isFetching,
    noElements,
    hasElements,
  };
};
