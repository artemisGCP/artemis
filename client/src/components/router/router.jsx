import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Guide, Contact, Login, Annotate, Train, Predict, Results } from '../../containers/containers.jsx';

const Body = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/guide" exact component={Guide} />
      <Route path="/annotate" exact component={Annotate} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/train" exact component={Train} />
      <Route path="/predict" exact component={Predict} />
      <Route path="/results" exact component={Results} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Body;
