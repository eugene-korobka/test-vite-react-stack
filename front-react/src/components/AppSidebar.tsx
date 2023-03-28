import { NavLink } from 'react-router-dom';
import { AppRoutes } from 'src/routes';

const sidebarArticles = [
  {
    to: AppRoutes.home(),
    title: 'Home',
  },
  {
    to: AppRoutes.articlesList(),
    title: 'Articles',
  },
  {
    to: AppRoutes.ownersList(),
    title: 'Owners',
  },
];

function getNavLinkClassName({ isActive }) {
  return `block px-3 py-2 rounded-sm text-blue-400${isActive ? ' bg-gray-200 text-gray-700' : ''}`;
}

export const AppSidebar = () => {
  return (
    <div className="w-50 sticky top-0 p-3">
      {/* <h3 className="w-full mb-4 text-center">Sidebar</h3> */}
      <nav>
        <ul className="m-0 p-0 list-none">
          {sidebarArticles.map(({ to, title }) => (
            <li key={to}>
              <NavLink className={getNavLinkClassName} to={to}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
