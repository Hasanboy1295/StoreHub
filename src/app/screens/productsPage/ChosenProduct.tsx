import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import "../../../css/basket.css";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

interface RouteParams {
  productId: string;
}

const galleryImages = [
  "https://static-01.daraz.com.bd/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg",
  "https://static-01.daraz.com.bd/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg",
  "https://static-01.daraz.com.bd/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg",
  "https://static-01.daraz.com.bd/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg",
];

const relatedItems = [
  {
    img: "https://static-01.daraz.com.bd/p/6e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg",
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-25%",
    rating: 4.5,
    reviews: 88,  
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/107/107831.png",
    name: "AK-900 Wired Keyboard",
    price: "$960",
    oldPrice: "$1160",
    discount: "-35%",
    rating: 5,
    reviews: 75,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/107/107831.png",
    name: "IPS LCD Gaming Monitor",
    price: "$370",
    oldPrice: "$400",
    discount: "-8%",
    rating: 4.8,
    reviews: 99,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/107/107831.png",
    name: "RGB liquid CPU Cooler",
    price: "$160",
    oldPrice: "$170",
    discount: "-6%",
    rating: 4.7,
    reviews: 65,
  },
];

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<RouteParams>();
  const [selectedImg, setSelectedImg] = useState(galleryImages[0]);
  const [color, setColor] = useState("red");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  const product = {
    _id: productId,
    productName: "Havic HV G-92 Gamepad",
    productPrice: 192,
    productImages: galleryImages,
    productDescription:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    rating: 5,
    reviews: 150,
    inStock: true,
  };

  return (
    <div className="chosen-product-page" style={{ background: "#fff", padding: 32 }}>
      {/* Breadcrumb */}
      <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>
        Account / Gaming / <span style={{ color: "#222" }}>{product.productName}</span>
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
              }}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </Stack>
        {/* Main Image */}
        <Box>
          <img
            src={selectedImg}
            alt={product.productName}
            style={{
              width: 320,
              height: 320,
              objectFit: "cover",
              borderRadius: 16,
              background: "#fafafa",
            }}
          />
        </Box>
        {/* Info */}
        <Stack spacing={2} sx={{ minWidth: 340 }}>
          <h2 style={{ margin: 0 }}>{product.productName}</h2>
          <div style={{ color: "#ffb400", fontWeight: 600 }}>
            {"★".repeat(product.rating)}{" "}
            <span style={{ color: "#888", fontWeight: 400 }}>
              ({product.reviews} Reviews)
            </span>{" "}
            <span style={{ color: "#00b67a", fontWeight: 500 }}>
              {product.inStock ? " | In Stock" : " | Out of Stock"}
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>${product.productPrice}.00</div>
          <div style={{ color: "#444", fontSize: 15 }}>{product.productDescription}</div>
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
                  image: selectedImg,
                  quantity: qty,
                })
              }
            >
              ADD TO BASKET
            </Button>
                    {/* <Button
                variant="contained"
                onClick={(e) => {
                onAdd({
                  _id: product._id,
                  name: product.productName,
                  price: product.productPrice,
                  image: selectedImg,
                  quantity: qty,
                })
                  e.stopPropagation();
                }}
              >
                Add To Baskets
              </Button> */}
            <Button
              variant="outlined"
              color="error"
              sx={{ minWidth: 48 }}
              onClick={() =>
                onAdd({
                  _id: product._id,
                  name: product.productName,
                  price: product.productPrice,
                  image: selectedImg,
                  quantity: qty,
                })
              }
            >
              ♥
            </Button>
          </div>
          {/* Delivery Info */}
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Box
              sx={{
                border: "1px solid #eee",
                borderRadius: 8,
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
                borderRadius: 8,
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
          {relatedItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: 18,
                width: 200,
                position: "relative",
              }}
            >
              {item.discount && (
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
                  {item.discount}
                </div>
              )}
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  marginBottom: 12,
                }}
              />
              <div style={{ fontWeight: 500, marginBottom: 6 }}>{item.name}</div>
              <div style={{ color: "#ff4d4f", fontWeight: 600 }}>
                {item.price}{" "}
                {item.oldPrice && (
                  <span
                    style={{
                      color: "#888",
                      textDecoration: "line-through",
                      fontSize: "1rem",
                      marginLeft: 8,
                    }}
                  >
                    {item.oldPrice}
                  </span>
                )}
              </div>
              <div style={{ color: "#ffb400", fontSize: "1.1rem" }}>
                {"★".repeat(Math.round(item.rating))}
                <span style={{ color: "#888", fontSize: "0.95rem", marginLeft: 4 }}>
                  ({item.reviews})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}