


import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "../../../css/footer.css";

export default function Footer() {
  const authMember = null;

  return (
    <footer className="footer-container">
      <Container maxWidth="lg">
        <Stack className="footer-content" direction="row" spacing={6}>
          {/* Exclusive Section */}
          <Stack className="footer-section footer-exclusive" spacing={2}>
            <h2 className="footer-title">Exclusive</h2>
            <div className="footer-subscribe">
              <p>Get 10% off your first order</p>
              <div className="subscribe-input-wrapper">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="subscribe-input"
                />
                <button className="subscribe-btn">
                  <img src="/icons/icon-send.svg" alt="submit" />
                </button>
              </div>
            </div>
          </Stack>

          {/* Support Section */}
          <Stack className="footer-section">
            <h3 className="footer-category-title">Support</h3>
            <div className="footer-category-link">
              <p>111 충주 <br /> Korea Chungju.</p>
              <p>jabborovhasan853@gmail.com</p>
              <p>+821057191295</p>
            </div>
          </Stack>

          {/* Account Section */}
          <Stack className="footer-section">
            <h3 className="footer-category-title">Account</h3>
            <Box className="footer-category-link">
              <Link to="/account">My Account</Link>
              <Link to="/login">Login / Register</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/shop">Shop</Link>
            </Box>
          </Stack>

          {/* Quick Link Section */}
          <Stack className="footer-section">
            <h3 className="footer-category-title">Quick Link</h3>
            <Box className="footer-category-link">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms Of Use</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/contact">Contact</Link>
            </Box>
          </Stack>

          {/* Download App Section */}
          <Stack className="footer-section footer-app">
            <h3 className="footer-category-title">Download App</h3>
            <p className="app-promo">Save $3 with App New User Only</p>
            <div className="qr-app-wrapper">
              <img src="/img/991387c05dd6d44594e01b675513068803e2426d.jpg" alt="QR Code" className="qr-code" />
              <Stack className="app-links" spacing={1}>
                <a href="#" className="app-store-link">
                  <img src="/img/a61d4c7110b18ab55a1e1a07ebf54a46ebb07284.png" alt="Google Play" />
                </a>
                <a href="#" className="app-store-link">
                  <img src="/img/38932d5accb54c528f9bcf326ca48ea29bd6d890.png" alt="App Store" />
                </a>
              </Stack>
            </div>
            <Stack className="social-icons" direction="row" spacing={2}>
              <a href="#" className="social-link">
                <img src="/icons/Icon-Facebook.svg" alt="facebook" />
              </a>
              <a href="#" className="social-link">
                <img src="/icons/twitter.svg" alt="twitter" />
              </a>
              <a href="#" className="social-link">
                <img src="/icons/instagram.svg" alt="instagram" />
              </a>
              <a href="#" className="social-link">
                <img src="/icons/Icon-Linkedin.svg" alt="linkedin" />
              </a>
            </Stack>
          </Stack>
        </Stack>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <Stack className="footer-copyright">
          <p>© Copyright Rimel 2025. All right reserved</p>
        </Stack>
      </Container>
    </footer>
  );
}