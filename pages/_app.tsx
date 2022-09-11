import "../styles/globals.css";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import store from "../reducers";

const queryClient = new QueryClient();

interface PrivateRouteProps {
  protectedRoutes: string[];
  children: React.ReactNode;
}

const protectedRoutes = ["/", "/edit"];

const PrivateRoute = ({ protectedRoutes, children }: PrivateRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { data: user } = useQuery("user", () => axios.get(`/api/me`));
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    setIsLoading(true);

    const token = getCookie("token");

    if (token && typeof token === "string") {
      const expiredTime = JSON.parse(atob(token.split(".")[1])).exp * 1000;
      const isTokenExpired = Date.now() >= expiredTime;
      setIsAuthenticated(Boolean(token) && !isTokenExpired);
    }

    setIsLoading(false);
  }, [router.pathname]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathIsProtected) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, pathIsProtected]);

  if ((isLoading || !isAuthenticated) && pathIsProtected) {
    return <SpinnerFullScreen />;
  }

  return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PrivateRoute protectedRoutes={protectedRoutes}>
        <Component {...pageProps} />
      </PrivateRoute>
    </Provider>
  </QueryClientProvider>
);

export default MyApp;
