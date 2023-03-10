import { useRemoveArticleMutation } from 'sharedApi/removeArticle.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { ReactComponent as TrashIcon } from 'src/assets/trash-icon.svg';

interface RemoveArticleButtonProps {
  articleId: ArticleIdType;
}

const useRemoveArticleButtonWidgetState = (props: RemoveArticleButtonProps) => {
  const { articleId } = props;

  const [removeArticleTrigger, { isLoading }] = useRemoveArticleMutation();

  const isDisabled = !articleId || isLoading;

  const onClick = () => {
    removeArticleTrigger({ articleId }).catch((error) => {
      console.error(error);
    });
  };

  return {
    isDisabled,
    onClick,
  };
};

export const RemoveArticleButtonWidget = (props: RemoveArticleButtonProps) => {
  const { isDisabled, onClick } = useRemoveArticleButtonWidgetState(props);

  return (
    <button className="h-4 w-4 align-text-bottom" title="Remove article" disabled={isDisabled} onClick={onClick}>
      <TrashIcon />
    </button>
  );
};
