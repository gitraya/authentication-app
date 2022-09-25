import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { logoutUser } from "reducers/user";
import { RootState } from "reducers";

const Dropdown: FC = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutUser());

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-3">
            {user?.photoUrl ? (
              <Image
                src={user.photoUrl}
                alt="User Profile"
                width="32"
                height="32"
                layout="intrinsic"
                className="rounded-lg object-center object-cover"
              />
            ) : (
              <div className="bg-gray-700 w-8 h-8 rounded-md flex justify-center items-center">
                <FaUserAlt className="w-3 h-3 text-white" />
              </div>
            )}
            <span className="text-xs font-bold hidden sm:block">
              {user?.name || user?.email}
            </span>
            <span className="material-symbols-rounded hidden sm:block">
              arrow_drop_{open ? "up" : "down"}
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-20 origin-top-right absolute right-0 mt-5 bg-white divide-y divide-gray-200 rounded-xl border shadow w-44 h-auto focus:outline-none">
              <div className="py-4 px-3 text-sm text-gray-700">
                <Menu.Item>
                  <div>
                    <Link href="/" passHref>
                      <a className="rounded-lg px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="material-symbols-rounded mr-3 text-xl">
                          account_circle
                        </span>
                        My Profile
                      </a>
                    </Link>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <a
                    href="#"
                    className="rounded-lg px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-symbols-rounded mr-3 text-xl">
                      group
                    </span>
                    Group Chat
                  </a>
                </Menu.Item>
              </div>
              <div className="py-4 px-3">
                <Menu.Item>
                  <button
                    onClick={logout}
                    className="w-full rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-symbols-rounded mr-3 text-xl">
                      logout
                    </span>
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};

export default Dropdown;
