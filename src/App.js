import "./App.css"

import { Provider } from 'react-redux';

// import Auth from "./pages/Auth/Auth";
import Routes from './pages/Routes'
import store from "./store/ReduxStore";

function App() {
  return (
    <div className="App">

      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>

      <Provider store={store}>
        <Routes />
      </Provider>

    </div>
  );
}

export default App;
