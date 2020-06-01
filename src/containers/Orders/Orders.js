import React, { Component, Suspense } from "react";
// import Order from "../../components/Order/Order";
import axios from "../../axios";
import withError from "../../HOC/Error/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
const Order = React.lazy(() => import("../../components/Order/Order"));

class Orders extends Component {
  state = {
    order: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedorders = [];
        for (let key in res.data) {
          fetchedorders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, order: fetchedorders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.order.map((order) => (
          <Suspense key={order.id} fallback={<Spinner />}>
            <Order ingredient={order.ingredients} price={order.price} />
          </Suspense>
        ))}
      </div>
    );
  }
}

export default withError(Orders, axios);
