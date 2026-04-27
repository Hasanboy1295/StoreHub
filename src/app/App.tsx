import React, { useState, useEffect } from "react";

import { Switch, Route, useLocation } from "react-router-dom";

import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import AboutPage from "./screens/aboutPage";
import SignupPage from "./screens/signupPage";
import LoginPage from "./screens/loginPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth";
import useBasket from "./hooks/useBasket";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };
    const token = getCookie("accessToken");
    if (token) {
      const memberService = new MemberService();
      memberService
        .checkAuthMember()
        .then((member) => setAuthMember(member))
        .catch(() => setAuthMember(null));
    }
  }, [setAuthMember]);

  /** HANDLERS **/
  const handleSignUpClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

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
        <Route exact path="/" render={() => <HomePage onAdd={onAdd} />} />
        <Route path="/products" render={() => <ProductsPage onAdd={onAdd} />} />
        <Route path="/orders" render={() => <OrdersPage />} />
        <Route path="/about" render={() => <AboutPage />} />
        <Route path="/member-page" render={() => <UserPage />} />
        <Route path="/signup" render={() => <SignupPage />} />
        <Route path="/login" render={() => <LoginPage />} />
      </Switch>

 {/* <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/">
          <HomePage onAdd={onAdd} />
        </Route>
      </Switch> */}

      
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignUpClose}
      />
    </>
  );
}

export default App;