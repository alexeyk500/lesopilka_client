import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import './index.css';
import './variabless.css';
import AppRouter from './components/AppRouter/AppRouter';
import Header from './components/Header/Header';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <div className={'appContainer'}>
        <Header />
        <div className={'contentContainer'}>
          <AppRouter />
        </div>
      </div>
    </Provider>
  </BrowserRouter>
);
