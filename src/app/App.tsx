import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth";
import useBasket from "./hooks/useBasket";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";
import SignupPage from "./screens/signupPage";
import LoginPage from "./screens/loginPage";
import AboutPage from "./screens/aboutPage";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();

  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleSignUpClose = () => setSignupOpen(false);
  const handleLoginpClose = () => setLoginOpen(false);

  const handleLogeOutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      sweetErrorHandling("Something went wrong!");
    }
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogeOutClick={handleLogeOutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogeOutClick={handleLogeOutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}

      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders" component={OrdersPage} />

        <Route path="/about" component={AboutPage} />

        <Route path="/member-page" component={UserPage} />

        <Route path="/signup" component={SignupPage} />

        <Route path="/login" component={LoginPage} />
      </Switch>

      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginpClose}
        handleSignupClose={handleSignUpClose}
      />
    </>
  );
}

export default App;
