import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../src/containers/home/home.jsx';
import Contact from '../src/containers/contact/contact.jsx';
import Login from './containers/login/login.jsx';
import Annotate from './containers/annotate/annotate.jsx';

const Body = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/annotate" exact component={Annotate} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/predict" exact>
        predict
      </Route>
      <Route path="/results" exact>
        results
      </Route>
      <Route path="/train" exact>
        train
      </Route>
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Body;
