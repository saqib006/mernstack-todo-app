import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Todo from './components/todo';
import {Provider} from 'react-redux';
import {store} from './store/index';
ReactDOM.render(<Provider store={store}><Todo /></Provider>, document.getElementById('root'));
registerServiceWorker();
