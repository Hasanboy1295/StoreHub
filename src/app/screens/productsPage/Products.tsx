import * as React from "react";
import {
  Badge,
  Box,
  Button,
  colors,
  Container,
  Input,
  PaginationItem,
  Stack,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Pagination from "@mui/material/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { ArrowBack } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/* reduxe slice selector */

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 2,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const history = useHistory();

  const [searchText, setSearchtext] = useState<string>("");

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /* HANDLER */
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: React.ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="product-frame">
      <Container>
        <Stack className="main">
          <Stack className="top-title-input">
            <Box className="title">Burak Restaurant</Box>
            <Stack className="input-butt-box">
              <Input
                className="input"
                placeholder="Type here"
                type={"search"}
                value={searchText}
                onChange={(e) => setSearchtext(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
                disableUnderline
                sx={{
                  border: "none",
                  borderRadius: "8px",
                  marginRight: "70px",
                }}
              />
              <Button
                className="searching-button"
                variant={"contained"}
                color={"primary"}
                onClick={searchProductHandler}
              >
                Search
                <SearchOutlinedIcon />
              </Button>
            </Stack>
          </Stack>
          <Stack className="product-butt-img">
            <Stack className="top-butt-box">
              <Button
                variant="contained"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>

              <Button
                variant="contained"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>

              <Button
                variant="contained"
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
            <Stack className="butt-swiper-box">
              <Stack className="left-butt-box">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  className="rotate"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  className="rotate"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  className="rotate"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink{" "}
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  className="rotate"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Desert
                </Button>

                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  className="rotate"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
              </Stack>
              <Stack className="wrap-box">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + "liter"
                        : product.productSize + "size";
                    return (
                      <Stack className="product-img-box">
                        <Stack
                          key={product._id}
                          className={"full-img-box"}
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <Stack
                            className="image-box"
                            sx={{
                              backgroundImage: `url(${imagePath})`,
                            }}
                          >
                            <div className="product-sale">{sizeVolume}</div>
                            <Stack className="view-basket-box">
                              <Button
                                className="shop-basket"
                                onClick={(e) => {
                                  onAdd({
                                    _id: product._id,
                                    quantity: 1,
                                    name: product.productName,
                                    price: product.productPrice,
                                    image: product.productImages[0],
                                  });
                                  e.stopPropagation();
                                }}
                              >
                                <img src={"/icons/shopping-cart.svg"} />
                              </Button>
                              <Button className="view-bnt" sx={{}}>
                                <Badge
                                  badgeContent={product.productViews}
                                  color="secondary"
                                >
                                  <RemoveRedEyeIcon
                                    sx={{
                                      color:
                                        product.productViews === 0
                                          ? "gray"
                                          : "white",
                                    }}
                                  />
                                </Badge>
                              </Button>
                            </Stack>
                          </Stack>
                          <Stack className="imgage-title-box">
                            <span className="prd-name">
                              {product.productName}
                            </span>
                            <div className="product-cost">
                              <MonetizationOnIcon />
                              {product.productPrice}
                            </div>
                          </Stack>
                        </Stack>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">New products are not available</Box>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} className="pagination">
            <Pagination
              count={
                products.length != 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              className="pagination-num"
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="burak-img">
        <Container>
          <Stack className="main-burak-box">
            <Box className="title-burak-box">Our Family Brand</Box>
            <Stack className="br-img-boxes">
              <Stack className="burak-card">
                <Box className="burak-img-card">
                  <img src="/img/kebab-fresh.webp" alt="" />
                </Box>
              </Stack>
              <Stack className="burak-card">
                <Box className="burak-img-card">
                  <img src="/img/kebab-fresh.webp" alt="" />
                </Box>
              </Stack>
              <Stack className="burak-card">
                <Box className="burak-img-card">
                  <img src="/img/kebab-fresh.webp" alt="" />
                </Box>
              </Stack>
              <Stack className="burak-card">
                <Box className="burak-img-card">
                  <img src="/img/kebab-fresh.webp" alt="" />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="adress">
        <Container>
          <Stack className="adress-area">
            <Box className="title-adress">Our adress</Box>

            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps?q=36.623494,127.446876&z=15&output=embed"
              width="1320"
              height="500"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
