import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../src/containers/home/home.jsx';
import Contact from '../src/containers/contact/contact.jsx';
import Annotate from './containers/annotate/annotate.jsx';
import Guide from './containers/guide/guide.jsx';
import Train from './containers/train/train.jsx';
import Predict from './containers/predict/predict.jsx';
import Results from './containers/results/results.jsx';
import Login from './containers/login/login.jsx';

const Body = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" exact component={Home} />
      <Route path="/guide" exact component={Guide} />
      <Route path="/annotate" exact component={Annotate} />
      <Route path="/train" exact component={Train} />
      <Route path="/predict" exact component={Predict} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/results" exact component={Results} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Body;
