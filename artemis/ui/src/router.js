import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/home.jsx';
import Contact from './contact/contact.jsx';
import Annotate from './annotate/annotate';
import Guide from './guide/guide.jsx';
import Train from './train/train.jsx';
import Predict from './predict/predict.jsx';
import Results from './results/results.jsx';

import Privacy from './privacy/privacy.jsx';

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

      <Route path="/privacy" exact component={Privacy} />
    </Switch>
  );
};

export default Body;
