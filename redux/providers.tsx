"use client";
import { Provider } from "react-redux";
import store from "@/redux/store";
// import { setAuth } from "@/redux/slices/authSlice";
import { useEffect } from "react";
// import { store as persistedStore, persistor } from '@/lib/redux/configureStore';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   const authString = localStorage.getItem("auth");
  //   if (authString) {
  //     const auth = JSON.parse(authString);
  //     store.dispatch(setAuth(auth));
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
