import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer';


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware())));
// const makeStore = (initialState) => {
// 	return createStore(
// 		reducers,
// 		initialState,
// 		applyMiddleware(thunkMiddleware),
// 	);
// };

export default store;
