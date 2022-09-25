import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AuthCard from "components/AuthCard";
import Copyright from "components/Copyright";

const Register: NextPage = () => (
  <Fragment>
    <Head>
      <title>Authentication App - Register</title>
    </Head>
    <main className="flex flex-col min-h-screen items-center justify-between sm:justify-center">
      <AuthCard />
      <Copyright className="sm:w-[30rem]" />
    </main>
  </Fragment>
);

export default Register;
