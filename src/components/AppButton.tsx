import React from "react";

type AppButtonVariant = 'default' | 'danger' | 'link';

type AppButtonProps = React.PropsWithChildren & {
  variant?: AppButtonVariant;
  onClick?: React.MouseEventHandler
};

const ButtonVariants = {
  default: 'border-gray-400',
  danger: 'border-red-400 text-red-400',
  link: 'border-blue-400 text-blue-400',
};

function useAppButtonState(props: AppButtonProps) {
  const { children, variant = 'default', onClick } = props;

  const variantClassNames = ButtonVariants[variant] || '';

  const className = [
    'p-2 shrink-0 border border-solid rounded-md disabled:opacity-50',
    variantClassNames,
  ].join(' ');

  return {
    children,
    className,
    onClick,
  };
};

export const AppButton = (props: AppButtonProps) => {
  const { children, className, onClick } = useAppButtonState(props);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
