import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';

const Backdrop = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="modal-back fixed top-0 bottom-0 left-0 right-0 p-6 overflow-hidden overscroll-contain flex justify-center items-center bg-black/10 backdrop-blur-sm">
      {children}
    </div>
  );
};

const ModalBox = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="relative max-w-175 w-9/10 max-h-full flex flex-col p-6 overflow-hidden overscroll-contain border border-solid border-gray-400 rounded-lg bg-[var(--light-bg-color)] dark:bg-[var(--dark-bg-color)]">
      {children}
    </div>
  );
};

const ConfirmModalBox = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="relative max-w-175 p-6 overflow-hidden overscroll-contain border border-solid border-gray-400 rounded-lg bg-[var(--light-bg-color)] dark:bg-[var(--dark-bg-color)]">
      {children}
    </div>
  );
};

type ModalCloseButtonProps = {
  onClick?: React.MouseEventHandler;
};

const ModalCloseButton = (props: ModalCloseButtonProps) => {
  const { onClick } = props;

  return (
    <button className="absolute top-6 right-6 translate-x-1/2 -translate-y-1/2 z-1 text-current" onClick={onClick}>
      <CloseIcon className="w-4 h-4 text-current fill-current" />
    </button>
  );
};

type ModalBaseProps = React.PropsWithChildren & {
  isOpen: boolean;
  onClose?: () => void;
  onHide?: () => void;
};

const BaseModal = (props: ModalBaseProps) => {
  const { isOpen, children, onClose, onHide } = props;

  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;

  useEffect(() => {
    if (isOpen || !onHideRef.current) {
      return;
    }

    onHideRef.current();
  }, [isOpen]);

  if (isOpen) {
    return createPortal(
      <Backdrop>
        <ModalBox>
          {children}
          <ModalCloseButton onClick={onClose} />
        </ModalBox>
      </Backdrop>,
      document.body,
    );
  }

  return null;
};

const ConfirmModal = (props: ModalBaseProps) => {
  const { isOpen, children } = props;

  if (isOpen) {
    return createPortal(
      <Backdrop>
        <ConfirmModalBox>{children}</ConfirmModalBox>
      </Backdrop>,
      document.body,
    );
  }

  return null;
};

type ModalHeaderProps = React.PropsWithChildren & {
  title?: string;
};

const Header = (props: ModalHeaderProps) => {
  const { title, children } = props;

  return (
    <header className="relative mb-4 last:mb-0">
      {title && <div className="text-xl text-center font-bold">{title}</div>}
      {children}
    </header>
  );
};

const Main = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <section className="h-full mb-4 overflow-x-hidden overflow-y-auto overscroll-contain text-start last:mb-0">
      {children}
    </section>
  );
};

const Footer = (props: React.PropsWithChildren) => {
  const { children } = props;

  return <footer className="flex justify-center items-center gap-4">{children}</footer>;
};

const Mount = (props: React.PropsWithChildren & { isOpen: boolean }) => {
  const { isOpen, children } = props;

  if (isOpen) {
    return <>{children}</>;
  }

  return null;
};

export const Modal = {
  Backdrop,
  ModalBox,
  ConfirmModalBox,
  BaseModal,
  ConfirmModal,
  Header,
  Main,
  Footer,
  Mount,
};
