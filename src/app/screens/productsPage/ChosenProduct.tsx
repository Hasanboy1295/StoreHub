import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import "../../../css/basket.css";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

interface RouteParams {
  productId: string;
}

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<RouteParams>();
  const history = useHistory();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [color, setColor] = useState("red");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const productService = new ProductService();
    
    productService
      .getProduct(productId)
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data);
        if (data.productImages && data.productImages.length > 0) {
          const firstImg = data.productImages[0];
          // Handle different image path formats
          if (firstImg.startsWith("http://") || firstImg.startsWith("https://")) {
            setSelectedImg(firstImg);
          } else if (firstImg.startsWith("/")) {
            setSelectedImg(`${serverApi}${firstImg}`);
          } else {
            setSelectedImg(`${serverApi}/${firstImg}`);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  // Fetch related products
  useEffect(() => {
    const productService = new ProductService();
    const inquiry: ProductInquiry = {
      page: 1,
      limit: 4,
      order: "productViews",
    };

    // If product has collection, filter by same collection
    if (product?.productCollection) {
      inquiry.productCollection = product.productCollection;
    }

    productService
      .getProducts(inquiry)
      .then((data) => {
        // Filter out current product from related items
        const filtered = data.filter((p) => p._id !== productId);
        setRelatedProducts(filtered.slice(0, 4));
      })
      .catch((err) => console.log("Error fetching related products:", err));
  }, [product, productId]);

  const handleRelatedProductClick = (id: string) => {
    history.push(`/products/${id}`);
  };

  const getProductImage = (images: string[] | undefined, index: number = 0): string => {
    if (images && images.length > index) {
      const img = images[index];
      // Check if image already has full URL
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
      }
      // Check if image starts with /
      if (img.startsWith("/")) {
        return `${serverApi}${img}`;
      }
      return `${serverApi}/${img}`;
    }
    return "/img/default-product.png";
  };

  // Debug: Log product data
  useEffect(() => {
    if (product) {
      console.log("Product data:", product);
      console.log("Product images:", product.productImages);
    }
  }, [product]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <p>Product not found</p>
      </div>
    );
  }

  // Build gallery images using the helper function
  const galleryImages = product.productImages?.map((img, idx) => getProductImage(product.productImages, idx)) || [];

  return (
    <div className="chosen-product-page" style={{ background: "#fff", padding: 32 }}>
      {/* Breadcrumb */}
      <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
        Account / {product.productCollection} / <span style={{ color: "#222" }}>{product.productName}</span>
      </div>
      <Box sx={{ display: "flex", gap: 32 }}>
        {/* Gallery */}
        <Stack spacing={2}>
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 8,
                border: selectedImg === img ? "2px solid #ff4d4f" : "1px solid #eee",
                cursor: "pointer",
                background: "#f5f5f5",
              }}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </Stack>
        {/* Main Image */}
        <Box>
          <img
            src={selectedImg || getProductImage(product.productImages)}
            alt={product.productName}
            style={{
              width: 320,
              height: 320,
              objectFit: "contain",
              borderRadius: 16,
              background: "#fafafa",
            }}
          />
        </Box>
        {/* Info */}
        <Stack spacing={2} sx={{ minWidth: 340 }}>
          <h2 style={{ margin: 0 }}>{product.productName}</h2>
          <div style={{ color: "#ffb400", fontWeight: 600 }}>
            {"★".repeat(5)}{" "}
            <span style={{ color: "#888", fontWeight: 400 }}>
              ({product.productViews || 0} Views)
            </span>{" "}
            <span style={{ color: "#00b67a", fontWeight: 500 }}>
              {product.productLeftCount && product.productLeftCount > 0 ? " | In Stock" : " | Out of Stock"}
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>${product.productPrice}.00</div>
          <div style={{ color: "#444", fontSize: 15 }}>{product.productDesc || "No description available."}</div>
          {/* Color */}
          <div>
            <span style={{ marginRight: 12 }}>Colours:</span>
            <span
              onClick={() => setColor("red")}
              style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#d32f2f",
                border: color === "red" ? "2px solid #222" : "1px solid #eee",
                marginRight: 8,
                cursor: "pointer",
              }}
            />
            <span
              onClick={() => setColor("gray")}
              style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#888",
                border: color === "gray" ? "2px solid #222" : "1px solid #eee",
                cursor: "pointer",
              }}
            />
          </div>
          {/* Size */}
          <div>
            <span style={{ marginRight: 12 }}>Size:</span>
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <Button
                key={s}
                variant={size === s ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: 36, marginRight: 1 }}
                onClick={() => setSize(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          {/* Quantity and Buy/Add */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Button
              variant="outlined"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              sx={{ minWidth: 36 }}
            >
              -
            </Button>
            <span style={{ fontWeight: 600, fontSize: 18 }}>{qty}</span>
            <Button
              variant="outlined"
              onClick={() => setQty((q) => q + 1)}
              sx={{ minWidth: 36 }}
            >
              +
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: 2, minWidth: 120 }}
              onClick={() =>
                onAdd({
                  _id: product._id,
                  name: product.productName,
                  price: product.productPrice,
                  image: selectedImg || getProductImage(product.productImages),
                  quantity: qty,
                })
              }
            >
              ADD TO BASKET
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ minWidth: 48 }}
            >
              ♥
            </Button>
          </div>
          {/* Delivery Info */}
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Box
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                padding: 2,
                minWidth: 160,
                fontSize: 14,
              }}
            >
              <b>Free Delivery</b>
              <br />
              Enter your postal code for Delivery Availability
            </Box>
            <Box
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                padding: 2,
                minWidth: 160,
                fontSize: 14,
              }}
            >
              <b>Return Delivery</b>
              <br />
              Free 30 Days Delivery Returns.{" "}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#1890ff",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                  fontSize: "inherit",
                }}
              >
                Details
              </button>
            </Box>
          </Box>
        </Stack>
      </Box>
      {/* Related Items */}
      <div style={{ marginTop: 48 }}>
        <div style={{ color: "#ff4d4f", fontWeight: 700, marginBottom: 16 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 24,
              background: "#ff4d4f",
              borderRadius: 6,
              marginRight: 8,
              verticalAlign: "middle",
            }}
          />
          Related Item
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => handleRelatedProductClick(item._id)}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: 18,
                width: 200,
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "#ff4d4f",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: 8,
                  padding: "2px 10px",
                  zIndex: 2,
                }}
              >
                -{Math.floor(Math.random() * 30) + 5}%
              </div>
              <img
                src={getProductImage(item.productImages)}
                alt={item.productName}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  marginBottom: 12,
                  background: "#f5f5f5",
                  borderRadius: 8,
                }}
              />
              <div style={{ fontWeight: 500, marginBottom: 6 }}>{item.productName}</div>
              <div style={{ color: "#ff4d4f", fontWeight: 600 }}>
                ${item.productPrice}{" "}
                <span
                  style={{
                    color: "#888",
                    textDecoration: "line-through",
                    fontSize: "1rem",
                    marginLeft: 8,
                  }}
                >
                  ${Math.floor(item.productPrice * 1.2)}
                </span>
              </div>
              <div style={{ color: "#ffb400", fontSize: "1.1rem" }}>
                {"★★★★★"}
                <span style={{ color: "#888", fontSize: "0.95rem", marginLeft: 4 }}>
                  ({item.productViews || 0})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}