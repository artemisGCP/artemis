import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../src/containers/home/home.jsx';
import Contact from '../src/containers/contact/contact.jsx';

const Body = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/annotate" exact>
        annotate
      </Route>
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
      <Route path="/login" exact>
        login
      </Route>
    </Switch>
  );
};

export default Body;
