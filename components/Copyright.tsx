import { FC } from "react";

interface CopyrightProps {
  className?: string;
}

const Copyright: FC<CopyrightProps> = ({ className = "" }: CopyrightProps) => {
  return (
    <div
      className={`flex justify-between w-login-card mt-3 text-sm text-gray-500 ${className}`}
    >
      <span>
        created by{" "}
        <a
          href="https://github.com/gitraya"
          target="_blank"
          rel="noreferrer"
          className="underline text-gray-800"
        >
          gitraya
        </a>
      </span>
      <a href="https://devchallenges.io" target="_blank" rel="noreferrer">
        devChallenges.io
      </a>
    </div>
  );
};

export default Copyright;
