import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import List from './Components/List';
import Create from './Components/Create';
import Edit from './Components/Edit';
import Detail from './Components/Detail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="header">
          <h1>Pet Shelter</h1>
        </div>
        <div>
          <Route exact path="/pets/create/new" component={Create} />
          <Redirect from="/" to="/pets" />
          <Route exact path="/pets" component={List} />
          <Route exact path="/pets/:_id" component={Detail} />
          <Route exact path="/pets/:_id/edit" component={Edit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
