import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './routes/HomePage/HomePage';
import PageNotFound from './routes/PageNotFound/PageNotFound';
import { Provider } from 'react-redux';
import { Store, Action } from 'redux';

interface Props {
  store: Store<any, Action<any>>;
}

function App(props: Props) {
  const { store } = props;
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
