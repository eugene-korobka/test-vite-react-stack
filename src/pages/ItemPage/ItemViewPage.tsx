import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { appEventItemRemoved } from 'sharedTypes/event.types';
import { useSubscribeToAppEvent } from 'src/hooks/useAppEvents';
import { AppRoutes } from 'src/routes';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { EditItemViewWidget } from './EditItemViewWidget';
import { ItemViewWidget } from './ItemViewWidget';
import { RemoveItemViewEventWidget } from './RemoveItemViewWidget';

export const ItemViewPage = () => {
  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    navigate(AppRoutes.itemsList());
  }, [navigate]);

  useSubscribeToAppEvent(appEventItemRemoved, onRemoveItem);

  return (
    <PageContainer>
      <PageHeader>Item View Page</PageHeader>
      <div className="mb-4 flex justify-between items-center">
        <Link to={AppRoutes.itemsList()} className="text-blue-400">
          &lt; Back to Items
        </Link>
        <div className="flex gap-4 items-center">
          <EditItemViewWidget />
          <RemoveItemViewEventWidget />
        </div>
      </div>
      <ItemViewWidget />
    </PageContainer>
  );
};
