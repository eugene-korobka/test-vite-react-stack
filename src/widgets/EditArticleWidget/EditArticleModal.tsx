import type { ArticleIdType } from 'sharedTypes/article.types';

import { Modal } from 'components/ModalComponents';

import { EditArticleModalContent } from './EditArticleModalContent';
import { useEditArticleModalHandlers, useIsEditArticleModalOpen } from './hooks';

type EditArticleModalProps = {
  articleId: ArticleIdType;
};

function useEditArticleModalState(props: EditArticleModalProps) {
  const { articleId } = props;

  const isModalOpen = useIsEditArticleModalOpen(articleId);

  const { beforeCloseEditArticleModal } = useEditArticleModalHandlers(articleId);

  return {
    articleId,
    isModalOpen,
    beforeCloseEditArticleModal,
  };
}

export const EditArticleModal = (props: EditArticleModalProps) => {
  const { articleId, isModalOpen, beforeCloseEditArticleModal } = useEditArticleModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseEditArticleModal}>
      <EditArticleModalContent articleId={articleId} />
    </Modal.BaseModal>
  );
};
