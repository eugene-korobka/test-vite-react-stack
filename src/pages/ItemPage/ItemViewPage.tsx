import { Link } from 'react-router-dom';

import { PageContainer } from 'components/PageContainer';

import { ItemViewWidget } from './ItemViewWidget';
import { RemoveItemButtonWithConfirmWidget } from './RemoveItemButtonWithConfirmWidget';

export const ItemViewPage = () => {
  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Item View Page</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link to="/items-list" className="text-blue-400">
          &lt; Back to Items list
        </Link>
        <div className='flex gap-4 items-center'>
          <RemoveItemButtonWithConfirmWidget />
        </div>
      </div>
      <ItemViewWidget />
    </PageContainer>
  );
};
