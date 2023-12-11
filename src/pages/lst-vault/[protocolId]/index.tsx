import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LST_VAULT_LIST } from "@/constants/lstVaultList";
import Header from "@/components/Header";
import BackButton from "@/components/buttons/BackButton";
import VaultTitle from "@/components/vault/VaultTitle";
import VaultData from "@/components/vault/VaultData";
import ConvertPanel from "@/components/lstVault/ConvertPanel";
import Footer from "@/components/Footer";
import { FiExternalLink } from "react-icons/fi";
import { MAINNET_EXPLORER } from "@/constants/urls";

const LSTSingleVaultPage = () => {
  const router = useRouter();
  const { protocolId } = router.query;

  if (!protocolId || protocolId === "" || protocolId === "null") {
    router.push("/");
  }

  const vaultBasicInfo = LST_VAULT_LIST[protocolId as string];

  if (!vaultBasicInfo) {
    router.push("/");
  }

  return (
    <div className="relative w-full justify-center items-center bg-[#ECECEE] flex flex-col xl:pt-25">
      <Header />
      <div className="w-full max-md:max-w-full bg-main bg-cover bg-center bg-no-repeat">
        <div className="flex justify-between w-full max-w-258 max-md:flex-col max-md:px-4 max-md:max-w-full max-md:mb-2.5 mx-auto pt-22 pb-56 max-md:pt-16 max-md:pb-16">
          {/* Information */}
          <div className="flex flex-col items-stretch w-[53%] max-md:w-full max-md:ml-0">
            <div className="relative flex flex-col max-md:max-w-full max-md:mt-10">
              <BackButton />
              <VaultTitle
                title="LST Transformer"
                basicInfo={{
                  name: vaultBasicInfo.name,
                  logo: vaultBasicInfo.logo,
                }}
              />
              <VaultData />
              <div className="w-full flex flex-col items-start gap-9 mt-16 max-md:mt-32 max-md:max-w-full max-md:gap-6">
                {/* Info */}
                <div className="items-stretch self-stretch flex flex-col max-md:max-w-full ">
                  <div className="text-black text-base max-md:max-w-full">
                    Intro
                  </div>
                  <div className="text-gray-400 text-xs mt-4.5 max-md:max-w-full max-md:mt-3">
                    {vaultBasicInfo.info}
                  </div>
                </div>
                {/* Risk */}
                <div className="items-stretch self-stretch flex flex-col max-md:max-w-full">
                  <div className="text-black text-base max-md:max-w-full">
                    Risk
                  </div>
                  <div className="text-gray-400 text-xs mt-4.5 max-md:max-w-full max-md:mt-3">
                    {vaultBasicInfo.risk}
                  </div>
                </div>
                {/* Contract */}
                <div className="items-stretch self-stretch flex flex-col max-md:max-w-full">
                  <div className="text-black text-base max-md:max-w-full">
                    Contract
                  </div>
                  {Object.values(vaultBasicInfo.contract).map(
                    (contract, index) => {
                      return (
                        <div
                          key={
                            contract.name.toLowerCase().replaceAll(" ", "_") +
                            index
                          }
                          className="w-full flex flex-col items-start gap-1.25 max-md:max-w-full"
                        >
                          <Link
                            href={MAINNET_EXPLORER.PROTOCOL + contract.address}
                            className="flex items-center gap-5 mt-4.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center text-gray-400 xl:hover:text-primary xl:hover:underline max-md:mt-3"
                          >
                            <div
                              className={cn(
                                contract.name.length > 25 ? "w-fit" : "w-25",
                                "text-xs"
                              )}
                            >
                              {contract.name}
                            </div>
                            <div className="w-36 text-xs">
                              {contract.address.slice(0, 9) +
                                "..." +
                                contract.address.slice(-9)}
                            </div>
                            <FiExternalLink className="object-contain object-center text-sm overflow-hidden" />
                          </Link>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Control Panel */}
          <ConvertPanel stakeAmount={"89320.923"} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LSTSingleVaultPage;
