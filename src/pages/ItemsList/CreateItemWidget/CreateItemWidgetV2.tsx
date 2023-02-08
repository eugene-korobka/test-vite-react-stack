import { useId } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';

import { useAppDispatch, useAppSelector } from "store/hooks";

import { createItemSelectors } from "./store/createItem.selector";
import { createItemActions } from "./store/createItem.slice";
import { useCreateItemMutation } from "./store/items.create.api";

const CreateItemModalButton = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(createItemActions.openCreateModal());
  };

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModal}>
      New item
    </button>
  );
};

const CreateItemModal = () => {
  const dispatch = useAppDispatch();

  const isCreateModalOpen = useAppSelector(createItemSelectors.selectIsCreateModalOpen);

  const closeModal = () => {
    dispatch(createItemActions.closeCreateModal());
  };

  const [createItemFn, { isLoading }] = useCreateItemMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formdata = new FormData(event.target);

    const data = Object.fromEntries(formdata.entries());

    try {
      await createItemFn({ data });

      closeModal();

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const titleInputId = useId();
  const descriptionInputId = useId();

  if (isCreateModalOpen) {
    return createPortal(
      <div
        className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10"
      >
        <div
          className="max-w-175 w-9/10 p-6 border border-solid border-gray-400 rounded-lg bg-white text-center"
        >
          <header className="relative mb-4 text-xl text-center font-bold">
            <div>Create item</div>
            <button className="absolute top-0 right-0" onClick={closeModal}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </header>
          <main className="text-start">
            <form method="dialog" onSubmit={onSubmit}>
              <label htmlFor={titleInputId} className="block mb-6">
                <span className="block mb-2">Title</span>
                <input
                  className="block w-full p-2 border border-solid border-gray-400 rounded-md"
                  id={titleInputId}
                  name="title"
                  type="text"
                  required
                  autoFocus
                />
              </label>
              <label htmlFor={descriptionInputId} className="block mb-6">
                <span className="block mb-2">Description</span>
                <textarea
                  className="block w-full p-2 border border-solid border-gray-400 rounded-md resize-none"
                  id={descriptionInputId}
                  name="description"
                  rows={5}
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
                  type="reset"
                  value="cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  Create
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
};

export const CreateItemWidgetV2 = () => {
  return (
    <>
      <CreateItemModalButton />
      <CreateItemModal />
    </>
  );
};
