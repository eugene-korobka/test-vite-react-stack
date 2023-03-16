import { useFetchArticleOwnersQuery } from 'sharedApi/fetchArticleOwners.api';
import { ArticleIdType } from 'sharedTypes/article.types';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

import { EditArticleOwnersWidget } from './EditArticleOwners.widget';

type ArticleOwnersListPropsType = {
  articleId: ArticleIdType;
};

function useArticleOwnersListState(props: ArticleOwnersListPropsType) {
  const { articleId } = props;

  const { data: articleOwners, isFetching: isFetchingArticleOwners } = useFetchArticleOwnersQuery(
    { articleId },
    { skip: !articleId },
  );

  const noOwners = !isFetchingArticleOwners && !articleOwners?.length;
  const hasOwners = !isFetchingArticleOwners && !!articleOwners?.length;

  return {
    articleId,
    isFetchingArticleOwners,
    noOwners,
    hasOwners,
    articleOwners,
  };
}

export const ArticleOwnersList = (props: ArticleOwnersListPropsType) => {
  const { articleId, isFetchingArticleOwners, noOwners, hasOwners, articleOwners } = useArticleOwnersListState(props);

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-4 font-bold">Owners</div>
        <EditArticleOwnersWidget articleId={articleId} />
      </div>

      {isFetchingArticleOwners && <div>Loading...</div>}
      {noOwners && <div>No owners</div>}
      {hasOwners && (
        <ul>
          {articleOwners?.map((owner) => (
            <li key={owner._id}>{getOwnerFullName(owner)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
