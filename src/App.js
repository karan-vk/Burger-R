import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";
// import Spinner from "./components/UI/Spinner/Spinner";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
// const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// const CheckOut = React.lazy(() => import("./containers/CheckOut/CheckOut"));

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
          </Switch>
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
