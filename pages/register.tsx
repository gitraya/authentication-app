import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AuthCard from "../components/AuthCard";
import Copyright from "../components/Copyright";

const Register: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Register - Authentication App</title>
      </Head>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <AuthCard />
        <Copyright />
      </main>
    </Fragment>
  );
};

export default Register;
