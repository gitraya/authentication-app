import { FC } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

const Navbar: FC = () => {
  return (
    <nav className="bg-white flex items-center justify-between w-full sticky top-0 py-6 px-7 sm:px-20 z-10">
      <div className="w-36">
        <Image
          src="/devchallenges.svg"
          alt="Logo"
          width="131"
          height="19"
          layout="responsive"
        />
      </div>

      <Dropdown />
    </nav>
  );
};

export default Navbar;
