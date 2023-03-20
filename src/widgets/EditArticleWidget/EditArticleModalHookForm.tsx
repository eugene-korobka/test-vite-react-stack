import type { ArticleIdType } from 'sharedTypes/article.types';

import { Modal } from 'components/ModalComponents';

import { EditArticleModalContentHookForm } from './EditArticleModalContentHookForm';
import { useEditArticleModalHandlers, useIsEditArticleModalOpen } from './hooks';

type EditArticleModalHookFormProps = {
  articleId: ArticleIdType;
};

function useEditArticleModalHookFormState(props: EditArticleModalHookFormProps) {
  const { articleId } = props;

  const isModalOpen = useIsEditArticleModalOpen(articleId);

  const { beforeCloseEditArticleModal } = useEditArticleModalHandlers(articleId);

  return {
    articleId,
    isModalOpen,
    beforeCloseEditArticleModal,
  };
}

export const EditArticleModalHookForm = (props: EditArticleModalHookFormProps) => {
  const { articleId, isModalOpen, beforeCloseEditArticleModal } = useEditArticleModalHookFormState(props);

  return (
    <Modal.Mount isOpen={isModalOpen}>
      <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseEditArticleModal}>
        <EditArticleModalContentHookForm articleId={articleId} />
      </Modal.BaseModal>
    </Modal.Mount>
  );
};
