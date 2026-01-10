import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrderspage = (state: AppRootState) => state.ordersPage;
export const retrievePausedOrder = createSelector(
  selectOrderspage,
  (OrdersPage) => OrdersPage.pausedOrders
);

export const retrieveProcessOrdes = createSelector(
  selectOrderspage,
  (OrdersPage) => OrdersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
  selectOrderspage,
  (OrdersPage) => OrdersPage.finishedOrders
);
