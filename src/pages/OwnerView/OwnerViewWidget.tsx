import { useParams } from "react-router-dom";
import { useFetchOwnerByIdQuery } from "sharedApi/owner.fetchById.api";

export const OwnerViewWidget = () => {
  const { ownerId: routeOwnerId } = useParams();
  const ownerId = Number(routeOwnerId);

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
    </div>
  );
};
