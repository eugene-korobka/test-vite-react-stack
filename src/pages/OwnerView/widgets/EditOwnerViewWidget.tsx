import { useOwnerId } from 'hooks/useOwnerId';
import { EditOwnerWidget } from 'widgets/EditOwnerWidget/EditOwnerWidget';

export const EditOwnerViewWidget = () => {
  const ownerId = useOwnerId();

  if (!ownerId) {
    return null;
  }

  return <EditOwnerWidget ownerId={ownerId} />;
};
