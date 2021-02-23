import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../page/';

const Body = () => {
  return (
    <Switch>
      <Route path="/annotate" exact>
        annotate
      </Route>
      <Route path="/contact" exact>
        contact
      </Route>
      <Route path="/predict" exact>
        predict
      </Route>
      <Route path="/results" exact>
        results
      </Route>
      <Route path="/train" exact>
        train
      </Route>

      <Route path="/home" exact>
        <Redirect to="/" />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

export default Body;
