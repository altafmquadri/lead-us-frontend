import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <div className="main-page-container">
      <Router>
        <div>
            <Navbar />
            <Switch>
              <Route path="/new" render={(routerProps) => <NewLeadContainer {...routerProps}/>}></Route> 
              <Route exact path="/" render={(routerProps) =>  <MainContainer {...routerProps}/>}></Route>
            </Switch>
          </div>
        </Router>
      </div>
  );
}

export default App;
