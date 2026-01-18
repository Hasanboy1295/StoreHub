import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { CartItem } from "../../../lib/types/search";
import "./Product.css";

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  rating?: number;
  reviews?: number;
}

const wishlist: ProductItem[] = [
  {
    id: 1,
    title: "Gucci duffle bag",
    image: "https://via.placeholder.com/300x200",
    price: 960,
    oldPrice: 1160,
    badge: "-35%",
  },
  {
    id: 2,
    title: "RGB liquid CPU Cooler",
    image: "https://via.placeholder.com/300x200",
    price: 1960,
  },
  {
    id: 3,
    title: "GP11 Shooter USB Gamepad",
    image: "https://via.placeholder.com/300x200",
    price: 550,
  },
  {
    id: 4,
    title: "Quilted Satin Jacket",
    image: "https://via.placeholder.com/300x200",
    price: 750,
  },
];

const recommended: ProductItem[] = [
  {
    id: 5,
    title: "ASUS FHD Gaming Laptop",
    image: "https://via.placeholder.com/300x200",
    price: 960,
    oldPrice: 1160,
    badge: "-35%",
    rating: 5,
    reviews: 65,
  },
  {
    id: 6,
    title: "IPS LCD Gaming Monitor",
    image: "https://via.placeholder.com/300x200",
    price: 1160,
    rating: 5,
    reviews: 65,
  },
  {
    id: 7,
    title: "HAVIT HV-G92 Gamepad",
    image: "https://via.placeholder.com/300x200",
    price: 560,
    badge: "NEW",
    rating: 5,
    reviews: 65,
  },
  {
    id: 8,
    title: "AK-900 Wired Keyboard",
    image: "https://via.placeholder.com/300x200",
    price: 200,
    rating: 5,
    reviews: 65,
  },
];

const Product: React.FC<ProductsProps> = ({ onAdd }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const handleProductClick = (productId: number) => {
    history.push(`${match.path}/${productId}`);
  };

  const handleAddToCart = (item: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      _id: item.id.toString(),
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };

  return (
    <Box className="product-page">
      {/* Wishlist section */}
      <Box className="section-header">
        <Box className="section-title">
          <span className="title-indicator"></span>
          <Typography variant="h6">Wishlist ({wishlist.length})</Typography>
        </Box>
        <Button variant="outlined" className="section-btn">
          Move All To Bag
        </Button>
      </Box>

      <Box className="product-grid">
        {wishlist.map((item) => (
          <Card key={item.id} className="product-card">
            <Box 
              className="card-image-container"
              onClick={() => handleProductClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              {item.badge && <span className="badge">{item.badge}</span>}
              <IconButton 
                className="action-btn delete-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                className="product-image"
              />
              <Button
                fullWidth
                variant="contained"
                className="add-cart-btn"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={(e) => handleAddToCart(item, e)}
              >
                Add To Cart
              </Button>
            </Box>
            <CardContent className="card-content">
              <Typography 
                className="product-title"
                onClick={() => handleProductClick(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </Typography>
              <Box className="price-row">
                <span className="price">${item.price}</span>
                {item.oldPrice && (
                  <span className="old-price">${item.oldPrice}</span>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Just for you */}
      <Box className="section-header just-for-you-header">
        <Box className="section-title">
          <span className="title-indicator"></span>
          <Typography variant="h6">Just For You</Typography>
        </Box>
        <Button variant="outlined" className="section-btn">
          See All
        </Button>
      </Box>

      <Box className="product-grid">
        {recommended.map((item) => (
          <Card key={item.id} className="product-card">
            <Box 
              className="card-image-container"
              onClick={() => handleProductClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              {item.badge && (
                <span className={`badge ${item.badge === "NEW" ? "new-badge" : ""}`}>
                  {item.badge}
                </span>
              )}
              <IconButton 
                className="action-btn view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(item.id);
                }}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                className="product-image"
              />
              <Button
                fullWidth
                variant="contained"
                className="add-cart-btn"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={(e) => handleAddToCart(item, e)}
              >
                Add To Cart
              </Button>
            </Box>
            <CardContent className="card-content">
              <Typography 
                className="product-title"
                onClick={() => handleProductClick(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </Typography>
              <Box className="price-row">
                <span className="price">${item.price}</span>
                {item.oldPrice && (
                  <span className="old-price">${item.oldPrice}</span>
                )}
              </Box>
              {item.rating && (
                <Box className="rating-row">
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    className="product-rating"
                  />
                  <span className="reviews">({item.reviews})</span>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Product;