import {
  EthosWallet,
  SuiWallet,
  SuietWallet,
  WalletProvider,
  defineWallet,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const CustomizeWallet = defineWallet({
  name: "OKX Wallet",
  iconUrl: "/okxWallet.png",
  downloadUrl: {
    browserExtension:
      "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
  },
  label: "OKX Wallet",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider
      defaultWallets={[SuiWallet, EthosWallet, SuietWallet, CustomizeWallet]}
    >
      <Component {...pageProps} />
    </WalletProvider>
  );
}
