import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { emailInputName, firstNameInputName, lastNameInputName } from 'sharedTypes/constants';
import type { OwnerType } from 'sharedTypes/owner.types';

export const defaultFormValues: Partial<OwnerType> = {
  [firstNameInputName]: '',
  [lastNameInputName]: '',
  [emailInputName]: '',
};

function useInputIds() {
  return {
    firstNameInputId: useId(),
    lastNameInputId: useId(),
    emailInputId: useId(),
  };
}

type OwnerFormPropsType = {
  formId: string;
  initialValues?: Partial<OwnerType>;
  onSubmitHandler: (data) => void;
  onFormChangeHandler?: (isDirty: boolean) => void;
  disabledFields?: string[];
};

function useOwnerHookFormState(props: OwnerFormPropsType) {
  const {
    formId,
    initialValues = defaultFormValues,
    onSubmitHandler,
    onFormChangeHandler,
    disabledFields = [],
  } = props;

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (typeof onFormChangeHandler !== 'function') {
      return;
    }

    onFormChangeHandler(isDirty);
  }, [onFormChangeHandler, isDirty]);

  const onFormSubmit = handleSubmit(onSubmitHandler);

  const { firstNameInputId, lastNameInputId, emailInputId } = useInputIds();

  const emailInputDisabled = disabledFields.includes(emailInputName);

  return {
    formId,
    onFormSubmit,
    register,
    firstNameInputId,
    lastNameInputId,
    emailInputId,
    emailInputDisabled,
  };
}

export const OwnerHookForm = (props: OwnerFormPropsType) => {
  const { formId, onFormSubmit, register, firstNameInputId, lastNameInputId, emailInputId, emailInputDisabled } =
    useOwnerHookFormState(props);

  return (
    <form id={formId} className="w-full" onSubmit={onFormSubmit}>
      <div className="mb-4 text-center">Owner Hook Form</div>
      <label htmlFor={firstNameInputId} className="block mb-6">
        <span className="block mb-2">First name</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={firstNameInputId}
          type="text"
          autoFocus
          {...register(firstNameInputName, { required: true })}
        />
      </label>
      <label htmlFor={lastNameInputId} className="block mb-6">
        <span className="block mb-2">Last name</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={lastNameInputId}
          type="text"
          {...register(lastNameInputName, { required: true })}
        />
      </label>
      <label htmlFor={emailInputId} className="block mb-6">
        <span className="block mb-2">Email</span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={emailInputId}
          type="email"
          disabled={emailInputDisabled}
          {...register(emailInputName, { required: true })}
        />
      </label>
    </form>
  );
};
