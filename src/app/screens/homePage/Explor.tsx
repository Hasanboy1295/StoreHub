import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import "../../../css/home.css";

export default function Explor() {
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, days, minutes, seconds } = prev;
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
          return { hours: 0, days: 0, minutes: 0, seconds: 0 };
        }

        return { hours, days, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  const handleBuyNow = () => {
    history.push("/products");
  };

  return (
    <div className="music-experience-section">
      <Container maxWidth="lg">
        <div className="music-experience-banner">
          {/* Left Content */}
          <div className="music-experience-content">
            <span className="music-category-tag">Categories</span>
            <h2 className="music-title">
              Enhance Your<br />
             Look Phone
            </h2>

            {/* Countdown Timer */}
            <div className="music-countdown">
              <div className="music-time-box">
                <span className="music-time-value">{formatTime(timeLeft.hours)}</span>
                <span className="music-time-label">Hours</span>
              </div>
              <div className="music-time-box">
                <span className="music-time-value">{formatTime(timeLeft.days)}</span>
                <span className="music-time-label">Days</span>
              </div>
              <div className="music-time-box">
                <span className="music-time-value">{formatTime(timeLeft.minutes)}</span>
                <span className="music-time-label">Minutes</span>
              </div>
              <div className="music-time-box">
                <span className="music-time-value">{formatTime(timeLeft.seconds)}</span>
                <span className="music-time-label">Seconds</span>
              </div>
            </div>

            <Button
              className="music-buy-btn"
              variant="contained"
              onClick={handleBuyNow}
            >
              Buy Now!
            </Button>
          </div>

          {/* Right Image */}
          <div className="music-experience-image">
            <img
              src="/img/oth.jpg"
              alt="Other"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}