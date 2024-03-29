import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Components
import Navbar from "./components/Navbar";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useHistory } from "react-router-dom";
import useAlan from "./components/useAlan";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  useAlan();

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
