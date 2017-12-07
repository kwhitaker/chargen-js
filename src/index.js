// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './scaffolding/app';
import registerServiceWorker from './registerServiceWorker';
import 'gutenberg-web-type/src/style/gutenberg.css';
import './index.css';

const elem: any = document.getElementById('root');
ReactDOM.render(<App />, elem);
registerServiceWorker();
