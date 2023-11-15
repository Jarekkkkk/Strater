import { type UseDisclosureProps } from "@/hooks/useDisclosure";
import {
  useConnectWallet,
  useCurrentAccount,
  useWallets,
} from "@mysten/dapp-kit";
import Image from "next/image";
import { useEffect } from "react";

type ConnectProps = UseDisclosureProps;

const Connect = (props: ConnectProps) => {
  const { onClose } = props;
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const account = useCurrentAccount();
  useEffect(() => {
    if (account) {
      onClose?.();
    }
  }, [account, onClose]);
  return (
    <div
      className={`w-110 flex flex-col gap-4 bg-black px-16 py-10 text-white`}
    >
      <span className="flex w-full items-center justify-center text-3xl font-semibold">
        Connect Wallet
      </span>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.name}>
            <button
              className="my-2 flex h-[3rem] w-full items-center rounded-lg bg-blue-500 pl-4 text-white"
              onClick={() => {
                connect({ wallet });
              }}
            >
              {wallet.icon ? (
                <Image
                  src={wallet.icon}
                  alt={`${wallet.name} icon`}
                  className="mr-2 inline-block"
                  width={24}
                  height={24}
                />
              ) : null}
              {wallet.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="text-white hover:cursor-pointer"
        onClick={() => onClose?.()}
      >
        Close
      </button>
    </div>
  );
};

export default Connect;
