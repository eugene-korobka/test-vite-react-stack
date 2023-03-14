import { useParams } from 'react-router-dom';
import { useFetchArticleByIdQuery } from 'sharedApi/fetchArticleById.api';

import { ArticleOwnersList } from './ArticleOwnersList.widget';

export const ArticleViewWidget = () => {
  const { articleId = '' } = useParams();

  const { data: articleById, isFetching: isFetchingArticleById } = useFetchArticleByIdQuery(
    { articleId },
    { skip: !articleId },
  );

  if (isFetchingArticleById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="font-bold">Title:</div>
      <div>{articleById?.title}</div>
      <div className="font-bold">Description:</div>
      <div>{articleById?.description}</div>
      <br />
      <ArticleOwnersList articleId={articleId} />
    </div>
  );
};
