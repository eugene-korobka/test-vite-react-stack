import { useId } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useFetchOwnersQuery } from 'sharedApi/fetchOwners.api';
import type { ArticleType } from 'sharedTypes/article.types';
import { ownerIdInputName } from 'sharedTypes/constants';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

type SelectOwnerProps = {
  register: UseFormRegister<Partial<ArticleType>>;
};

export const SelectOwner = (props: SelectOwnerProps) => {
  const { register } = props;

  const { data, isFetching } = useFetchOwnersQuery();

  const hasArticles = !isFetching && !!data?.length;

  const isSelectVisible = !isFetching;

  const ownerInputId = useId();

  return (
    <label htmlFor={ownerInputId} className="block mb-6">
      <span className="block mb-2">Owner</span>
      {isFetching && <div className="w-full p-2 border border-solid border-gray-400 rounded-md">Loading...</div>}
      {isSelectVisible && (
        <select
          id={ownerInputId}
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          {...register(ownerIdInputName)}
          disabled={isFetching}
        >
          <option key={-1} value="">
            No owner
          </option>
          {hasArticles &&
            data.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {getOwnerFullName(owner)}
              </option>
            ))}
        </select>
      )}
    </label>
  );
};
