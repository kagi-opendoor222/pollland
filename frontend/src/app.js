import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import ThemeBoard from "./Components/ThemeBoard";

class App extends React.Component {
  render(){
    return(
      <Router>
        <Header />
        <Route exact path="/" component={GlobalContainer} />
        <Route path="/themes/:id" component={ThemeBoard} />
      </Router>
    )
  }
}

export default App;