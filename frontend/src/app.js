import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import AgendaBoard from "./Components/AgendaBoard";
import PostAgendaForm from "./Components/PostAgendaForm";

class App extends React.Component {
  render(){
    return(
      <Router>
        <Header />
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={GlobalContainer} />
            <Route path="/agendas/new" component={PostAgendaForm} />
            <Route path="/agendas/:id" component={AgendaBoard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;