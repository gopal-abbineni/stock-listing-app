import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './NotFound';
import Home from './Home';
import Navigationbar from './Navigationbar';
import MyStocks from './MyStocks'

import { Provider } from 'react-redux';
import store from '../redux/store';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <Navigationbar />
            <div className="app">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/mystocks" component={MyStocks} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </React.Fragment>
    )
  }
}

export default App;
