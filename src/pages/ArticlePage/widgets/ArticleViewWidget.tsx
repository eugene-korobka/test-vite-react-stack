import { useParams } from 'react-router-dom';
import { useFetchArticleByIdQuery } from 'sharedApi/fetchArticleById.api';
// import { useFetchOwnerByIdQuery } from 'sharedApi/fetchOwnerById.api';
// import { getOwnerFullName } from 'src/utils/getOwnerFullName';

export const ArticleViewWidget = () => {
  const { articleId } = useParams();

  const { data: articleById, isFetching: isFetchingArticleById } = useFetchArticleByIdQuery(
    { articleId: articleId as string },
    { skip: !articleId },
  );

  // const { data: ownerById, isFetching: isFetchingOwnerById } = useFetchOwnerByIdQuery(
  //   { ownerId: articleById?.ownerId as string },
  //   { skip: !articleId || !articleById?.ownerId },
  // );

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
      {/* <div className="font-bold">Owner:</div> */}
      {/* <div>{isFetchingOwnerById ? 'Loading...' : getOwnerFullName(ownerById)}</div> */}
    </div>
  );
};
