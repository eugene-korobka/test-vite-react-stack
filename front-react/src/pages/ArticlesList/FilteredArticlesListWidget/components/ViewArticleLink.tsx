import { Link } from 'react-router-dom';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { AppRoutes } from 'src/routes';

type ViewArticleLinkProps = {
  articleId: ArticleIdType;
};

export const ViewArticleLink = (props: ViewArticleLinkProps) => {
  const { articleId } = props;

  return (
    <Link
      to={AppRoutes.articleView({ articleId })}
      className="p-2 shrink-0 border border-solid border-blue-400 rounded-md text-blue-400"
    >
      View
    </Link>
  );
};
