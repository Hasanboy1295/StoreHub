
import {
  
  Container,

} from "@mui/material";
import { NavLink } from "react-router-dom";
import React from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../../../css/navbar.css";

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

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogeOutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

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
              className={(isActive: boolean) => isActive ? "shop-now-link active" : "shop-now-link"}
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

      {/* Header badge */}
   

      {/* Main navbar section */}
      <Container maxWidth="lg" className="navbar-container">
        <div className="navbar-top-row">
          <div className="brand">Exclusive</div>

          <nav className="nav-links">
            <NavLink 
              to="/" 
              className={(isActive: boolean) => isActive ? "nav-link active" : "nav-link"}
            >
              Home
            </NavLink>
            <NavLink 
              to="/contact" 
              className={(isActive: boolean) => isActive ? "nav-link active" : "nav-link"}
            >
              Contact
            </NavLink>
            <NavLink 
              to="/about" 
              className={(isActive: boolean) => isActive ? "nav-link active" : "nav-link"}
            >
              About
            </NavLink>
            <NavLink 
              to="/signup" 
              className={(isActive: boolean) => isActive ? "nav-link active" : "nav-link"}
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
          </div>
        </div>
      </Container>

      {/* Sidebar + Hero section */}
      <Container maxWidth="lg" className="navbar-container-main">
        <div className="main-content-wrapper">
          {/* Left sidebar with categories */}
          <aside className="sidebar-categories">
            <div className="category-item">
              <span>Woman's Fashion</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Men's Fashion</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Electronics</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Home & Lifestyle</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Medicine</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Sports & Outdoor</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Baby's & Toys</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Groceries & Pets</span>
              <span className="arrow">&gt;</span>
            </div>
            <div className="category-item">
              <span>Health & Beauty</span>
              <span className="arrow">&gt;</span>
            </div>
          </aside>

          {/* Hero / Banner section */}
          <div className="hero-banner">
            <div className="banner-badge">Frame 560</div>
            <div className="banner-content">
              <div className="banner-left">
                <div className="banner-logo">🍎</div>
                <div className="banner-model">iPhone 14 Series</div>
                <div className="banner-title">Up to 10%<br />off Voucher</div>
                <a href="#" className="banner-link">Shop Now →</a>
              </div>
              <div className="banner-right">
                <img src="/img/iphone.png" alt="iPhone" className="banner-image" />
              </div>
            </div>
            <div className="banner-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}