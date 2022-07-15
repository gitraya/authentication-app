import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  // if (typeof window !== "undefined") {
  //   window.location.href = "http://localhost:3000/register";
  // }

  return (
    <Fragment>
      <Head>
        <title>Authentication App - Edit Account</title>
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center pb-16">
        <div className="w-3/5 flex flex-col">
          <button
            className="w-full my-6 text-left flex items-center gap-1 text-blue-400 text-lg"
            onClick={router.back}
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back_ios
            </span>
            <span>Back</span>
          </button>
          <div className="flex flex-col border rounded-xl py-7 px-12">
            <div className="flex flex-col mb-4">
              <h2 className="text-2xl mb-1">Change Info</h2>
              <p className="text-xs font-medium text-gray-400">
                Changes will be reflected to every services
              </p>
            </div>
            <form className="w-2/3">
              <button
                type="button"
                className="flex py-3 font-medium items-center gap-7"
              >
                <div className="bg-black w-16 h-16 rounded-lg"></div>
                <h3 className="uppercase text-xs text-gray-400">
                  change photo
                </h3>
              </button>
              {["Name", "Bio", "Phone", "Email", "Password"].map((provider) => (
                <div key={provider} className="flex flex-col py-3 font-medium">
                  <label className="text-xs text-gray-700 mb-1.5">
                    {provider}
                  </label>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4"
                    placeholder={`Enter your ${provider.toLowerCase()}...`}
                  />
                </div>
              ))}
              <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none my-3">
                Save
              </button>
            </form>
          </div>
          <Copyright className="w-full" />
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
