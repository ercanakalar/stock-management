import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { enableMapSet } from 'immer';
import { ResponsiveProvider } from './provider/ResponsiveProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
enableMapSet();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ResponsiveProvider breakpoint={760}>
        <App />
      </ResponsiveProvider>
    </Provider>
  </React.StrictMode>
);
