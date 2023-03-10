import { useId, useRef } from 'react';
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';

import { useCreateArticleMutation } from './store/createArticle.api';

const useCreateArticleWidgetState = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal?.();
    titleInputRef.current?.focus?.();
  };

  const closeDialog = () => {
    dialogRef.current?.close?.();
  };

  const [createArticleTrigger, { isLoading }] = useCreateArticleMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    try {
      await createArticleTrigger({ data });

      closeDialog();

      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const titleInputId = useId();
  const descriptionInputId = useId();

  return {
    dialogRef,
    titleInputRef,
    titleInputId,
    descriptionInputId,
    openDialog,
    closeDialog,
    onSubmit,
    isLoading,
  };
};

export const CreateArticleWidget = () => {
  const { dialogRef, titleInputRef, titleInputId, descriptionInputId, openDialog, closeDialog, onSubmit, isLoading } =
    useCreateArticleWidgetState();

  return (
    <>
      <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openDialog}>
        New article
      </button>
      <dialog ref={dialogRef} className="fixed max-w-175 w-9/10 p-6 border border-solid border-gray-400 rounded-lg">
        <div className="mb-4 text-xl text-center font-bold">
          Create article
          <button className="absolute top-6 right-6" onClick={closeDialog}>
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <form method="dialog" onSubmit={onSubmit}>
          <label htmlFor={titleInputId} className="block mb-6">
            <span className="block mb-2">Title</span>
            <input
              ref={titleInputRef}
              className="block w-full p-2 border border-solid border-gray-400 rounded-md"
              id={titleInputId}
              name="title"
              type="text"
              required
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
              onClick={closeDialog}
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
      </dialog>
    </>
  );
};
