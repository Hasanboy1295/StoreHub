import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ComputerIcon from "@mui/icons-material/Computer";
import WatchIcon from "@mui/icons-material/Watch";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { useHistory } from "react-router-dom";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

// Sidebar categories matching ProductCollection enum
const sidebarCategories = [
  { id: ProductCollection.PHONE, name: "Phone", icon: PhoneAndroidIcon, hasArrow: true },
  { id: ProductCollection.COMPUTER, name: "Computer", icon: ComputerIcon, hasArrow: true },
  { id: ProductCollection.SMARTWATCH, name: "SmartWatch", icon: WatchIcon, hasArrow: false },
  { id: ProductCollection.CAMERA, name: "Camera", icon: CameraAltIcon, hasArrow: false },
  { id: ProductCollection.OTHER, name: "Other", icon: DevicesOtherIcon, hasArrow: false },
];

// Banner slides for each category
const bannerSlides = [
  {
    id: 1,
    logo: "/icons/apple-logo.svg",
    title: "iPhone 14 Series",
    subtitle: "Up to 10%\noff Voucher",
    image: "/img/iphone.png",
    collection: ProductCollection.PHONE,
  },
  {
    id: 2,
    logo: "/icons/Category-Computer.svg",
    title: "MacBook Pro",
    subtitle: "Up to 15%\noff Voucher",
    image: "/img/laptop.png",
    collection: ProductCollection.COMPUTER,
  },
  {
    id: 3,
    logo: "/icons/Category-Headphone.svg",
    title: "Smart Watches",
    subtitle: "Up to 20%\noff Voucher",
    image: "/img/smartwatch.png",
    collection: ProductCollection.SMARTWATCH,
  },
  {
    id: 4,
    logo: "/icons/Category-Gamepad.svg",
    title: "Pro Cameras",
    subtitle: "Up to 25%\noff Voucher",
    image: "/img/camera.png",
    collection: ProductCollection.CAMERA,
  },
  {
    id: 5,
    logo: "/icons/Category-CellPhone.svg",
    title: "Other Devices",
    subtitle: "Up to 30%\noff Voucher",
    image: "/img/devices.png",
    collection: ProductCollection.OTHER,
  },
];

export default function Statistics() {
  const history = useHistory();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [bannerProducts, setBannerProducts] = useState<Product[]>([]);
  const itemsPerView = 4;

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  // Auto-slide banner
  useEffect(() => {
    if (bannerProducts.length === 0) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerProducts.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [bannerProducts.length]);

  // Countdown timer
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

  // Fetch banner products (featured/popular products)
  useEffect(() => {
    const productService = new ProductService();
    const inquiry: ProductInquiry = {
      page: 1,
      limit: 5,
      order: "productViews",
    };

    productService
      .getProducts(inquiry)
      .then((data) => {
        setBannerProducts(data);
      })
      .catch((err) => console.log("Error fetching banner products:", err));
  }, []);

  // Fetch flash sale products
  useEffect(() => {
    const productService = new ProductService();
    const inquiry: ProductInquiry = {
      page: 1,
      limit: 8,
      order: "productPrice",
    };

    productService
      .getProducts(inquiry)
      .then((data) => {
        setFlashSaleProducts(data);
      })
      .catch((err) => console.log("Error fetching flash sale products:", err));
  }, []);

  const handleCategoryClick = (collection: ProductCollection) => {
    history.push(`/products?collection=${collection}`);
  };

  const handleShopNow = (collection: ProductCollection) => {
    history.push(`/products?collection=${collection}`);
  };

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(
      Math.min(flashSaleProducts.length - itemsPerView, currentIndex + 1)
    );
  };

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  const visibleProducts = flashSaleProducts.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="static-frame">
      {/* Hero Section with Sidebar and Banner */}
      <div className="hero-section">
        <Container maxWidth="lg">
          <div className="hero-wrapper">
            {/* Sidebar Menu */}
            <div className="hero-sidebar">
              {sidebarCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="sidebar-item"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="sidebar-item-left">
                      <IconComponent className="sidebar-icon" />
                      <span>{category.name}</span>
                    </div>
                    {category.hasArrow && <KeyboardArrowRightIcon className="arrow-icon" />}
                  </div>
                );
              })}
            </div>

            {/* Banner Slider */}
            <div className="hero-banner">
              {bannerProducts.length > 0 && (
                <div className="hero-content">
                  <div className="hero-text">
                    <div className="hero-brand">
                      <span className="hero-brand-name">{bannerProducts[currentSlide]?.productCollection}</span>
                    </div>
                    <h2 className="hero-title">
                      {bannerProducts[currentSlide]?.productName}
                    </h2>
                    <p className="hero-price">${bannerProducts[currentSlide]?.productPrice}</p>
                    <button 
                      className="hero-btn"
                      onClick={() => handleProductClick(bannerProducts[currentSlide]?._id)}
                    >
                      Shop Now <ArrowForwardIcon />
                    </button>
                  </div>

                  <div className="hero-image">
                    <img 
                      src={bannerProducts[currentSlide]?.productImages?.[0] 
                        ? `${serverApi}/${bannerProducts[currentSlide].productImages[0]}`
                        : "/img/default-product.png"
                      } 
                      alt={bannerProducts[currentSlide]?.productName} 
                    />
                  </div>
                </div>
              )}

              {/* Banner Dots */}
              <div className="hero-dots">
                {bannerProducts.map((_, index) => (
                  <span
                    key={index}
                    className={index === currentSlide ? "active" : ""}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Flash Sales Section */}
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
            <button 
              className="arrow-btn prev-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeftIcon />
            </button>
            <button 
              className="arrow-btn next-btn"
              onClick={handleNext}
              disabled={currentIndex >= flashSaleProducts.length - itemsPerView}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const hasDiscount = product.productOldPrice && product.productOldPrice > product.productPrice;
              const discountPercent = hasDiscount
                ? Math.round(((product.productOldPrice! - product.productPrice) / product.productOldPrice!) * 100)
                : 0;

              return (
                <div 
                  key={product._id} 
                  className="product-card"
                  onClick={() => handleProductClick(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="product-image-wrapper">
                    {hasDiscount && (
                      <div className="product-discount">-{discountPercent}%</div>
                    )}
                    <img 
                      src={imagePath} 
                      alt={product.productName} 
                      className="product-image" 
                    />
                    <button 
                      className={`wishlist-btn ${likedProducts.has(product._id) ? "liked" : ""}`}
                      onClick={(e) => toggleLike(product._id, e)}
                    >
                      {likedProducts.has(product._id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </button>
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id);
                      }}
                    >
                      <VisibilityOutlinedIcon />
                    </button>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.productName}</h3>
                    <div className="product-price-row">
                      <div className="price-group">
                        <span className="current-price">${product.productPrice}</span>
                        {product.productOldPrice && (
                          <span className="original-price">${product.productOldPrice}</span>
                        )}
                      </div>
                      <div className="views-group">
                        <RemoveRedEyeIcon style={{ fontSize: 14, marginRight: 4, color: "#666" }} />
                        <span>{product.productViews}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-products">Loading flash sales...</div>
          )}
        </div>
      </Container>
    </div>
  );
}