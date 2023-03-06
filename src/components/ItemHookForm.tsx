import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { ItemType } from 'sharedTypes/item.types';

const titleInputName = 'title';
const descriptionInputName = 'description';

export const defaultFormValues: Partial<ItemType> = {
  [titleInputName]: '',
  [descriptionInputName]: '',
};

function useInputIds() {
  return {
    titleInputId: useId(),
    descriptionInputId: useId(),
  };
}

type ItemHookFormPropsType = {
  formId: string;
  initialValues?: Partial<ItemType>;
  onSubmitHandler: (data) => void;
  onFormChangeHandler?: (isDirty: boolean) => void;
};

function useItemHookFormState(props: ItemHookFormPropsType) {
  const { formId, initialValues = defaultFormValues, onSubmitHandler, onFormChangeHandler } = props;

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm({
    defaultValues: initialValues,
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    if (typeof onFormChangeHandler !== 'function') {
      return;
    }

    onFormChangeHandler(isDirty);
  }, [onFormChangeHandler, isDirty]);

  const onFormSubmit = handleSubmit(onSubmitHandler);

  const { titleInputId, descriptionInputId } = useInputIds();

  return {
    formId,
    onFormSubmit,
    register,
    titleInputId,
    descriptionInputId,
  };
}

export const ItemHookForm = (props: ItemHookFormPropsType) => {
  const { formId, onFormSubmit, register, titleInputId, descriptionInputId } = useItemHookFormState(props);

  return (
    <form id={formId} className="w-full" onSubmit={onFormSubmit}>
      <div className="mb-4 text-center">Item Hook Form</div>
      <label htmlFor={titleInputId} className="block mb-6">
        <span className="block mb-2">Title</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={titleInputId}
          type="text"
          autoFocus
          {...register(titleInputName, { required: true })}
        />
      </label>
      <label htmlFor={descriptionInputId} className="block mb-6">
        <span className="block mb-2">Description</span>
        <textarea
          className="block w-full p-2 border border-solid border-gray-400 rounded-md resize-none"
          id={descriptionInputId}
          rows={5}
          {...register(descriptionInputName, { required: true })}
        />
      </label>
    </form>
  );
};
