import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/auth">Auth</NavigationItem>
      <NavigationItem link="/orders" exact>
        Orders
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
