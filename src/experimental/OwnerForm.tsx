import React, { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import { OwnerType } from "sharedTypes/owner.types";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

const firstNameInputName = 'firstName';
const lastNameInputName = 'lastName';
const emailInputName = 'email';

export const defaultFormValues: Partial<OwnerType> = {
  [firstNameInputName]: '',
  [lastNameInputName]: '',
  [emailInputName]: '',
};

type OwnerFormProps = {
  initialValues?: Partial<OwnerType>;
  onChangeValuesHandler?: (value?: any) => void;
  onSubmitHandler?: React.FormEventHandler;
};

type OwnerFormRef = {
  getFormValues: () => Partial<OwnerType>;
  submitOwnerForm: () => void;
};

function useApplyOuterRef<T extends {
  outerRef: React.ForwardedRef<OwnerFormRef>;
  innerRef: React.RefObject<HTMLFormElement>;
  formValues: Partial<OwnerType>;
}>({ outerRef, innerRef, formValues }: T): void {
  const getFormValues = useCallback(() => formValues, [formValues]);

  useImperativeHandle(
    outerRef,
    () => {
      return {
        getFormValues,
        submitOwnerForm() {
          innerRef.current?.requestSubmit();
        },
      };
    },
    [innerRef, getFormValues],
  );
};

export function useOwnerFormRef() {
  const ownerFormRef = useRef<OwnerFormRef>(null);

  return {
    ownerFormRef,
    getFormValues: () => ownerFormRef.current?.getFormValues(),
    submitOwnerForm: () => ownerFormRef.current?.submitOwnerForm(),
  };
};

export function useOwnerFormOnSubmitHandler<T extends {
  mainCallback: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}>({
  mainCallback,
  errorCallback,
  finallyCallback,
}: T) {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    try {
      await mainCallback(data);
    } catch (error) {
      console.error(error);

      if (typeof errorCallback === 'function') {
        errorCallback();
      };
    } finally {
      if (typeof finallyCallback === 'function') {
        finallyCallback();
      }
    }
  };

  return {
    onSubmitHandler,
  };
};

function useInputIds() {
  return {
    firstNameInputId: useId(),
    lastNameInputId: useId(),
    emailInputId: useId(),
  };
};

function useOwnerFormState(props: OwnerFormProps, outerRef: React.ForwardedRef<OwnerFormRef>) {
  const { initialValues = defaultFormValues, onSubmitHandler, onChangeValuesHandler } = props;

  const [formValues, setFormValues] = useState<Partial<OwnerType>>(initialValues);

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

  const {
    firstNameInputId,
    lastNameInputId,
    emailInputId,
  } = useInputIds();

  const firstNameInputValue = formValues[firstNameInputName];
  const lastNameInputValue = formValues[lastNameInputName];
  const emailInputValue = formValues[emailInputName];

  return {
    innerFormRef,
    firstNameInputId,
    lastNameInputId,
    emailInputId,
    firstNameInputValue,
    lastNameInputValue,
    emailInputValue,
    onSubmitHandler,
    onInputChange,
  };
};

export const OwnerForm = forwardRef<OwnerFormRef, OwnerFormProps>((props, outerRef) => {
  const {
    innerFormRef,
    firstNameInputId,
    lastNameInputId,
    emailInputId,
    firstNameInputValue,
    lastNameInputValue,
    emailInputValue,
    onSubmitHandler,
    onInputChange,
  } = useOwnerFormState(props, outerRef);

  return (
    <form ref={innerFormRef} className="w-full" onSubmit={onSubmitHandler}>
      <label htmlFor={firstNameInputId} className="block mb-6">
        <span className="block mb-2">First name</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={firstNameInputId}
          name={firstNameInputName}
          type="text"
          required
          autoFocus
          value={firstNameInputValue}
          onChange={onInputChange}
        />
      </label>
      <label htmlFor={lastNameInputId} className="block mb-6">
        <span className="block mb-2">Last name</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={lastNameInputId}
          name={lastNameInputName}
          type="text"
          required
          value={lastNameInputValue}
          onChange={onInputChange}
        />
      </label>
      <label htmlFor={emailInputId} className="block mb-6">
        <span className="block mb-2">Email</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={emailInputId}
          name={emailInputName}
          type="email"
          required
          value={emailInputValue}
          onChange={onInputChange}
        />
      </label>
    </form>
  );
});
