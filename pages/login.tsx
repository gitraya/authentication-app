import { Fragment, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/user";
import AuthCard from "../components/AuthCard";
import Copyright from "../components/Copyright";

const Login: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Authentication App - Login</title>
      </Head>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <AuthCard isLogin />
        <Copyright />
      </main>
    </Fragment>
  );
};

export default Login;
