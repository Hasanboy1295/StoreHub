import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Pagination,
  Rating,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CartItem } from "../../../lib/types/search";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import "./Product.css";

/* Redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

// Categories matching your backend ProductCollection enum
const categories = [
  { id: ProductCollection.PHONE, name: "Phone" },
  { id: ProductCollection.COMPUTER, name: "Computer" },
  { id: ProductCollection.SMARTWATCH, name: "SmartWatch" },
  { id: ProductCollection.CAMERA, name: "Camera" },
  { id: ProductCollection.OTHER, name: "Other" },
];

const sortOptions = [
  { id: "createdAt", name: "New" },
  { id: "productPrice", name: "Price" },
  { id: "productViews", name: "Views" },
];

const Products: React.FC<ProductsProps> = ({ onAdd }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setProducts } = actionDispatch(dispatch);
  const { products } = useSelector(productsRetriever);

  // Get collection from URL query parameter
  const getInitialCollection = (): ProductCollection => {
    const params = new URLSearchParams(location.search);
    const collectionParam = params.get("collection");
    if (collectionParam && Object.values(ProductCollection).includes(collectionParam as ProductCollection)) {
      return collectionParam as ProductCollection;
    }
    return ProductCollection.PHONE;
  };

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: getInitialCollection(),
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");

  // Update collection when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const collectionParam = params.get("collection");
    if (collectionParam && Object.values(ProductCollection).includes(collectionParam as ProductCollection)) {
      setProductSearch((prev) => ({
        ...prev,
        page: 1,
        productCollection: collectionParam as ProductCollection,
      }));
    }
  }, [location.search]);

  // Fetch products from backend
  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, [productSearch]);

  // Clear search when searchText is empty
  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({ ...prev, search: "" }));
    }
  }, [searchText]);

  /* Handlers */
  const searchCollectionHandler = (collection: ProductCollection) => {
    // Update URL to keep it in sync
    history.push(`/products?collection=${collection}`);
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productCollection: collection,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      order: order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((prev) => ({
      ...prev,
      search: searchText,
    }));
  };

  const paginationHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleProductClick = (productId: string) => {
    history.push(`${match.path}/${productId}`);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      _id: product._id,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0],
      quantity: 1,
    });
  };

  return (
    <Box className="product-page-wrapper">
      {/* Vertical Category Sidebar */}
      <Box className="category-sidebar">
        <List className="category-list">
          {categories.map((category) => (
            <ListItemButton
              key={category.id}
              selected={productSearch.productCollection === category.id}
              onClick={() => searchCollectionHandler(category.id)}
              className={`category-item ${
                productSearch.productCollection === category.id ? "active" : ""
              }`}
            >
              <ListItemText primary={category.name} />
              <KeyboardArrowRightIcon />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box className="product-page">
        {/* Search Bar */}
        <Box className="search-bar">
          <Input
            className="search-input"
            placeholder="Search products..."
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchProductHandler();
            }}
            disableUnderline
          />
          <Button
            className="search-button"
            variant="contained"
            onClick={searchProductHandler}
          >
            <SearchOutlinedIcon />
            Search
          </Button>
        </Box>

        {/* Horizontal Sort Filters */}
        <Box className="sort-filters">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={productSearch.order === option.id ? "contained" : "outlined"}
              className={`sort-btn ${productSearch.order === option.id ? "active" : ""}`}
              onClick={() => searchOrderHandler(option.id)}
            >
              {option.name}
            </Button>
          ))}
        </Box>

        {/* Products Section */}
        <Box className="section-header">
          <Box className="section-title">
            <span className="title-indicator"></span>
            <Typography variant="h6">
              {categories.find((c) => c.id === productSearch.productCollection)?.name || "Products"} 
              ({products.length})
            </Typography>
          </Box>
        </Box>

        <Box className="product-grid">
          {products.length !== 0 ? (
            products.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const hasDiscount = product.productDiscount && product.productDiscount > 0;
              
              return (
                <Card key={product._id} className="product-card">
                  <Box
                    className="card-image-container"
                    onClick={() => handleProductClick(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {hasDiscount && (
                      <span className="badge">-{product.productDiscount}%</span>
                    )}
                    <IconButton className="action-btn view-btn">
                      <Badge badgeContent={product.productViews} color="secondary">
                        <RemoveRedEyeIcon />
                      </Badge>
                    </IconButton>
                    <CardMedia
                      component="img"
                      image={imagePath}
                      alt={product.productName}
                      className="product-image"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      className="add-cart-btn"
                      startIcon={<ShoppingCartOutlinedIcon />}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      Add To Cart
                    </Button>
                  </Box>
                  <CardContent className="card-content">
                    <Typography
                      className="product-title"
                      onClick={() => handleProductClick(product._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.productName}
                    </Typography>
                    <Box className="price-row">
                      <span className="price">${product.productPrice}</span>
                      {product.productOldPrice && (
                        <span className="old-price">${product.productOldPrice}</span>
                      )}
                    </Box>
                    {product.productDesc && (
                      <Typography className="product-desc" variant="body2">
                        {product.productDesc.substring(0, 50)}...
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Box className="no-data">
              <Typography>No products available in this category</Typography>
            </Box>
          )}
        </Box>

        {/* Pagination */}
        <Box className="pagination-wrapper">
          <Pagination
            count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
            page={productSearch.page}
            onChange={paginationHandler}
            color="primary"
            size="large"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Products;