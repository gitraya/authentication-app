import { FC, useState } from "react";
import Image from "next/image";

const Navbar: FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex items-center justify-between w-full sticky top-0 py-6 px-20 z-10">
      <div className="w-36">
        <Image
          src="/devchallenges.svg"
          alt="Logo"
          width="131"
          height="19"
          layout="responsive"
        />
      </div>

      <button className="flex items-center gap-3" onClick={toggleDropdown}>
        <div className="bg-black w-8 h-8 rounded-md"></div>
        <span className="text-xs font-bold">Raya</span>
        <span className="material-symbols-rounded">arrow_drop_down</span>
      </button>

      <div
        className={`${
          dropdownOpen ? "" : "hidden"
        } z-20 origin-top-right absolute right-20 top-20 bg-white divide-y divide-gray-200 rounded-xl border shadow w-44 h-auto`}
      >
        <ul className="py-4 px-3 text-sm text-gray-700">
          <li>
            <a
              href="#"
              className="rounded-lg px-4 py-2 hover:bg-gray-100 flex items-center"
            >
              <span className="material-symbols-rounded mr-3 text-xl">
                account_circle
              </span>{" "}
              My Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="rounded-lg px-4 py-2 hover:bg-gray-100 flex items-center"
            >
              <span className="material-symbols-rounded mr-3 text-xl">
                group
              </span>{" "}
              Group Chat
            </a>
          </li>
        </ul>
        <div className="py-4 px-3">
          <a
            href="#"
            className="rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center"
          >
            <span className="material-symbols-rounded mr-3 text-xl">
              logout
            </span>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
