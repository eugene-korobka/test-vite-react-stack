import { Link } from 'react-router-dom';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { AppRoutes } from 'src/routes';

type ViewOwnerLinkProps = {
  ownerId: OwnerIdType;
};

export const ViewOwnerLink = (props: ViewOwnerLinkProps) => {
  const { ownerId } = props;

  return (
    <Link
      to={AppRoutes.ownerView({ ownerId })}
      className="p-2 shrink-0 border border-solid border-blue-400 rounded-md text-blue-400"
    >
      View
    </Link>
  );
};
