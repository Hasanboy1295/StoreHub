import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

import Basket from "./Basket";
import "../../../css/navbar.css";

/* ================= PROPS ================= */

interface HomeNavbarProps {
 cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogeOutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

/* ================= COMPONENT ================= */

export default function HomeNavbar({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
  setSignupOpen,
  handleLogoutRequest,
}: HomeNavbarProps) {
  const { authMember } = useGlobals();
  const history = useHistory();

  /* USER MENU */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const goTo = (path: string) => {
    handleUserMenuClose();
    history.push(path);
  };

  const logout = () => {
    handleUserMenuClose();
    handleLogoutRequest();
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">

        {/* TOP BAR */}
        <div className="top-bar">
          <span className="top-bar-text">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </span>
          <span className="top-bar-shop">ShopNow</span>
        </div>

        {/* NAVBAR */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">

          <NavLink to="/" className="brand-text">
            Exclusive
          </NavLink>

          <Stack direction="row" spacing={4} alignItems="center">
            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/products" className="nav-link" activeClassName="active">Products</NavLink>
            <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>

            {!authMember ? (
              <Button
                variant="contained"
                onClick={() => history.push("/signup")}
              >
                Sign Up
              </Button>
            ) : (
              <NavLink to="/orders" className="nav-link" activeClassName="active">
                Orders
              </NavLink>
            )}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">

            <div className="search-box">
              <input placeholder="What are you looking for?" />
              <SearchOutlinedIcon />
            </div>
           {/* like */}

            <FavoriteBorderIcon className="icon-btn" />

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/* USER */}
            {authMember && (
              <>
                <img
                  className="user-avatar"
                  src={
                    authMember.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  onClick={handleUserMenuOpen}
                  alt="user"
                />

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{ className: "account-menu" }}
                >
                  <MenuItem onClick={() => goTo("/member-page")}>
                    <PersonOutlineIcon /> Manage My Account
                  </MenuItem>

                  <MenuItem onClick={() => goTo("/orders")}>
                    <Inventory2OutlinedIcon /> My Orders
                  </MenuItem>

                  <MenuItem onClick={() => goTo("/reviews")}>
                    <RateReviewOutlinedIcon /> My Reviews
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={logout} className="logout-item">
                    <LogoutOutlinedIcon /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
