import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import ThemeBoard from "./Components/ThemeBoard";
import PostThemeForm from "./Components/PostThemeForm";

class App extends React.Component {
  render(){
    return(
      <Router>
        <Header />
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={GlobalContainer} />
            <Route path="/themes/new" component={PostThemeForm} />
            <Route path="/themes/:id" component={ThemeBoard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;