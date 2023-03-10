import { useFetchOwnerArticlesQuery } from 'sharedApi/fetchOwnerArticles.api';
import { OwnerIdType } from 'sharedTypes/owner.types';

import { EditOwnerArticlesWidget } from './EditOwnerArticles.widget';

type OwnerArticlesListPropsType = {
  ownerId: OwnerIdType;
};

function useOwnerArticlesListState(props: OwnerArticlesListPropsType) {
  const { ownerId } = props;

  const { data: ownerArticles, isFetching: isFetchingOwnerArticles } = useFetchOwnerArticlesQuery({ ownerId });

  const noArticles = !isFetchingOwnerArticles && !ownerArticles?.length;
  const hasArticles = !isFetchingOwnerArticles && !!ownerArticles?.length;

  return {
    ownerId,
    isFetchingOwnerArticles,
    noArticles,
    hasArticles,
    ownerArticles,
  };
}

export const OwnerArticlesList = (props: OwnerArticlesListPropsType) => {
  const { ownerId, isFetchingOwnerArticles, hasArticles, noArticles, ownerArticles } = useOwnerArticlesListState(props);

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-4 font-bold">Articles</div>
        <EditOwnerArticlesWidget ownerId={ownerId} />
      </div>

      {isFetchingOwnerArticles && <div>Loading...</div>}
      {noArticles && <div>No articles</div>}
      {hasArticles && (
        <ul>
          {ownerArticles?.map((article) => (
            <li key={article._id}>{article.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
