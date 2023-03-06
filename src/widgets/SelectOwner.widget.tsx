import { useId } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useFetchOwnersQuery } from 'sharedApi/owners.fetch.api';
import { ownerIdInputName } from 'sharedTypes/constants';
import type { ItemType } from 'sharedTypes/item.types';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

type SelectOwnerProps = {
  register: UseFormRegister<Partial<ItemType>>;
};

export const SelectOwner = (props: SelectOwnerProps) => {
  const { register } = props;

  const { data, isFetching } = useFetchOwnersQuery();

  const hasItems = !isFetching && data?.length;

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
          {...register(ownerIdInputName, { setValueAs: (v) => Number(v) || null })}
          disabled={isFetching}
        >
          <option key={-1} value="">
            Select owner...
          </option>
          {hasItems &&
            data.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {getOwnerFullName(owner)}
              </option>
            ))}
        </select>
      )}
    </label>
  );
};
