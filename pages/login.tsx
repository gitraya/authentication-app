import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AuthCard from "../components/AuthCard";
import Copyright from "../components/Copyright";

const Login: NextPage = () => (
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

export default Login;
