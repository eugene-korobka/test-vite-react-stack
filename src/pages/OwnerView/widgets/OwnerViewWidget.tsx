import { useParams } from 'react-router-dom';
import { useFetchOwnerByIdQuery } from 'sharedApi/fetchOwnerById.api';

// import { OwnerArticlesList } from './OwnerArticlesList.widget';

export const OwnerViewWidget = () => {
  const { ownerId = '' } = useParams();

  const { data: ownerById, isFetching: isFetchingOwnerById } = useFetchOwnerByIdQuery({ ownerId }, { skip: !ownerId });

  if (isFetchingOwnerById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="font-bold">First name:</div>
      <div>{ownerById?.firstName}</div>
      <div className="font-bold">Last name:</div>
      <div>{ownerById?.lastName}</div>
      <div className="font-bold">Email:</div>
      <div>{ownerById?.email}</div>
      <br />
      {/* <OwnerArticlesList ownerId={ownerId} /> */}
    </div>
  );
};
