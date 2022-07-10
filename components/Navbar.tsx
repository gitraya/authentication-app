import { FC } from "react";
import Image from "next/image";

const Navbar: FC = () => {
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
      <div className="flex items-center gap-3">
        <div className="bg-black w-8 h-8 rounded-md"></div>
        <span className="text-xs font-bold">Raya</span>
        <span className="material-symbols-rounded">arrow_drop_down</span>
      </div>
    </nav>
  );
};

export default Navbar;
