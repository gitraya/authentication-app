import { FC, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import Alert from "./Alert";
import { setNotification } from "../reducers/notification";
import { loginUser } from "../reducers/user";

interface AuthCardProps {
  isLogin?: boolean;
}

const AuthCard: FC<AuthCardProps> = ({ isLogin = false }: AuthCardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);

    try {
      if (isLogin) {
        await dispatch(
          loginUser({ email: values.email, password: values.password })
        );
      } else {
        await dispatch(
          registerUser({ email: values.email, password: values.password })
        );
      }

      dispatch(
        setNotification({
          type: "success",
          message: isLogin ? "Login successful" : "Registration successful",
        })
      );

      setTimeout(() => {
        if (isLogin) {
          router.push("/");
        } else {
          router.push("/edit");
        }
      }, 2000);
    } catch (error: any) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          type: "danger",
        })
      );
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-10 px-14 w-login-card border rounded-3xl"
    >
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
      <Alert />
      <div className="relative mb-4">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <span className="material-symbols-rounded text-xl text-gray-400">
              mail
            </span>
          </div>
          <input
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            type="text"
            id="input-group-1"
            className={`${
              errors?.email
                ? "bg-red-50 border border-red-300"
                : "bg-gray-50 border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 border text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5`}
            placeholder="Email"
          />
        </div>
        {errors?.email && (
          <small className="text-red-500">
            {errors?.email?.message?.toString() || ""}
          </small>
        )}
      </div>
      <div className="relative mb-6">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <span className="material-symbols-rounded text-xl text-gray-400">
              lock
            </span>
          </div>
          <input
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
            type="text"
            id="input-group-1"
            className={`${
              errors?.password
                ? "bg-red-50 border border-red-300"
                : "bg-gray-50 border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 border text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5`}
            placeholder="Password"
          />
        </div>
        {errors?.password && (
          <small className="text-red-500">
            {errors?.password?.message?.toString() || ""}
          </small>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading
            ? "bg-blue-200 hover:bg-blue-400 "
            : "bg-blue-600 hover:bg-blue-800"
        } w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none mb-8`}
      >
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
    </form>
  );
};

export default AuthCard;
