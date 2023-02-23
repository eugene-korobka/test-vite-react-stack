import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { PageContainer } from 'components/PageContainer';
import { useSubscribeToRemoveItemEvent } from 'components/RemoveItemWithEvent';

import { EditItemViewWidget } from './EditItemViewWidget';
import { ItemViewWidget } from './ItemViewWidget';
import { RemoveItemViewEventWidget } from './RemoveItemViewWidget';

export const ItemViewPage = () => {
  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    navigate('/items-list');
  }, [navigate]);

  useSubscribeToRemoveItemEvent(onRemoveItem);

  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Item View Page</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link to="/items-list" className="text-blue-400">
          &lt; Back to Items list
        </Link>
        <div className='flex gap-4 items-center'>
          <EditItemViewWidget />
          <RemoveItemViewEventWidget />
        </div>
      </div>
      <ItemViewWidget />
    </PageContainer>
  );
};
