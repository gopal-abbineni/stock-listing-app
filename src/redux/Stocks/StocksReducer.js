import {
    FETCH_POPULAR_STOCKS_FAILURE,
    FETCH_POPULAR_STOCKS_SUCCESS,
    FETCH_POPULAR_STOCKS_REQUEST,
    TAKE_BACKUP_STOCKS,
    RESET_STOCKS,
    SELECT_POPULAR_STOCK
} from './StocksTypes';

const initialState = {
    isLoading: false,
    popularStocks: {},
    backUppopularStocks: {},
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

        case TAKE_BACKUP_STOCKS: return {
            ...state,
            backUppopularStocks: {...state.popularStocks}
        }

        case RESET_STOCKS: return {
            ...state,
            popularStocks: {...state.backUppopularStocks},
            backUppopularStocks: {}
        }

        case SELECT_POPULAR_STOCK: return {
            ...state,
            popularStocks: {
                ...state.popularStocks,
                [action.payload.name]: {
                    ...state.popularStocks[action.payload.name],
                    isSelected: action.payload.isSeleceted
                }
            }
        }

        default: return state
    }
}

export default popularStockReducer;