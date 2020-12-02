import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './pages/App';
import News from './pages/News';
import Header from './components/Header';
import './style/index.scss';

ReactDOM.render(
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
  </Router>,
  document.getElementById('root'),
);
