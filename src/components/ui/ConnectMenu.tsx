import { useTheme } from "next-themes";
import Image from "next/image";
import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { BiExit } from "react-icons/bi";
import { SlMagnifier } from "react-icons/sl";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";

const ConnectMenu = () => {
  const address = useCurrentAccount()?.address;
  const { mutate: disconnectWallet } = useDisconnectWallet();

  return (
    <>
      <>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              `flex h-[50px] w-[160px] items-center justify-center gap-x-2 rounded-xl bg-[#3c75df] text-base font-semibold text-white md:h-9 md:w-[130px] md:text-sm`
            )}
          >
            {address?.slice(0, 4) + "..." + address?.slice(-3)}
            {!address ? "Connect" : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-[160px] flex-col items-center gap-y-2 bg-white md:w-[130px]">
            <DropdownMenuItem className="DropdownMenuItem">
              <Link
                href={`https://suivision.xyz/account/${address}`}
                target="_blank"
              >
                <button className="flex w-[150px] items-center justify-center gap-2 rounded-lg py-3 hover:bg-[#2e79dc] text-black hover:text-white md:w-[120px]">
                  <SlMagnifier strokeWidth={2} className="h-4 w-4" />
                  <div className="sm:text-sm">Explorer</div>
                </button>
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="DropdownMenuItem">
                <button
                  className="flex w-[150px] items-center justify-center gap-2 rounded-lg py-3 hover:bg-[#2e79dc] hover:text-white md:w-[120px]"
                  onClick={() => onOpen()}
                >
                  <HiSwitchHorizontal
                    strokeWidth={2}
                    color="white"
                    className="h-4 w-4"
                  />
                  <div className="text-white sm:text-sm">Switch Account</div>
                </button>
              </DropdownMenuItem> */}
            <DropdownMenuItem className="DropdownMenuItem">
              <button
                className="flex w-[150px] items-center justify-center gap-2 rounded-lg py-3 text-black hover:bg-[#2e79dc] hover:text-white md:w-[120px]"
                onClick={() => disconnectWallet()}
              >
                <BiExit strokeWidth={2} className="h-4 w-4" />
                <div className="sm:text-sm">Disconnect</div>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </>
  );
};

export default ConnectMenu;
