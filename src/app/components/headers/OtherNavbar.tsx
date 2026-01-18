import React, { useState } from "react";
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

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutRequest: () => void;

  // logout menu
  handleLogeOutClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseLogout?: () => void;
  anchorEl?: HTMLElement | null;
}

export default function OtherNavbar({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
  onDeleteAll,
  setSignupOpen,
  setLoginOpen,
  handleLogoutRequest,
}: OtherNavbarProps) {
  const { authMember } = useGlobals();
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleUserMenuClose = () => setAnchorEl(null);

  const goTo = (path: string) => {
    handleUserMenuClose();
    history.push(path);
  };

  const logout = () => {
    handleUserMenuClose();
    handleLogoutRequest();
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      history.push(`/products?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <NavLink to="/" className="brand-text">Exclusive</NavLink>

          <Stack direction="row" spacing={4} alignItems="center">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/products" className="nav-link">Products</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>

            {!authMember ? (
          <Button
  variant="contained"
  onClick={() => history.push("/signup")}
>
  Sign Up
</Button>

            ) : (
              <NavLink to="/orders" className="nav-link underline">Orders</NavLink>
            )}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <div className="search-box">
              <input
                placeholder="What are you looking for?"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <SearchOutlinedIcon style={{ cursor: "pointer" }} onClick={handleSearch} />
            </div>

            <FavoriteBorderIcon className="icon-btn" />

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {authMember && (
              <>
                <img
                  className="user-avatar"
                  src={authMember.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
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
                  <MenuItem onClick={logout}>
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
