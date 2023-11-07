import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useWallet } from "@suiet/wallet-kit";
import Connected from "./ui/buttons/Connected";
import Disconnected from "./ui/buttons/Disconnected";

const Header = () => {
  const { connected } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 bg-white flex w-full flex-col px-20 py-6  max-md:max-w-full max-md:px-5 z-50",
          isMenuOpen
            ? ""
            : "border-b-[color:var(--Gray-Text,#9C9C9C)] border-b-[0.5px] border-solid"
        )}
      >
        <div className="relative self-center flex w-full max-w-[1217px] items-center justify-between gap-5">
          <Link
            href={"/"}
            className="text-black text-xl font-bold self-center my-auto"
          >
            Strat-er
          </Link>
          <div className="hidden items-center xl:flex gap-0">
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[145px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Overview
            </Link>
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[154px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Martingale
            </Link>
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[181px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Strategy Vault
            </Link>
            <Link
              href={"#"}
              className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[147px] max-w-full px-9 py-4 rounded-md max-md:px-5"
            >
              Portofolio
            </Link>
          </div>
          <div className="hidden h-full xl:flex items-center">
            {connected ? <Connected /> : <Disconnected />}
          </div>

          <button
            className="xl:hidden absolute top-[10%] right-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? (
              <AiOutlineMenu className="cursor-pointer" size={24} />
            ) : (
              <AiOutlineClose className="cursor-pointer" size={24} />
            )}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "fixed top-0 w-full h-screen bg-black ease-in-out duration-300 ",
          isMenuOpen ? "opacity-20 z-30" : "opacity-0 -z-10"
        )}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={cn(
          "fixed top-19 w-[50%] h-full bg-white ease-in-out duration-300 flex flex-col",
          isMenuOpen ? "right-0 z-40" : "-right-full"
        )}
      >
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[145px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Overview
        </Link>
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[154px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Martingale
        </Link>
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[181px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Strategy Vault
        </Link>
        <Link
          href={"#"}
          className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[147px] max-w-full px-9 py-4 rounded-md max-md:px-5"
        >
          Portofolio
        </Link>
        <div className="self-center justify-center items-center mt-6">
          {connected ? <Connected /> : <Disconnected />}
        </div>
      </div>
    </>
  );
};

export default Header;
