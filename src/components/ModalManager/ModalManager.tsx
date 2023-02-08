import { ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { modalManagerSelectors } from "./store/modalManager.selector";
import { modalManagerActions } from "./store/modalManager.slice";

interface ModalProps {
  children?: ReactNode;
  modalId: string;
}

export const ModalRedux = (props: ModalProps) => {
  const { modalId, children } = props;

  const modalIsOpen = useAppSelector(modalManagerSelectors.selectModalIsOpenById, modalId);

  if (modalIsOpen) {
    return createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10">
        <div className="max-w-175 w-9/10 p-6 border border-solid border-gray-400 rounded-lg bg-white text-center">
          {children}
        </div>
      </div>,
      document.body,
    );
  }

  return null;
};

const useModalHandlers = ({ modalId }) => {
  const dispatch = useAppDispatch();

  const openModalById = useCallback(() => {
    dispatch(modalManagerActions.openModalById({ modalId }));
  }, [dispatch, modalId]);

  const closeModalById = useCallback(() => {
    dispatch(modalManagerActions.closeModalById({ modalId }));
  }, [dispatch, modalId]);

  return {
    openModalById,
    closeModalById,
  };
};

export const ButtonWithModalReduxV1 = () => {
  const modalId = 'ReduxModalV1';

  const { openModalById, closeModalById } = useModalHandlers({ modalId });

  return (
    <>
      <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModalById}>
        Open modal V1
      </button>
      <ModalRedux modalId={modalId}>
        <header className="relative mb-4 font-bold text-center">Redux Modal V1</header>
        <main className="mb-4">
          <div>Redux Modal V1 Body</div>
        </main>
        <footer>
          <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={closeModalById}>
            Close
          </button>
        </footer>
      </ModalRedux>
    </>
  );
};

export const ModalReduxV2 = () => {
  const modalId = 'ReduxModalV2';

  const { closeModalById } = useModalHandlers({ modalId });

  return (
    <ModalRedux modalId={modalId}>
      <header className="relative mb-4 font-bold text-center">Redux Modal V2</header>
      <main className="mb-4">
        <div>Redux Modal V2 Body</div>
      </main>
      <footer>
        <ButtonWithModalReduxV1 />
        <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={closeModalById}>
          Close
        </button>
      </footer>
    </ModalRedux>
  );
};

export const ButtonWithModalReduxV2 = () => {
  const modalId = 'ReduxModalV2';

  const { openModalById } = useModalHandlers({ modalId });

  return (
    <>
      <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModalById}>
        Open modal V2
      </button>
      <ModalReduxV2 />
    </>
  );
};

export const ModalReduxV3 = ({ modalId }) => {
  const { closeModalById } = useModalHandlers({ modalId });

  return (
    <ModalRedux modalId={modalId}>
      <header className="relative mb-4 font-bold text-center">Redux Modal V3</header>
      <main className="mb-4">
        <div>Redux Modal V3 Body</div>
      </main>
      <footer>
        <ButtonWithModalReduxV2 />
        <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={closeModalById}>
          Close
        </button>
      </footer>
    </ModalRedux>
  );
};

export const ButtonWithModalReduxV3 = () => {
  const modalId = 'ReduxModalV3';

  const { openModalById } = useModalHandlers({ modalId });

  return (
    <>
      <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModalById}>
        Open modal V3
      </button>
      <ModalReduxV3 modalId={modalId} />
    </>
  );
};
