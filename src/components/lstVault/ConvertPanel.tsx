import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import FormatNumber from "../formats/formatNumber";

interface IConvertPanelProps {
  stakeAmount: string;
}

const ConvertPanel = ({ stakeAmount }: IConvertPanelProps) => {
  //TODO: Justa
  const [inputAmount, setInputAmount] = useState("");

  //TODO: Justa
  const handleConvert = () => {};

  if (
    !stakeAmount ||
    stakeAmount === "" ||
    stakeAmount === "null" ||
    stakeAmount === "0"
  ) {
    return (
      <div className="w-[36%] flex flex-col items-center max-md:w-full">
        <div className="shadow-lg bg-white relative flex w-full h-60 flex-col mt-31 mx-auto py-14 px-15 rounded-md max-md:mt-10 max-md:px-10 items-start">
          <span className="text-black text-xl self-stretch text-justify">
            You don’t have any Sui collateral on bucket
          </span>

          <Link
            href={"#"}
            className="flex justify-center items-center gap-2 mt-7 max-md:mt-7 xl:hover:scale-105 xl:active:scale-95 ease-in-out duration-300"
          >
            <span className="text-black text-xl whitespace-nowrap">
              Stake SUI on Bucket
            </span>
            <FiExternalLink className="object-contain object-center text-black text-xl overflow-hidden" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[36%] flex flex-col items-center max-md:w-full">
      <div className="shadow-lg bg-white relative flex w-full h-128 flex-col mt-31 mx-auto py-13.5 px-13 rounded-md max-md:mt-10 max-md:px-10">
        <span className="w-fit text-black text-xl self-stretch text-justify">
          Convert your SUI collateral to LST and earn{" "}
          <FormatNumber
            value={4.7}
            unit="%"
            maxFractionDigits={4}
            minFractionDigits={0}
            skeletonClass="w-11 h-7"
            numberClass="text-black text-xl self-stretch"
          />
          <span className="text-black text-xl self-stretch"> APR</span>
        </span>
        <div className="flex max-w-full gap-5 mt-5.5 self-end">
          <span className="text-neutral-400 text-xs">Staked SUI</span>
          <FormatNumber
            value={stakeAmount}
            notation="standard"
            maxFractionDigits={4}
            minFractionDigits={2}
            skeletonClass="w-16 h-4"
            numberClass="text-neutral-400 text-right text-xs underline self-stretch whitespace-nowrap"
          />
        </div>
        <div className="items-center bg-neutral-100 self-stretch flex w-full gap-2 mt-3.5 pl-6 pr-8 py-6 border-[0.3px] border-solid border-gray-400 max-md:px-5">
          <input
            className="text-black text-base caret-black w-full placeholder:text-neutral-400 bg-transparent outline-none"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
          <div className="self-stretch w-15 flex items-stretch justify-between gap-3">
            <Image
              src="/images/sui-logo-white.svg"
              alt="sui logo"
              className="aspect-square object-contain object-center min-w-6 overflow-hidden max-w-full rounded-[50%]"
              width={24}
              height={24}
            />
            <span className="text-black text-base self-center whitespace-nowrap my-auto">
              SUI
            </span>
          </div>
        </div>
        <div className="self-center w-full flex flex-col gap-2.5 mt-5.5">
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Validator APY</div>
            <FormatNumber
              value={4.41}
              unit="%"
              maxFractionDigits={4}
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Validator Fee</div>
            <FormatNumber
              value={0}
              unit="%"
              maxFractionDigits={4}
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Exchange Rate</div>

            <p className="flex items-center gap-1.5">
              <FormatNumber
                value={1}
                unit="SUI"
                maxFractionDigits={4}
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
              <span className="text-black text-right text-xs">≈</span>
              <FormatNumber
                value={1}
                unit="afSUI"
                maxFractionDigits={4}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
            </p>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">To Receive</div>
            <FormatNumber
              value={9999}
              unit="afSUI"
              notation="standard"
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
        </div>
        <button
          className="text-blue-600 text-xl whitespace-nowrap justify-center items-center border bg-white self-stretch mt-12 px-5 py-2.5 rounded-lg border-solid border-blue-600 max-md:mt-10 xl:hover:scale-105 xl:active:scale-95 ease-in-out duration-300"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default ConvertPanel;
