import { createStore, applyMiddleware } from 'redux';
import popularStockReducer from './Stocks/StocksReducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const logger = createLogger();

const loadState = () => {
    try {
        const stringifiedState = sessionStorage.getItem('state');
        if(stringifiedState === null){
            return undefined
        }
        return JSON.parse(stringifiedState);
    } catch (error) {
        return undefined
    }
}

const saveState = (state) => {
    try {
        const stringifiedState = JSON.stringify(state);
        sessionStorage.setItem('state',stringifiedState);
    } catch (error) {
        console.log(error);
    }
}

const persistedState = loadState();
const store = createStore(popularStockReducer, persistedState, applyMiddleware(thunk, logger));

store.subscribe(()=>{
    saveState(store.getState());
})

export default store;