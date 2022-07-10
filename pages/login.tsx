import type { NextPage } from "next";
import Head from "next/head";
import AuthCard from "../components/AuthCard";
import Copyright from "../components/Copyright";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login - Authentication App</title>
      </Head>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <AuthCard isLogin />
        <Copyright />
      </main>
    </div>
  );
};

export default Login;
