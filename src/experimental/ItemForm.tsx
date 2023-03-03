import React, { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import type { ItemType } from 'sharedTypes/item.types';
import { areObjectEqualsByValues } from 'src/utils/areObjectsEqualByValues';

const titleInputName = 'title';
const descriptionInputName = 'description';

export const defaultFormValues: Partial<ItemType> = {
  [titleInputName]: '',
  [descriptionInputName]: '',
};

type ItemFormProps = {
  initialValues?: Partial<ItemType>;
  onChangeValuesHandler?: (value?: any) => void;
  onSubmitHandler?: React.FormEventHandler;
};

type ItemFormRef = {
  getFormValues: () => Partial<ItemType>;
  submitItemForm: () => void;
};

function useApplyOuterRef<
  T extends {
    outerRef: React.ForwardedRef<ItemFormRef>;
    innerRef: React.RefObject<HTMLFormElement>;
    formValues: Partial<ItemType>;
  },
>({ outerRef, innerRef, formValues }: T): void {
  const getFormValues = useCallback(() => formValues, [formValues]);

  useImperativeHandle(
    outerRef,
    () => {
      return {
        getFormValues,
        submitItemForm() {
          innerRef.current?.requestSubmit();
        },
      };
    },
    [innerRef, getFormValues],
  );
}

export function useItemFormRef() {
  const itemFormRef = useRef<ItemFormRef>(null);

  return {
    itemFormRef,
    getFormValues: () => itemFormRef.current?.getFormValues(),
    submitItemForm: () => itemFormRef.current?.submitItemForm(),
  };
}

export function useItemFormOnSubmitHandler<
  T extends {
    mainCallback: Function;
    errorCallback?: Function;
    finallyCallback?: Function;
  },
>({ mainCallback, errorCallback, finallyCallback }: T) {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formdata = new FormData(event.target);

    const data = Object.fromEntries(formdata.entries());

    try {
      await mainCallback(data);
    } catch (error) {
      console.error(error);

      if (typeof errorCallback === 'function') {
        errorCallback();
      }
    } finally {
      if (typeof finallyCallback === 'function') {
        finallyCallback();
      }
    }
  };

  return {
    onSubmitHandler,
  };
}

function useInputIds() {
  return {
    titleInputId: useId(),
    descriptionInputId: useId(),
  };
}

function useItemFormState(props: ItemFormProps, outerRef: React.ForwardedRef<ItemFormRef>) {
  const { initialValues = defaultFormValues, onSubmitHandler, onChangeValuesHandler } = props;

  const [formValues, setFormValues] = useState<Partial<ItemType>>(initialValues);

  useEffect(() => {
    if (typeof onChangeValuesHandler !== 'function') {
      return;
    }

    const hasChanges = !areObjectEqualsByValues(formValues, initialValues);

    onChangeValuesHandler(hasChanges);
  }, [onChangeValuesHandler, formValues, initialValues]);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const innerFormRef = useRef<HTMLFormElement>(null);

  useApplyOuterRef({
    outerRef,
    innerRef: innerFormRef,
    formValues,
  });

  const { titleInputId, descriptionInputId } = useInputIds();

  const titleInputValue = formValues[titleInputName];
  const descriptionInputValue = formValues[descriptionInputName];

  return {
    innerFormRef,
    titleInputId,
    descriptionInputId,
    titleInputValue,
    descriptionInputValue,
    onSubmitHandler,
    onInputChange,
  };
}

export const ItemForm = forwardRef<ItemFormRef, ItemFormProps>((props, outerRef) => {
  const {
    innerFormRef,
    titleInputId,
    descriptionInputId,
    titleInputValue,
    descriptionInputValue,
    onSubmitHandler,
    onInputChange,
  } = useItemFormState(props, outerRef);

  return (
    <form ref={innerFormRef} className="w-full" onSubmit={onSubmitHandler}>
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
