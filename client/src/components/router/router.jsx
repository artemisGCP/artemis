import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Contact, Login, Annotate, Train } from '../../containers/containers.jsx';

const Body = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/annotate" exact component={Annotate} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/train" exact component={Train} />
      <Route path="/predict" exact>
        predict
      </Route>
      <Route path="/results" exact>
        results
      </Route>
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Body;
