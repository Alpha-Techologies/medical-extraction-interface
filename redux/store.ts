// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // import rootReducer from './reducers';
// import { baseApi } from "./services/baseApi";
// import authSlice from "./slices/authSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authSlice);

// const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authSlice,
//     persisted: persistedReducer, // Include the persisted reducer in the store
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(baseApi.middleware);
//   },
//   devTools: true,
// });

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./services/baseApi";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  timeout: 1000,
};
// console.log(baseApi);

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, // Use persisted reducer for auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
