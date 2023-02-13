import { FilteredItemsListWidget } from 'pages/ItemsList/FilteredItemsListWidget/FilteredItemsListWidget';

// import { ButtonWithModalReduxV1, ButtonWithModalReduxV2, ButtonWithModalReduxV3 } from 'components/ModalManager/ModalManager';

export const ItemsListPage = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl">Items List Page</h2>
      {/* <div>
        <div>Modal Manager test panel</div>
        <div className='flex gap-4'>
          <ButtonWithModalReduxV1 />
          <ButtonWithModalReduxV2 />
          <ButtonWithModalReduxV3 />
        </div>
      </div> */}
      <FilteredItemsListWidget />
    </div>
  );
};
