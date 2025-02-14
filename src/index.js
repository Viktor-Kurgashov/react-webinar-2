import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from "./store.js";
import items from './data.js';

const store = new Store({ items });

const root = createRoot(document.getElementById('root'));

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => root.render(<App store={store} />));

// Первый рендер (один раз)
root.render(<App store={store} />);
