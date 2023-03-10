import React, { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import type { ArticleType } from 'sharedTypes/article.types';
import { areObjectEqualsByValues } from 'src/utils/areObjectsEqualByValues';

const titleInputName = 'title';
const descriptionInputName = 'description';

export const defaultFormValues: Partial<ArticleType> = {
  [titleInputName]: '',
  [descriptionInputName]: '',
};

type ArticleFormProps = {
  initialValues?: Partial<ArticleType>;
  onChangeValuesHandler?: (value?: any) => void;
  onSubmitHandler?: React.FormEventHandler;
};

type ArticleFormRef = {
  getFormValues: () => Partial<ArticleType>;
  submitArticleForm: () => void;
};

function useApplyOuterRef<
  T extends {
    outerRef: React.ForwardedRef<ArticleFormRef>;
    innerRef: React.RefObject<HTMLFormElement>;
    formValues: Partial<ArticleType>;
  },
>({ outerRef, innerRef, formValues }: T): void {
  const getFormValues = useCallback(() => formValues, [formValues]);

  useImperativeHandle(
    outerRef,
    () => {
      return {
        getFormValues,
        submitArticleForm() {
          innerRef.current?.requestSubmit();
        },
      };
    },
    [innerRef, getFormValues],
  );
}

export function useArticleFormRef() {
  const articleFormRef = useRef<ArticleFormRef>(null);

  return {
    articleFormRef,
    getFormValues: () => articleFormRef.current?.getFormValues(),
    submitArticleForm: () => articleFormRef.current?.submitArticleForm(),
  };
}

export function useArticleFormOnSubmitHandler<
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

function useArticleFormState(props: ArticleFormProps, outerRef: React.ForwardedRef<ArticleFormRef>) {
  const { initialValues = defaultFormValues, onSubmitHandler, onChangeValuesHandler } = props;

  const [formValues, setFormValues] = useState<Partial<ArticleType>>(initialValues);

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

export const ArticleForm = forwardRef<ArticleFormRef, ArticleFormProps>((props, outerRef) => {
  const {
    innerFormRef,
    titleInputId,
    descriptionInputId,
    titleInputValue,
    descriptionInputValue,
    onSubmitHandler,
    onInputChange,
  } = useArticleFormState(props, outerRef);

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
