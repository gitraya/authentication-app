import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthCardProps {
  isLogin?: boolean;
}

const AuthCard: FC<AuthCardProps> = ({ isLogin = false }: AuthCardProps) => {
  return (
    <div className="py-10 px-14 w-login-card border rounded-3xl">
      <div className="w-36 mb-7">
        <Image
          src="/devchallenges.svg"
          alt="Logo"
          width="131"
          height="19"
          layout="responsive"
        />
      </div>
      <h1 className={`font-semibold text-lg mb-${isLogin ? "7" : "4"}`}>
        {isLogin ? "Login" : "Join thousands of learners from around the world"}
      </h1>
      {!isLogin && (
        <p className="mb-8">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
      )}
      <div className="relative mb-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <span className="material-symbols-rounded text-xl text-gray-400">
            mail
          </span>
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Email"
        />
      </div>
      <div className="relative mb-6">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <span className="material-symbols-rounded text-xl text-gray-400">
            lock
          </span>
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Password"
        />
      </div>
      <button className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none mb-8">
        {isLogin ? "Login" : "Start coding now"}
      </button>

      <div className="text-center w-full mb-6">
        <span className="text-sm text-gray-500">
          or continue with these social profile
        </span>
      </div>

      <div className="mb-7 flex justify-center gap-5">
        {["Google", "Facebook", "Twitter", "Github"].map((provider) => (
          <Link
            href="/auth/[provider]"
            as={`/auth/${provider.toLowerCase()}`}
            key={provider}
          >
            <a>
              <Image
                src={`/${provider}.svg`}
                alt="Provider Logo"
                width="43"
                height="43"
                layout="intrinsic"
              />
            </a>
          </Link>
        ))}
      </div>

      <div className="text-center w-full">
        <span className="text-sm text-gray-500">
          {isLogin ? "Don’t have an account yet?" : "Adready a member?"}{" "}
          <Link href={`/${isLogin ? "register" : "login"}`}>
            <a className="text-blue-400">{isLogin ? "Register" : "Login"}</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AuthCard;
