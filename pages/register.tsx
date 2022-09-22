import { Fragment, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { logoutUser } from "../reducers/user";
import { useAppDispatch } from "../hooks/redux";
import AuthCard from "../components/AuthCard";
import Copyright from "../components/Copyright";

const Register: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Authentication App - Register</title>
      </Head>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <AuthCard />
        <Copyright />
      </main>
    </Fragment>
  );
};

export default Register;
