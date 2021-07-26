import "./App.css";
import Header from "../src/components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Error from "./components/Error/Error";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import { createContext } from "react";
import React, { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App(props) {
  const [userLoggedIn, setUserLoggedIn] = useState({});
  return (
    <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route path="/*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
