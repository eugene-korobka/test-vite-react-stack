import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'src/routes';

import { PageContainer } from 'components/PageContainer';
import { useSubscribeToRemoveItemEvent } from 'components/RemoveItemWithEvent';

import { EditItemViewWidget } from './EditItemViewWidget';
import { ItemViewWidget } from './ItemViewWidget';
import { RemoveItemViewEventWidget } from './RemoveItemViewWidget';

export const ItemViewPage = () => {
  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    navigate(AppRoutes.itemsList());
  }, [navigate]);

  useSubscribeToRemoveItemEvent(onRemoveItem);

  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Item View Page</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link to={AppRoutes.itemsList()} className="text-blue-400">
          &lt; Back to Items list
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
