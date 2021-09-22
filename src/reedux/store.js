import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
 
 
import reducers from "./rootReducer"

// const axiosInstance = Axios.create({
//     baseURL: '/api',
//     headers: { Authorization: cookie.get('x-auth-token') || '' }
// });

 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reducers,
    
    composeEnhancers(applyMiddleware(thunk))
);