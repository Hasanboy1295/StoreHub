import React, { useEffect } from "react";
import { TabContext } from "@mui/lab";
import { Box, Container, Input, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/orders.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/* reduxe slice selector */

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setFinishedOrders, setPausedOrders, setProcessOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  //HANDLER

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <div className="orders-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box
                sx={{
                  borderBottom: 2,
                  paddingBottom: "15px",
                  borderColor: "divider",
                }}
              >
                <Stack className="table-list">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="PAUSED ORDER" value={"1"} />
                    <Tab label="PROCESS ORDER" value={"2"} />
                    <Tab label="FINISHED ORDER" value={"3"} />
                  </Tabs>
                </Stack>
              </Box>
            </Box>
            <Stack>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Stack className="order-right-top">
            <img
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage} `
                  : "/icons/default-user.svg"
              }
              className="order-right-img"
            />
            {/* <div className={"order-user-icon-box"}>
              <img
                src={
                  authMember?.memberType === MemberType.RESTAURANT
                    ? "/icons/restaurant.svg"
                    : "/icons/user-badge.svg"
                }
                alt=""
              />
            </div> */}

            <p className="order-right-name" style={{ textAlign: "center" }}>
              {authMember?.memberNick}
              <br /> {authMember?.memberType}
            </p>
            <p className="order-right-border"></p>
            <span className="order-right-location">
              <img src="icons/location.svg" />{" "}
              {authMember?.memberAdress
                ? authMember.memberAdress
                : "do not exist"}
            </span>
          </Stack>
          <Stack className="order-right-button">
            <Input
              className="order-right-top-button"
              placeholder="Card number : 5243 4090 2002 7495"
            />
            <Box className="order-right-middle-input" flexDirection={"row"}>
              <Input className="order-rignt-left" placeholder="07 / 24" />
              <Input className="order-rignt-right" placeholder="CVV : 010" />
            </Box>
            <Input
              className="order-right-top-button"
              placeholder="Justin Robertson"
            />

            <Box className="order-right-card" justifyContent={"space-around"}>
              <img src="/icons/western-card.svg" className="visa-card-img" />
              <img src="/icons/western-card.svg" className="visa-card-img" />
              <img src="/icons/western-card.svg" className="visa-card-img" />
              <img src="/icons/western-card.svg" className="visa-card-img" />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
