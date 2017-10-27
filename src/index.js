// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './scaffolding/App';
import registerServiceWorker from './registerServiceWorker';

const elem: any = document.getElementById('root');
ReactDOM.render(<App />, elem);
registerServiceWorker();
