import { Link } from 'react-router-dom';
import { AppRoutes } from 'src/routes';

import { PageContainer } from 'components/PageContainer';


export const OwnerViewPage = () => {
  return (
    <PageContainer>
      <h2 className="mb-4 text-xl">Owner View Page</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link to={AppRoutes.ownersList()} className="text-blue-400">
          &lt; Back to Owners
        </Link>
      </div>
    </PageContainer>
  );
};
