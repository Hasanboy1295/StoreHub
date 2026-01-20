import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import "../../../css/basket.css";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();

  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );

  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());

      history.push("/orders");
    } catch (err) {
      console.log("processOrderHandler:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
  <Box className="basket-float-root">
    <IconButton
      aria-label="cart"
      id="basic-button"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      <Badge badgeContent={cartItems.length} color="secondary">
        <img src={"/icons/cart.svg"} alt="cart" />
      </Badge>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: "#fff",
          borderRadius: "16px",
          minWidth: "370px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
          p: 0,
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <div className="basket-float">
        <div className="basket-float-header">
          <span>Cart</span>
          <button className="basket-float-clear" onClick={onDeleteAll} title="Clear all">
            <DeleteOutlineIcon style={{ fontSize: 18 }} />
          </button>
        </div>
        <div className="basket-float-list">
          {cartItems.length === 0 ? (
            <div className="basket-float-empty">Cart is empty!</div>
          ) : (
            cartItems.map((item: CartItem) => {
              // Handle different image path formats
              let imagePath = item.image;
              if (imagePath && !imagePath.startsWith("http://") && !imagePath.startsWith("https://")) {
                imagePath = imagePath.startsWith("/") 
                  ? `${serverApi}${imagePath}` 
                  : `${serverApi}/${imagePath}`;
              }
              return (
                <div className="basket-float-row" key={item._id}>
                  <button className="basket-float-remove" onClick={() => onDelete(item)}>
                    <span>&#10005;</span>
                  </button>
                  <img src={imagePath} className="basket-float-img" alt={item.name} />
                  <span className="basket-float-name">{item.name}</span>
                  <span className="basket-float-price">${item.price}</span>
                  <div className="basket-float-qty">
                    <button onClick={() => onRemove(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onAdd(item)}>+</button>
                  </div>
                  <span className="basket-float-subtotal">
                    ${item.price * item.quantity}
                  </span>
                </div>
              );
            })
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className="basket-float-footer">
            <div className="basket-float-total-row">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
            <Button
              onClick={proceedOrderHandler}
              variant="contained"
              className="basket-float-order-btn"
              fullWidth
            >
              ORDER
            </Button>
          </div>
        )}
      </div>
    </Menu>
  </Box>

  
);
}