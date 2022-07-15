import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";

const Dropdown: FC = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex items-center gap-3">
            <div className="bg-black w-8 h-8 rounded-md"></div>
            <span className="text-xs font-bold">Raya</span>
            <span className="material-symbols-rounded">
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
                  <a
                    href="#"
                    className="rounded-lg px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-symbols-rounded mr-3 text-xl">
                      account_circle
                    </span>
                    My Profile
                  </a>
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
                  <a
                    href="#"
                    className="rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center"
                  >
                    <span className="material-symbols-rounded mr-3 text-xl">
                      logout
                    </span>
                    Logout
                  </a>
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
