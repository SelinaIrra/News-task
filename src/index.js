import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './pages/App';
import News from './pages/News';
import Header from './components/Header';
import './services/utils';
import './style/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
