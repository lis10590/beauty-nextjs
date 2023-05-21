import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./modal";
import clientsReducer from "./clients";
import productsReducer from "./products";
import treatmentsReducer from "./treatments";
import authReducer from "./auth";
import eventsReducer from "./events";
import analysisReducer from "./analysis";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    clients: clientsReducer,
    products: productsReducer,
    treatments: treatmentsReducer,
    auth: authReducer,
    events: eventsReducer,
    analysis: analysisReducer,
  },
});

export default store;
