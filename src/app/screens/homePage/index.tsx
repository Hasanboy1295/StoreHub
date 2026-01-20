import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import ActiveUsers from "./Explor";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";

/* reduxe slice selector */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage({ onAdd }: HomePageProps) {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );
  // selector: store => date

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.OTHER,
      })
      .then((data) => {
        setPopularDishes(data);
      });

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setNewDishes(data);
      });

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);
  //backend server data

  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes onAdd={onAdd} />
      <ActiveUsers />
      <Events />
    </div>
  );
}
