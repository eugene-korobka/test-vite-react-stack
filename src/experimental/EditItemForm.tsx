import React, { forwardRef, MutableRefObject, useCallback, useId, useImperativeHandle, useRef, useState } from "react";

import { ItemType } from "store/types";

const titleInputName = 'title';
const descriptionInputName = 'description';

const defaultValues: Partial<ItemType> = {
  [titleInputName]: '',
  [descriptionInputName]: '',
};

type EditItemFormProps = {
  initialValues?: Partial<ItemType>;
  onSubmit?: React.FormEventHandler;
};

export type EditItemFormReturnedRef = {
  getFormValues: () => Partial<ItemType>;
  submitForm: () => void;
};

const useEditItemFormState = (props: EditItemFormProps, outterRef) => {
  const { initialValues = defaultValues, onSubmit } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const [formValues, setFormValues] = useState<Partial<ItemType>>(initialValues);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getFormValues = useCallback(() => formValues, [formValues]);

  useImperativeHandle(
    outterRef,
    () => {
      return {
        getFormValues,
        submitForm() {
          formRef.current?.requestSubmit();
        },
      };
    },
    [getFormValues],
  );

  const titleInputId = useId();
  const descriptionInputId = useId();

  const titleInputValue = formValues[titleInputName];
  const descriptionInputValue = formValues[descriptionInputName];

  return {
    formRef,
    titleInputId,
    descriptionInputId,
    titleInputValue,
    descriptionInputValue,
    onSubmit,
    onInputChange,
  };
};

export const EditItemForm = forwardRef<MutableRefObject<EditItemFormReturnedRef>, EditItemFormProps>((props, outterRef) => {
  const { formRef, titleInputId, descriptionInputId, titleInputValue, descriptionInputValue, onSubmit, onInputChange } =
    useEditItemFormState(props, outterRef);

  return (
    <form ref={formRef} className="w-full" onSubmit={onSubmit}>
      <label htmlFor={titleInputId} className="block mb-6">
        <span className="block mb-2">Title</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={titleInputId}
          name={titleInputName}
          type="text"
          required
          autoFocus
          value={titleInputValue}
          onChange={onInputChange}
        />
      </label>
      <label htmlFor={descriptionInputId} className="block mb-6">
        <span className="block mb-2">Description</span>
        <textarea
          className="block w-full p-2 border border-solid border-gray-400 rounded-md resize-none"
          id={descriptionInputId}
          name={descriptionInputName}
          rows={5}
          required
          value={descriptionInputValue}
          onChange={onInputChange}
        />
      </label>
    </form>
  );
});
