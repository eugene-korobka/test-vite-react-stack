import { useOwnerId } from 'src/hooks/useOwnerId';
import { EditOwnerWidget } from 'src/widgets/EditOwnerWidget/EditOwnerWidget';

export const EditOwnerViewWidget = () => {
  const ownerId = useOwnerId();

  if (!ownerId) {
    return null;
  }

  return <EditOwnerWidget ownerId={ownerId} />;
};
