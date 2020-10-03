import {
    FETCH_POPULAR_STOCKS_FAILURE,
    FETCH_POPULAR_STOCKS_SUCCESS,
    FETCH_POPULAR_STOCKS_REQUEST,
    TAKE_BACKUP_STOCKS,
    RESET_STOCKS,
    SELECT_POPULAR_STOCK,
    SAVE_MY_STOCKS
} from './StocksTypes';

const initialState = {
    isLoading: false,
    popularStocks: {},
    backUppopularStocks: {},
    myStocks: [],
    error: '',
    stocksUpdatedAt: ''
}

const popularStockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POPULAR_STOCKS_SUCCESS: return {
            ...state,
            popularStocks: action.payload,
            stocksUpdatedAt: new Date().toGMTString(),
            isLoading: false
        }

        case FETCH_POPULAR_STOCKS_REQUEST: return {
            ...state,
            isLoading: true,
            error: ''
        }

        case FETCH_POPULAR_STOCKS_FAILURE: return {
            ...state,
            isLoading: false,
            error: action.payload
        }

        case SAVE_MY_STOCKS: return {
            ...state,
            myStocks: action.payload
        }
        
        default: return state
    }
}

export default popularStockReducer;