import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "../../../css/home.css";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  colors?: string[];
}

const exploreProducts: Product[] = [
  {
    id: "1",
    name: "Breed Dry Dog Food",
    price: 100,
    originalPrice: 160,
    rating: 3.5,
    reviews: 35,
    image: "/img/dogfood.jpg",
  },
  {
    id: "2",
    name: "CANON EOS DSLR Camera",
    price: 360,
    originalPrice: 500,
    rating: 4.5,
    reviews: 88,
    image: "/img/camera.png",
  },
  {
    id: "3",
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    originalPrice: 1000,
    rating: 5,
    reviews: 325,
    image: "/img/laptop.png",
  },
  {
    id: "4",
    name: "Curology Product Set",
    price: 500,
    originalPrice: 750,
    rating: 4,
    reviews: 145,
    image: "/img/crem.png",
  },
  {
    id: "5",
    name: "Kids Electric Car",
    price: 960,
    originalPrice: 1500,
    rating: 5,
    reviews: 65,
    image: "/img/car.png",
    tag: "NEW",
  },
  {
    id: "6",
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    originalPrice: 1700,
    rating: 5,
    reviews: 35,
    image: "/img/shoes.png",
    tag: "NEW",
    colors: ["#000", "#ff0000"],
  },
  {
    id: "7",
    name: "GPII Shooter USB Gamepad",
    price: 660,
    originalPrice: 1000,
    rating: 4.5,
    reviews: 54,
    image: "/img/gamepad.png",
    tag: "NEW",
  },
  {
    id: "8",
    name: "Quilted Satin Jacket",
    price: 660,
    originalPrice: 1000,
    rating: 4.5,
    reviews: 55,
    image: "/img/jacket.png",
    colors: ["#000", "#e67e22"],
  },
];

export default function ExploreProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const itemsPerView = 4;

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(
      Math.min(exploreProducts.length - itemsPerView, currentIndex + 1)
    );
  };

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const visibleProducts = exploreProducts.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="explore-products-section">
      <Container>
        <div className="explore-container">
          <div className="explore-header">
            <h2 className="explore-title">Explore Our Products</h2>
            <div className="explore-navigation">
              <button
                className="explore-arrow-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous products"
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="explore-arrow-btn"
                onClick={handleNext}
                disabled={currentIndex >= exploreProducts.length - itemsPerView}
                aria-label="Next products"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          <div className="explore-grid">
            {visibleProducts.map((product) => (
              <div key={product.id} className="explore-product-card">
                <div className="explore-product-image-wrapper">
                  {product.tag && (
                    <span className="product-tag">{product.tag}</span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="explore-product-image"
                  />

                  <button
                    className={`explore-wishlist-btn ${
                      likedProducts.has(product.id) ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(product.id)}
                    aria-label="Add to wishlist"
                  >
                    {likedProducts.has(product.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>

                  <button
                    className="explore-view-btn"
                    aria-label="View product"
                  >
                    <VisibilityIcon />
                  </button>

                  <button className="explore-add-to-cart-btn">
                    Add To Cart
                  </button>
                </div>

                <div className="explore-product-info">
                  <h3 className="explore-product-name">{product.name}</h3>

                  <div className="explore-product-price">
                    <span className="explore-current-price">
                      ${product.price}
                    </span>
                  </div>

                  <div className="explore-product-rating">
                    <div className="explore-stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="explore-review-count">
                      ({product.reviews})
                    </span>
                  </div>

                  {product.colors && (
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          className="color-option"
                          style={{ backgroundColor: color }}
                          aria-label={`Color option ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="explore-view-all-button">
            <Button className="explore-view-all-btn">View All Products</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}