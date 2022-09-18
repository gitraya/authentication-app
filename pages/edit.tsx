import { Fragment } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setNotification } from "../reducers/notification";
import { updateUser } from "../reducers/user";
import Head from "next/head";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";

const UserFields: any = [
  {
    name: "name",
    validation: {
      required: { value: true, message: "Name is required" },
      minLength: { value: 3, message: "Name must be at least 3 characters" },
      maxLength: { value: 20, message: "Name must be at most 20 characters" },
    },
  },
  {
    name: "bio",
    validation: {
      minLength: { value: 3, message: "Bio must be at least 3 characters" },
      maxLength: { value: 100, message: "Bio must be at most 100 characters" },
    },
  },
  {
    name: "phone",
    validation: {
      minLength: { value: 10, message: "Phone must be at least 10 characters" },
      maxLength: { value: 20, message: "Phone must be at most 20 characters" },
      pattern: { value: /^\d+$/, message: "Phone must be a number" },
    },
  },
  {
    name: "email",
    validation: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    validation: {
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
    },
  },
];

const Edit: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const onSubmit = async (values: any) => {
    try {
      const userValues = {};

      for (const [key, value] of Object.entries(values)) {
        if (value) userValues[key] = value;
      }

      await dispatch(updateUser(user.id, userValues));

      dispatch(
        setNotification({
          message: "User updated successfully",
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          type: "danger",
          message: error.message,
        })
      );
    }
  };

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
            <form className="w-2/3" onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className="flex py-3 font-medium items-center gap-7"
              >
                <div className="bg-black w-16 h-16 rounded-lg"></div>
                <h3 className="uppercase text-xs text-gray-400">
                  change photo
                </h3>
              </button>
              {UserFields.map((field: any) => (
                <div
                  key={field.name}
                  className="flex flex-col py-3 font-medium"
                >
                  <label
                    htmlFor={field.name}
                    className="text-xs text-gray-700 mb-1.5"
                  >
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                  </label>
                  <input
                    type={field.name}
                    id={field.name}
                    defaultValue={user[field.name]}
                    className={`${
                      errors[field.name]
                        ? "bg-red-50 border border-red-300"
                        : "bg-gray-50 border-gray-300"
                    }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4`}
                    placeholder={`Enter your ${field.name}...`}
                    {...register(field.name, field.validation)}
                  />
                  {errors[field.name] && (
                    <small className="text-red-500 mt-1.5">
                      {errors[field.name]?.message?.toString() || ""}
                    </small>
                  )}
                </div>
              ))}
              <Alert />
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

export default Edit;
