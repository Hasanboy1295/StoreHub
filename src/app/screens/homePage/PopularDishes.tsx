import React, { useState } from "react";
import { Box, Container, Stack, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function PopularDishes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      id: 1,
      name: "Phones",
      icon: "📱",
    },
    {
      id: 2,
      name: "Computers",
      icon: "🖥️",
    },
    {
      id: 3,
      name: "SmartWatch",
      icon: "⌚",
    },
    {
      id: 4,
      name: "Camera",
      icon: "📷",
    },
    {
      id: 5,
      name: "Headphones",
      icon: "🎧",
    },
    {
      id: 6,
      name: "Gaming",
      icon: "🎮",
    },
  ];

  const itemsPerView = 6;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div className="browse-categories-frame">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="categories-header">
          <div className="categories-title">
            <div className="categories-badge">Categories</div>
            <h2>Browse By Category</h2>
          </div>

          {/* Navigation Arrows */}
          <div className="categories-navigation">
            <button
              className="category-arrow-btn prev-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="category-arrow-btn next-btn"
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {visibleCategories.map((category, index) => (
            <div
              key={category.id}
              className={`category-card ${index === 3 ? "active" : ""}`}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}