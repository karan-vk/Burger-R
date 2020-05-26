import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/Burgerbuilder";
// import {render}

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {" "}
          <BurgerBuilder />{" "}
        </Layout>
      </div>
    );
  }
}

export default App;
