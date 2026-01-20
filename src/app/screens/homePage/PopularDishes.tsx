import React, { useState } from "react";
import { Container } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useHistory } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";

export default function PopularDishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  // Map category names to ProductCollection enum values
  // Categories not in ProductCollection (Headphones, Gaming) will go to OTHER
  const categories = [
    {
      id: 1,
      name: "Phones",
      icon: "📱",
      collection: ProductCollection.PHONE,
    },
    {
      id: 2,
      name: "Computers",
      icon: "🖥️",
      collection: ProductCollection.COMPUTER,
    },
    {
      id: 3,
      name: "SmartWatch",
      icon: "⌚",
      collection: ProductCollection.SMARTWATCH,
    },
    {
      id: 4,
      name: "Camera",
      icon: "📷",
      collection: ProductCollection.CAMERA,
    },
    {
      id: 5,
      name: "Headphones",
      icon: "🎧",
      collection: ProductCollection.OTHER, // No Headphones in enum, use OTHER
    },
    {
      id: 6,
      name: "Gaming",
      icon: "🎮",
      collection: ProductCollection.OTHER, // No Gaming in enum, use OTHER
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

  // Navigate to products page with the selected category
  const handleCategoryClick = (collection: ProductCollection) => {
    history.push(`/products?collection=${collection}`);
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
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category.collection)}
              style={{ cursor: "pointer" }}
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