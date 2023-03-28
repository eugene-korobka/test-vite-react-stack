import { useOwnerId } from 'hooks/useOwnerId';
import { EditOwnerWidgetHookForm } from 'widgets/EditOwnerWidget/EditOwnerWidgetHookForm';

export const EditOwnerViewWidget = () => {
  const ownerId = useOwnerId();

  if (!ownerId) {
    return null;
  }

  return <EditOwnerWidgetHookForm ownerId={ownerId} />;
};
