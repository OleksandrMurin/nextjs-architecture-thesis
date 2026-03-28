"use client";

import {
  hydrateFromCookie,
  UserDataType,
  UserState,
} from "@/store/slices/userSlice";
import { injectStore } from "@/store/storeRef";
import { getCSRCookie } from "@/utils/cookies";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React, { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  useEffect(() => {
    const access = getCSRCookie("accessToken");
    const userData = getCSRCookie("user");
    if (access && userData) {
      const parsedData = JSON.parse(
        decodeURIComponent(userData),
      ) as UserDataType;
      const res: UserState = {
        tokens: { access },
        user: parsedData,
        isAuthenticated: true,
        status: "idle",
      };

      store.dispatch(hydrateFromCookie(res));
      injectStore(store);
    }
  }, []);
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <Provider store={store}>
        <CssBaseline />
        {children}
      </Provider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
