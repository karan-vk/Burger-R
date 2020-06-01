import React, { Component, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
// import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// const CheckOut = React.lazy(() => import("./containers/CheckOut/CheckOut"));

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Suspense fallback={Spinner}>
              <Route path="/orders" component={Orders} />
            </Suspense>
          </Switch>
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;
