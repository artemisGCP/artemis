import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from '../page';
import Contact from '../page/contact';

const Body = () => {
  return (
    <Switch>
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
      <Route path="/home" exact>
        <Redirect to="/" />
      </Route>
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default Body;
