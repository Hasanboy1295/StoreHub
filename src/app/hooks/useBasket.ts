import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const [cartItems, serCartItems] = useState<CartItem[]>(currentCart);

  //HANDLAR
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );

    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      serCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      serCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  //   const onRemove = (input: CartItem) => {
  //     const exist: any = cartItems.find(
  //       (item: CartItem) => item._id === input._id
  //     );
  //     if (exist.quantity) {
  //       const cartUpdate = cartItems.filter(
  //         (item: CartItem) => item._id !== input._id
  //       );
  //       serCartItems(cartUpdate);
  //       localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  //     } else {
  //       const cartUpdate = cartItems.map((item: CartItem) =>
  //         item._id === input._id
  //           ? { ...exist, quantity: exist.quantity - 1 }
  //           : item
  //       );
  //       serCartItems(cartUpdate);
  //       localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  //     }
  //   };

  const onRemove = (input: CartItem) => {
    const exist = cartItems.find((item: CartItem) => item._id === input._id);

    if (!exist) return; // Agar mavjud bo'lmasa, hech narsa qilmaymiz

    let cartUpdate;

    if (exist.quantity === 1) {
      // Faqat 1 dona qolgan bo‘lsa, uni o‘chirib tashlaymiz
      cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id);
    } else {
      // Aks holda, quantity ni 1 taga kamaytiramiz
      cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }

    serCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // ////////

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id
    );
    serCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    serCartItems([]);
    localStorage.removeItem("cartData");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
