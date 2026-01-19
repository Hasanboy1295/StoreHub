import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { setProducts } from "../productsPage/slice";
import { retrieveProducts } from "../productsPage/selector";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { sweetTopSuccessAlert } from "../../../lib/sweetAlert";

/* Redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface NewDishesProps {
  onAdd?: (item: CartItem) => void;
}

export default function NewDishes({ onAdd }: NewDishesProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setProducts } = actionDispatch(dispatch);
  const { products } = useSelector(productsRetriever);
  
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);

  // Fetch best-selling products (sorted by views - most popular)
  useEffect(() => {
    const productService = new ProductService();
    const inquiry: ProductInquiry = {
      page: 1,
      limit: 8, // Get 8 products for "View All"
      order: "productViews", // Best selling = most viewed
    };
    
    productService
      .getProducts(inquiry)
      .then((data) => {
        setBestSellingProducts(data);
      })
      .catch((err) => console.log("Error fetching best-selling products:", err));
  }, []);

  // Show 4 products initially, 8 when "View All" is clicked
  const displayedProducts = showAll 
    ? bestSellingProducts 
    : bestSellingProducts.slice(0, 4);

  const handleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleViewAll = () => {
    if (showAll) {
      // If already showing all 8, go back to showing 4
      setShowAll(false);
    } else {
      // Show all 8 products
      setShowAll(true);
    }
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

  return (
    <div className="best-selling-frame">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="best-selling-header">
          <div className="best-selling-title">
            <div className="this-month-badge">This Month</div>
            <h2>Best Selling Products</h2>
          </div>

          <Button 
            variant="contained" 
            className="view-all-link-btn"
            onClick={handleViewAll}
          >
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>

        {/* Products Grid */}
        <div className="best-selling-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const hasDiscount = product.productOldPrice && product.productOldPrice > product.productPrice;
              const discountPercent = hasDiscount 
                ? Math.round(((product.productOldPrice! - product.productPrice) / product.productOldPrice!) * 100)
                : 0;

              return (
                <div 
                  key={product._id} 
                  className="best-selling-card"
                  onClick={() => handleProductClick(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="product-image-container">
                    {hasDiscount && (
                      <span className="discount-badge">-{discountPercent}%</span>
                    )}
                    <img 
                      src={imagePath} 
                      alt={product.productName} 
                      className="product-image" 
                    />

                    <div className="product-actions">
                      <button
                        className={`action-btn like-btn ${
                          likedProducts.includes(product._id) ? "liked" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(product._id);
                        }}
                        aria-label="like product"
                      >
                        <FavoriteBorderIcon />
                      </button>
                      <button 
                        className="action-btn view-btn" 
                        aria-label="view product"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product._id);
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </button>
                    </div>

                    {/* Add to Cart button on hover */}
                    <button 
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCartOutlinedIcon />
                      Add To Cart
                    </button>
                  </div>

                  <div className="product-details">
                    <h3 className="product-title">{product.productName}</h3>

                    <div className="product-pricing">
                      <span className="selling-price">${product.productPrice}</span>
                      {product.productOldPrice && (
                        <span className="original-price">${product.productOldPrice}</span>
                      )}
                    </div>

                    <div className="product-stars">
                      <div className="stars-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                      <span className="review-count">({product.productViews})</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-products">No best-selling products available</div>
          )}
        </div>
      </Container>
    </div>
  );
}