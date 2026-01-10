import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function Statistics() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds -= 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: "$120",
      originalPrice: "$160",
      rating: 88,
      image: "/img/gamepad.png",
      discount: "-40%",
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: "$960",
      originalPrice: "$1160",
      rating: 75,
      image: "/img/keyboard.png",
      discount: "-35%",
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: "$370",
      originalPrice: "$400",
      rating: 99,
      image: "/img/monitor.png",
      discount: "-30%",
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      price: "$375",
      originalPrice: "$400",
      rating: 99,
      image: "/img/chair.png",
      discount: "-25%",
    },
  ];

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="static-frame">
      <Container maxWidth="lg">
        {/* Flash Sales Header */}
        <div className="flash-sales-header">
          <div className="flash-sales-title">
            <div className="today-badge">Today's</div>
            <h2>Flash Sales</h2>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-timer">
            <div className="time-unit">
              <div className="time-label">Days</div>
              <div className="time-value">{formatTime(timeLeft.days)}</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-label">Hours</div>
              <div className="time-value">{formatTime(timeLeft.hours)}</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-label">Minutes</div>
              <div className="time-value">{formatTime(timeLeft.minutes)}</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-label">Seconds</div>
              <div className="time-value">{formatTime(timeLeft.seconds)}</div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="navigation-arrows">
            <button className="arrow-btn prev-btn">‹</button>
            <button className="arrow-btn next-btn">›</button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <div className="product-discount">{product.discount}</div>
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="wishlist-btn">
                  <FavoriteBorderIcon />
                </button>
                <button className="view-btn">
                  <VisibilityOutlinedIcon />
                </button>
              </div>

              <Button fullWidth className="add-to-cart-btn">
                Add To Cart
              </Button>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <span className="rating-count">({product.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="view-all-button">
          <Button variant="contained" className="view-all-btn">
            View All Products
          </Button>
        </div>
      </Container>
    </div>
  );
}