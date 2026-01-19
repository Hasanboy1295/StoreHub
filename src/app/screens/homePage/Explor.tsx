import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useHistory } from "react-router-dom";
import "../../../css/home.css";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { sweetTopSuccessAlert } from "../../../lib/sweetAlert";

interface ExploreProductsProps {
  onAdd?: (item: CartItem) => void;
}

export default function ExploreProducts({ onAdd }: ExploreProductsProps) {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);
  const itemsPerView = 4;

  // Fetch products from backend (newest products)
  useEffect(() => {
    const productService = new ProductService();
    const inquiry: ProductInquiry = {
      page: 1,
      limit: 12, // Get 12 products for carousel
      order: "createdAt", // Newest products
    };

    productService
      .getProducts(inquiry)
      .then((data) => {
        setExploreProducts(data);
      })
      .catch((err) => console.log("Error fetching explore products:", err));
  }, []);

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

  const handleProductClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAdd) {
      onAdd({
        _id: product._id,
        name: product.productName,
        price: product.productPrice,
        image: product.productImages[0],
        quantity: 1,
      });
      sweetTopSuccessAlert("Added to cart!", 700);
    }
  };

  const handleViewAll = () => {
    history.push("/products");
  };

  const visibleProducts = exploreProducts.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const renderStars = (views: number) => {
    // Convert views to a rating (for display purposes)
    const rating = Math.min(5, Math.max(1, Math.floor(views / 20)));
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star">
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
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const hasDiscount = product.productOldPrice && product.productOldPrice > product.productPrice;

                return (
                  <div 
                    key={product._id} 
                    className="explore-product-card"
                    onClick={() => handleProductClick(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="explore-product-image-wrapper">
                      {hasDiscount && (
                        <span className="product-tag">
                          -{Math.round(((product.productOldPrice! - product.productPrice) / product.productOldPrice!) * 100)}%
                        </span>
                      )}

                      <img
                        src={imagePath}
                        alt={product.productName}
                        className="explore-product-image"
                      />

                      <button
                        className={`explore-wishlist-btn ${
                          likedProducts.has(product._id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(product._id);
                        }}
                        aria-label="Add to wishlist"
                      >
                        {likedProducts.has(product._id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </button>

                      <button
                        className="explore-view-btn"
                        aria-label="View product"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product._id);
                        }}
                      >
                        <VisibilityIcon />
                      </button>

                      <button 
                        className="explore-add-to-cart-btn"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCartOutlinedIcon />
                        Add To Cart
                      </button>
                    </div>

                    <div className="explore-product-info">
                      <h3 className="explore-product-name">{product.productName}</h3>

                      <div className="explore-product-price">
                        <span className="explore-current-price">
                          ${product.productPrice}
                        </span>
                        {product.productOldPrice && (
                          <span className="explore-original-price">
                            ${product.productOldPrice}
                          </span>
                        )}
                      </div>

                      <div className="explore-product-rating">
                        <div className="explore-stars">
                          {renderStars(product.productViews)}
                        </div>
                        <span className="explore-review-count">
                          <RemoveRedEyeIcon style={{ fontSize: 14, marginRight: 4 }} />
                          {product.productViews} views
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-products">Loading products...</div>
            )}
          </div>

          <div className="explore-view-all-button">
     
          </div>
        </div>
      </Container>
    </div>
  );
}