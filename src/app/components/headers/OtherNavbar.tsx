import React from "react";
import { Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import "../../../css/navbar.css";
import { CartItem } from "../../../lib/types/search";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
  // You can use props if needed, but it's fine to leave them unused
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className="home-navbar">
      {/* Top announcement bar */}
      <div className="top-navba">
        <Container maxWidth="lg" className="top-inner">
          <div className="summ">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </div>
          <div className="top-actions">
            <NavLink
              to="/products"
              className={(isActive: boolean) =>
                isActive ? "shop-now-link active" : "shop-now-link"
              }
            >
              ShopNow
            </NavLink>
            <div className="lang">
              <div className="language">English</div>
              <div className="langsvg" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.364 12.95L17.314 8L18.728 9.414L12.364 15.778L6.00003 9.414L7.41403 8L12.364 12.95Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main navbar section */}
      <Container maxWidth="lg" className="navbar-container">
        <div className="navbar-top-row">
          <div className="brand">Exclusive</div>
          <nav className="nav-links">
            <NavLink
              to="/"
              className={(isActive: boolean) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={(isActive: boolean) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={(isActive: boolean) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/signup"
              className={(isActive: boolean) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sign Up
            </NavLink>
          </nav>
          <div className="navbar-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search-input"
              />
              <button className="search-btn" aria-label="search">
                <SearchOutlinedIcon />
              </button>
            </div>
            <button className="icon-btn" aria-label="wishlist">
              <FavoriteBorderIcon />
            </button>
            <button className="icon-btn" aria-label="cart">
              <ShoppingCartOutlinedIcon />
            </button>
            {/* Person Icon Button */}
            <button
              className="icon-btn"
              aria-label="account"
              onClick={handleMenuOpen}
              style={{ position: "relative" }}
            >
              <PersonIcon />
            </button>
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper: { className: "account-menu" }
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Manage My Account</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <AssignmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Order</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <CancelIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Cancellations</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <StarBorderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Reviews</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Container>
    </div>
  );
}





    


    