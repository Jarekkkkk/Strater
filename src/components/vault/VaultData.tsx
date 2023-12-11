import Image from "next/image";
import FormatNumber from "../formats/formatNumber";

interface IVaultDataProps {}

const VaultData = () => {
  return (
    <div className="h-20 flex justify-between gap-10.5 mt-10 max-md:max-w-full max-md:flex-wrap max-md:justify-start max-md:gap-6 max-md:mt-10">
      {/* APR */}
      <div className="items-stretch self-stretch flex flex-col justify-between">
        <span className="text-gray-400 text-base whitespace-nowrap">
          APR Since Inception
        </span>
        <FormatNumber
          value={3.68}
          unit="%"
          skeletonClass="w-20 h-12"
          numberClass="text-black text-[32px] whitespace-nowrap"
        />
      </div>
      {/* AUM */}
      <div className="self-stretch flex flex-col justify-between">
        <span className="text-gray-400 text-base self-end">AUM</span>
        <div className="justify-between items-stretch self-stretch flex gap-1.5 mt-2.5">
          <FormatNumber
            value={1070}
            skeletonClass="w-19.5 h-12"
            numberClass="text-black text-[32px] whitespace-nowrap"
          />
          <span className="text-gray-400 text-base whitespace-nowrap self-end mb-1.6">
            SUI
          </span>
        </div>
      </div>
      <Image
        src="/images/vertical-seperator.svg"
        alt="vertical seperator"
        className="h-full object-contain object-center overflow-hidden self-center my-auto mx-2  max-md:hidden"
        width={1}
        height={73}
      />
      {/* My Positions */}
      <div className="items-stretch self-stretch flex grow flex-col">
        <span className="text-gray-400 text-base whitespace-nowrap">
          My Positions
        </span>
        <div className="flex items-center justify-between gap-2.5 mt-2.5 max-md:justify-start">
          <FormatNumber
            value={0}
            minFractionDigits={4}
            maxFractionDigits={4}
            skeletonClass="w-28 h-12"
            numberClass="text-black text-[32px] whitespace-nowrap"
          />
          <Image
            src="/images/sui-logo.svg"
            alt="sui logo"
            className="aspect-square object-contain object-center min-w-9 overflow-hidden self-center max-w-full my-auto rounded-[50%]"
            width={36}
            height={36}
          />
        </div>
      </div>
    </div>
  );
};

export default VaultData;
