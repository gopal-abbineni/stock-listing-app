import {
    FETCH_POPULAR_STOCKS_FAILURE,
    FETCH_POPULAR_STOCKS_SUCCESS,
    FETCH_POPULAR_STOCKS_REQUEST,
    SAVE_MY_STOCKS
} from './StocksTypes';
import axios from 'axios';
import { IEXCloudClient } from "node-iex-cloud";

//POPULAR STOCKS RELATED ACTIONS

export const fetchPopularStocksRequest = () => {
    return {
        type: FETCH_POPULAR_STOCKS_REQUEST
    }
}

export const fetchPopularStocksSuccess = res => {
    return {
        type: FETCH_POPULAR_STOCKS_SUCCESS,
        payload: res
    }
}

export const fetchPopularStocksFailure = error => {
    return {
        type: FETCH_POPULAR_STOCKS_FAILURE,
        payload: error
    }
}

//MY STOCKS RELATED ACTIONS
export const saveMyStocks = (selectedStocks) => {
  return {
      type: SAVE_MY_STOCKS,
      payload: selectedStocks
  }
}

export const fetchpopularStocks = () => {
    return function (dispatch, getState) {
        const popularStocksSymbols = ['PEGA', 'GOOGL', 'AAPL', 'FB', 'TSLA', 'ADBE', 'AMZN', 'EBAY', 'WMT', 'COST'];
        const popularStocks = getState().popularStocks;

        const iex = new IEXCloudClient(axios, {
            sandbox: false,
            publishable: "pk_51f3f67f4cbf4bebad4af0098b2581a0 ",
            version: "stable"
        });
        dispatch(fetchPopularStocksRequest());
        iex.symbols(popularStocksSymbols.toLocaleString()).quote().then(res => {
            if (typeof(res) !== 'object'){
                dispatch(fetchPopularStocksFailure("Failed to fetch the latest stocks"));
                return;
            }
            const filteredResponseObj =  Object.keys(res).reduce((obj, key) => {
                obj[key] = {
                    symbol: res[key].quote.symbol,
                    companyName: res[key].quote.companyName,
                    latestPrice: res[key].quote.latestPrice,
                    week52High: res[key].quote.week52High,
                    week52Low: res[key].quote.week52Low,
                    // change: res[key].quote.change,
                    // changePercent: res[key].quote.changePercent
                }
                return obj;
            }, {});
            dispatch(fetchPopularStocksSuccess(filteredResponseObj));
        }).catch(err => {
            dispatch(fetchPopularStocksFailure(err));
        });
    }
}

