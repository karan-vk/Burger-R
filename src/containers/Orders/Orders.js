import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import withError from "../../HOC/Error/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
// const Order = React.lazy(() => import("../../components/Order/Order"));

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <div key={order.id}>
          <Order ingredient={order.ingredients} price={order.price} />
        </div>
      ));
    }
    return (
      // <Suspense fallback={<Spinner />}>
      <div>{orders}</div>
      // </Suspense>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));
