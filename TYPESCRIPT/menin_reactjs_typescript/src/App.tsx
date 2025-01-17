import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";
import { TodosPage } from "./pages/TodosPage";
import { AboutPage } from "./pages/AboutPagge";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route component={TodosPage} path='/' exact />
          <Route component={AboutPage} path='/about' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
