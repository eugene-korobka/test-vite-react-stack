import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppComponent, askQuestion, getAnswer, IconBiohazard, universe } from 'shared-test-eugene';

import { store } from 'store/store';

import { appRouter } from './router';

function testShared() {
  console.log('Question: ', askQuestion());

  console.log('Answer: ', getAnswer());

  console.log('Universe: ', universe);
}

function App() {
  testShared();

  return (
    <Provider store={store}>
      <AppComponent />
      <IconBiohazard />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
