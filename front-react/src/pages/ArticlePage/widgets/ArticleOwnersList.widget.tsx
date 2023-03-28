import { useArrayQueryResult } from 'hooks/useArrayQuery';
import { useFetchArticleOwnersQuery } from 'sharedApi/fetchArticleOwners.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerType } from 'sharedTypes/owner.types';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

import { EditArticleOwnersWidget } from './EditArticleOwners.widget';

type ArticleOwnersListPropsType = {
  articleId: ArticleIdType;
};

function useArticleOwnersListState(props: ArticleOwnersListPropsType) {
  const { articleId } = props;

  const {
    data: articleOwners,
    isFetching: isFetchingArticleOwners,
    noElements: noOwners,
    hasElements: hasOwners,
  } = useArrayQueryResult<OwnerType>(useFetchArticleOwnersQuery({ articleId }, { skip: !articleId }));

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
