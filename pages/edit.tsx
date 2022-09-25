import { Fragment, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import { setNotification } from "reducers/notification";
import { updateUser } from "reducers/user";
import { RootState } from "reducers";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { userFields } from "utils/configs";
import Copyright from "components/Copyright";
import Navbar from "components/Navbar";
import Alert from "components/Alert";

const Edit: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const [currentImage, setCurrentImage] = useState(user.photoUrl);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const userValues: any = {};

      for (const [key, value] of Object.entries(values)) {
        if (value) userValues[key] = value;
      }

      if (userValues?.photo[0]) {
        userValues.photo = currentImage;
      } else {
        delete userValues.photo;
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

    setLoading(false);
  };

  const onImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCurrentImage(e.target?.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Authentication App - Edit Account</title>
      </Head>
      <Navbar />
      <main className="flex flex-col items-center justify-center pb-16">
        <div className="w-full sm:w-9/12 lg:w-3/5 flex flex-col">
          <button
            className="w-full my-6 px-7 sm:px-0 text-left flex items-center gap-1 text-blue-400 text-lg"
            onClick={router.back}
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back_ios
            </span>
            <span>Back</span>
          </button>
          <div className="flex flex-col sm:border rounded-xl py-7 px-7 sm:px-12">
            <div className="flex flex-col mb-4">
              <h2 className="text-2xl mb-1">Change Info</h2>
              <p className="text-xs font-medium text-gray-400">
                Changes will be reflected to every services
              </p>
            </div>
            <form className="w-full lg:w-2/3" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="photo"
                className="flex py-3 font-medium items-center gap-7 cursor-pointer"
              >
                <div className="relative">
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt="User Profile"
                      width="64"
                      height="64"
                      layout="intrinsic"
                      className="rounded-lg object-center object-cover"
                    />
                  ) : (
                    <div className="bg-gray-700 w-16 h-16 rounded-lg flex justify-center items-center" />
                  )}
                  <div className="absolute inset-0 bg-transparent w-16 h-16 rounded-lg flex justify-center items-center">
                    <FaCamera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="uppercase text-xs text-gray-400">
                  change photo
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  className="hidden"
                  {...register("photo", {
                    onChange: onImageChange,
                    validate: (value) =>
                      !value[0] ||
                      value[0]?.size <= 1000000 ||
                      "Image size should be less than 1MB",
                  })}
                />
              </label>
              {errors.photo && (
                <small className="text-red-500 mb-1">
                  {errors.photo?.message?.toString() || ""}
                </small>
              )}

              {userFields.map((field: any) => (
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
              <button
                disabled={loading}
                className={`${
                  loading
                    ? "bg-blue-200 hover:bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-800"
                } text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none my-3`}
              >
                Save
              </button>
            </form>
          </div>
          <Copyright />
        </div>
      </main>
    </Fragment>
  );
};

export default Edit;
