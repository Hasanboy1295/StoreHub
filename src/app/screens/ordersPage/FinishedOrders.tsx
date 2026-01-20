import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

// Helper function to get proper image path
const getImagePath = (image: string) => {
  if (!image) return "/img/default-product.png";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${serverApi}/${image.startsWith("/") ? image.slice(1) : image}`;
};

//REDUX SELECTOR
const finishedOrdersRetriver = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriver);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-inf ">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="order-name-price">
                      <div className="order-name-price-inf">
                        <img
                          src={getImagePath(product.productImages[0])}
                          className="order-dish-img"
                          alt={product.productName}
                        />
                        <p className="title-dish">{product.productName}</p>
                      </div>
                      <Box className="price-box">
                        <div className="price-box-inf">
                          <p>${item.itemPrice}</p>
                          <CloseIcon sx={{ fontSize: 14, color: "#666", verticalAlign: "middle" }} />
                          <p>{item.itemQuantity}</p>
                          <DragHandleIcon sx={{ fontSize: 14, color: "#666", verticalAlign: "middle" }} />
                          <p>${item.itemQuantity * item.itemPrice}</p>
                        </div>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <AddIcon sx={{ fontSize: 18, mx: 2, color: "#666" }} />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <DragHandleIcon sx={{ fontSize: 18, mx: 2, color: "#666" }} />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              py={8}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 120, color: "#ccc" }} />
              <p style={{ color: "#999", marginTop: 16 }}>No finished orders yet</p>
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
