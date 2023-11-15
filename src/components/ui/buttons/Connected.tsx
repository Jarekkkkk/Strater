import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectModal, useWallet } from "@suiet/wallet-kit";
import { motion } from "framer-motion";
import { AiOutlineCopy } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { toast } from "react-toastify";
import { URLS } from "@/constants/urls";

const Connected = () => {
  const { account, disconnect } = useWallet();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const handleDisconnect = async () => {
    await disconnect();
    toast.error("Disconnected");
  };
  const handleCopyText = async () => {
    await navigator.clipboard
      .writeText(account?.address || "")
      .then(() => toast.success("Copied to clipboard!"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-32 h-fit px-3 py-2 rounded-lg bg-[#2e79dc] text-white text-sm whitespace-nowrap mt-6 xl:mt-0">
        {account?.address.slice(0, 4)}...
        {account?.address.slice(-4)}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-[var(--color-gray-7)] z-100 py-2 px-3 dark:text-white text-black"
      >
        <DropdownMenuItem
          className="flex items-center justify-center  gap-2 py-3 hover:bg-[#2e79dc] dark:hover:bg-gray-600 hover:text-white"
          onClick={handleCopyText}
        >
          <AiOutlineCopy strokeWidth={2} className="h-4 w-4" />
          <span className="sm:text-sm">Copy Address</span>
        </DropdownMenuItem>
        <ConnectModal
          open={showConnectModal}
          onOpenChange={(open) => setShowConnectModal(open)}
        >
          <DropdownMenuItem className="flex items-center justify-center gap-2 py-3 hover:bg-[#2e79dc] dark:hover:bg-gray-600 hover:text-white">
            <FaExchangeAlt strokeWidth={2} className="h-4 w-4" />
            <DropdownMenuLabel className="text-sm">
              Change Wallet
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </ConnectModal>
        <DropdownMenuItem
          className="flex items-center justify-center gap-2 py-3 hover:bg-[#2e79dc] dark:hover:bg-gray-600 hover:text-white"
          onClick={() =>
            window.open(`${URLS.suivision}${account?.address ?? ""}`)
          }
        >
          <SlMagnifier strokeWidth={2} className="h-4 w-4" />
          <DropdownMenuLabel className="text-sm">
            Sui Explorer
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <div className="my-1 border-t border-t-gray" />
        <DropdownMenuItem
          className="flex items-center justify-center gap-2 py-3 hover:bg-[#2e79dc] dark:hover:bg-gray-600 hover:text-white"
          onClick={handleDisconnect}
        >
          <DropdownMenuLabel className="text-sm">Disconnect</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Connected;
