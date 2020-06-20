import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";
// import Spinner from "./components/UI/Spinner/Spinner";
import Logout from "./containers/Auth/Logout/Logout";
// const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// const CheckOut = React.lazy(() => import("./containers/CheckOut/CheckOut"));
import asyncComponent from "./HOC/AsyncComponent/AsyncComponent";
const asyncCheckOut = asyncComponent(() => {
  return import("./containers/CheckOut/CheckOut");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckOut} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
