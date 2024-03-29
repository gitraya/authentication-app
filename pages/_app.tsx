import "styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import SpinnerFullScreen from "components/SpinnerFullScreen";
import store from "reducers";
import { initializeLoginUser } from "reducers/user";
import { useAppDispatch, useAppSelector } from "hooks/redux";

const queryClient = new QueryClient();

interface PrivateRouteProps {
  protectedRoutes: string[];
  children: React.ReactNode;
}

const protectedRoutes = ["/", "/edit"];

const PrivateRoute = ({ protectedRoutes, children }: PrivateRouteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    setIsLoading(true);
    dispatch(initializeLoginUser()).then(() => {
      setIsLoading(false);
    });
  }, [router.pathname]);

  useEffect(() => {
    if (!isLoading && !user && pathIsProtected) {
      router.push("/register");
    }
  }, [isLoading, user, pathIsProtected]);

  if ((isLoading || !user) && pathIsProtected) {
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
