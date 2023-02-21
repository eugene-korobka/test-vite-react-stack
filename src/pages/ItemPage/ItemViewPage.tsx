import { Link } from 'react-router-dom';

import { PageContainer } from 'components/PageContainer';

export const ItemViewPage = () => {
  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Item View Page</h2>
      <div>
        <Link to="/items-list" className='text-blue-400'>Back to Items list</Link>
      </div>
    </PageContainer>
  );
};
