import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../reducers";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <Fragment>
      <Head>
        <title>Authentication App</title>
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center pb-16">
        <div className="w-full text-center mb-11 mt-8">
          <h1 className="text-4xl mb-2">Personal info</h1>
          <span className="font-light text-lg">
            Basic info, like your name and photo
          </span>
        </div>

        <div className="flex flex-col w-3/5 border rounded-xl">
          <div className="flex items-center justify-between py-7 px-12">
            <div>
              <h2 className="text-2xl mb-1">Profile</h2>
              <p className="text-xs font-medium text-gray-400">
                Some info may be visible to other people
              </p>
            </div>
            <Link href="/edit" passHref>
              <button className="text-gray-500 bg-white border border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-xl text-sm px-8 py-2">
                Edit
              </button>
            </Link>
          </div>
          {["photo", "name", "bio", "phone", "email", "password"].map(
            (provider) => (
              <div
                key={provider}
                className={`flex px-12 ${
                  provider === "photo" ? "py-4" : "py-6"
                } font-medium items-center border-t-2`}
              >
                <h3 className="uppercase text-xs text-gray-400 w-1/3">
                  {provider}
                </h3>
                {provider === "photo" ? (
                  <div className="w-full">
                    <div className="bg-black w-16 h-16 rounded-lg"></div>
                  </div>
                ) : (
                  <span className="text-lg truncate w-full">
                    {provider === "password"
                      ? "********"
                      : user[provider] || "-"}
                  </span>
                )}
              </div>
            )
          )}
        </div>
        <Copyright className="w-3/5" />
      </main>
    </Fragment>
  );
};

export default Home;
