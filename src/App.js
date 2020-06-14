import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import { Route, Switch, withRouter } from "react-router-dom";
import * as actions from "./store/actions/index";
// import Spinner from "./components/UI/Spinner/Spinner";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
// const Orders = React.lazy(() => import("./containers/Orders/Orders"));
// const CheckOut = React.lazy(() => import("./containers/CheckOut/CheckOut"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
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

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => actions.authCheckState(),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
