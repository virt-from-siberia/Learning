import React, { Component } from "react";
import "./App.scss";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import About from "./About/About";
import Cars from "./Cars/Cars";
import CarDetail from "./CarDetail/CarDetail";

class App extends Component {
  state = {
    isLoggedIn: false
  };

  render() {
    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName={"wfm-active"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle={{ color: "blue" }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: "/cars"
                }}
              >
                Cars
              </NavLink>
            </li>
          </ul>
        </nav>
        <div style={{ textAlign: "center" }}>
          <h3>is logged in : {!this.state.isLoggedIn ? "TRUE" : "FALSE"}</h3>
          <button
            onClick={() =>
              this.setState({
                isLoggedIn: true
              })
            }
          >
            Log In
          </button>
        </div>

        <hr />

        {/*localhost:3000*/}
        <Switch>
          <Route path="/" exact render={() => <h1>Home Page</h1>} />
          {this.state.isLoggedIn ? (
            <Route path="/about" component={About} />
          ) : null}

          <Route path="/cars/:name" component={CarDetail} />
          <Route path="/cars" component={Cars} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
