import React, { Component } from "react";
import Aux from "../../HOC/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/ToolBar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  toggel = () => {
    const change = !this.state.showSideDrawer;
    this.setState({ showSideDrawer: change });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggle={this.toggel}></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
