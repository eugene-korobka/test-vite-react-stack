import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import type { ArticleType } from 'sharedTypes/article.types';
import { descriptionInputName, titleInputName } from 'sharedTypes/constants';

import { RequiredFieldMark } from './RequiredFieldMark';

const defaultFormValues: Partial<ArticleType> = {
  [titleInputName]: '',
  [descriptionInputName]: '',
};

function useInputIds() {
  return {
    titleInputId: useId(),
    descriptionInputId: useId(),
  };
}

type ArticleHookFormPropsType = {
  formId: string;
  initialValues?: Partial<ArticleType>;
  onSubmitHandler: (data) => void;
  onFormChangeHandler?: (isDirty: boolean) => void;
};

function useArticleHookFormState(props: ArticleHookFormPropsType) {
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

export const ArticleHookForm = (props: ArticleHookFormPropsType) => {
  const { formId, onFormSubmit, register, titleInputId, descriptionInputId } = useArticleHookFormState(props);

  return (
    <form id={formId} className="w-full" onSubmit={onFormSubmit}>
      <div className="mb-4 text-center">Article Hook Form</div>
      <label htmlFor={titleInputId} className="block mb-6">
        <span className="block mb-2">
          Title <RequiredFieldMark />
        </span>
        <input
          className="block w-full p-2 border border-solid border-gray-400 rounded-md"
          id={titleInputId}
          type="text"
          autoFocus
          {...register(titleInputName, { required: true })}
        />
      </label>
      <label htmlFor={descriptionInputId} className="block mb-6">
        <span className="block mb-2">
          Description <RequiredFieldMark />
        </span>
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
