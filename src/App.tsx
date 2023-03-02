import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from 'store/store';

import { appRouter } from './router';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
