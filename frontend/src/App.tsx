import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import store from './store'
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <ToastContainer />
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
