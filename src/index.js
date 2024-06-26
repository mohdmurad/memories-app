import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
  
import {reducers} from './reducers'
const store = createStore(reducers, compose(applyMiddleware(thunk)));


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>,
 document.getElementById('root')
 )
