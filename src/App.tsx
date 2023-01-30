import { Provider } from "react-redux";

import { MainContainer } from "components/MainContainer";

import { store } from 'store/store';

function App() {
  return (
    <Provider store={store}>
      <MainContainer>
        <h1 className="mb-4 text-2xl font-bold">React stack</h1>
      </MainContainer>
    </Provider>
  );
}

export default App;
