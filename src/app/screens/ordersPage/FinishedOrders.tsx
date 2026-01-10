import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Stack } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

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
                          src="/img/lavash.webp"
                          className="order-dish-img"
                        />
                        <p className="title-dish">{product.productName}</p>
                      </div>
                      <Box className="price-box">
                        <div className="price-box-inf">
                          <p>${item.itemPrice}</p>
                          <img src="/icons/close.svg" />
                          <p>{item.itemQuantity}</p>
                          <img src="/icons/pause.svg" />
                          <p style={{ marginLeft: "15px" }}>
                            $ ${item.itemQuantity * item.itemPrice}
                          </p>
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
                  <img src="/icons/plus.svg" style={{ marginLeft: "20px" }} />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img src="/icons/pause.svg" />
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
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
