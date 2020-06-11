import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import { HashRouter, Route, Switch } from "react-router-dom";
// import Spinner from "./components/UI/Spinner/Spinner";
import Auth from "./containers/Auth/Auth";
// const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// const CheckOut = React.lazy(() => import("./containers/CheckOut/CheckOut"));

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <HashRouter basename="/">
            <Switch>
              <Route path="/checkout" component={CheckOut} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
            </Switch>
            <Route path="/" exact component={BurgerBuilder} />
          </HashRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
