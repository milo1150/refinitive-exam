import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ExampleTable from './components/Question2/ExampleTable';
import ThreeColumns from './components/Question1/ThreeColumns';
function App() {
  const a = { name: 'toei' };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/table" component={ExampleTable} />
        <Route exact={true} path="/threecolumns" component={ThreeColumns} />
        <Redirect to="/table" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
