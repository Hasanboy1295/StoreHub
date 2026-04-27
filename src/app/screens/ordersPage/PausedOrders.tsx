import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Container, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrder } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

// Helper function to get proper image path
const getImagePath = (image: string) => {
  if (!image) return "/img/default-product.png";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${serverApi}/${image.startsWith("/") ? image.slice(1) : image}`;
};

//REDUX SELECTOR
const pausedOrdersRetriver = createSelector(
  retrievePausedOrder,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrderProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrderProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriver);

  //handlar

  const processOrderHandlar = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to process with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        //=> process order
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandlar", err);
      sweetErrorHandling(err).then();
    }
  };

  const deleteOrderHandlar = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        //order rebuild
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandlar", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-inf ">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = order.productData?.find(
                    (ele: Product) => item.productId === ele._id
                  );
                  // Defensive checks for product and productImages
                  const imageSrc = product?.productImages && product.productImages.length > 0
                    ? getImagePath(product.productImages[0])
                    : "/img/default-product.png";
                  return product ? (
                    <Box key={item._id} className="order-name-price">
                      <div className="order-name-price-inf">
                        <img 
                          src={imageSrc}
                          className="order-dish-img" 
                          alt={product.productName || "Product"}
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
                  ) : null;
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
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className="cencel-button"
                  onClick={deleteOrderHandlar}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className="pay-button"
                  onClick={processOrderHandlar}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              py={8}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 120, color: "#ccc" }} />
              <p style={{ color: "#999", marginTop: 16 }}>No paused orders yet</p>
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
