import { Link } from 'react-router-dom';
import { AppRoutes } from 'src/routes';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';


export const OwnerViewPage = () => {
  return (
    <PageContainer>
      <PageHeader>Owner View Page</PageHeader>
      <div className="mb-4 flex justify-between items-center">
        <Link to={AppRoutes.ownersList()} className="text-blue-400">
          &lt; Back to Owners
        </Link>
      </div>
    </PageContainer>
  );
};
