import React, { useState } from "react";
import { Box, Container, Stack, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function NewDishes() {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const products = [
    {
      id: 1,
      name: "The north coat",
      price: "$260",
      originalPrice: "$360",
      rating: 88,
      image: "/img/coat.png",
    },
    {
      id: 2,
      name: "Gucci duffle bag",
      price: "$960",
      originalPrice: "$1160",
      rating: 88,
      image: "/img/gucci-bag.png",
    },
    {
      id: 3,
      name: "RGB liquid CPU Cooler",
      price: "$160",
      originalPrice: "$170",
      rating: 88,
      image: "/img/cpu-cooler.png",
    },
    {
      id: 4,
      name: "Small BookSelf",
      price: "$360",
      originalPrice: "$400",
      rating: 88,
      image: "/img/bookshelf.png",
    },
  ];

  const handleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="best-selling-frame">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="best-selling-header">
          <div className="best-selling-title">
            <div className="this-month-badge">This Month</div>
            <h2>Best Selling Products</h2>
          </div>

          <Button variant="contained" className="view-all-link-btn">
            View All
          </Button>
        </div>

        {/* Products Grid */}
        <div className="best-selling-grid">
          {products.map((product) => (
            <div key={product.id} className="best-selling-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />

                <div className="product-actions">
                  <button
                    className={`action-btn like-btn ${
                      likedProducts.includes(product.id.toString()) ? "liked" : ""
                    }`}
                    onClick={() => handleLike(product.id.toString())}
                    aria-label="like product"
                  >
                    <FavoriteBorderIcon />
                  </button>
                  <button className="action-btn view-btn" aria-label="view product">
                    <VisibilityOutlinedIcon />
                  </button>
                </div>
              </div>

              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>

                <div className="product-pricing">
                  <span className="selling-price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                </div>

                <div className="product-stars">
                  <div className="stars-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <span className="review-count">({product.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}