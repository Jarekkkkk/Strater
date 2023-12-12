import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import FormatNumber from "../formats/formatNumber";
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSuiClient } from "@mysten/dapp-kit";
import { createBucketLeverageTx } from "@/lib/bucket/strategies";
import { toast } from "react-toastify";
import { Link } from "lucide-react";

interface IConvertPanelProps {
  stakeAmount: string;
}

const LeveragePanel = ({ stakeAmount }: IConvertPanelProps) => {
  const [inputAmount, setInputAmount] = useState("");
  const [leverage, setLeverage] = useState([2]);
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();

  const handleLeverage = async () => {
    if (!account || !inputAmount) return;
    const tx = await createBucketLeverageTx({
      suiClient,
      senderAddress: account.address,
      inputAmount: Math.floor(Number(inputAmount) * 10**9),
      leverage: leverage[0],
      lstSymbol: 'afSUI',
    });

    if (!tx) return;
    tx.setGasBudget(50_000_000);
    signAndExecuteTransactionBlock({
      transactionBlock: tx,
      chain: "sui:mainnet"
    },
    {
      // TODO: unmark after adding toast in layout
      onSuccess: (res) => {
        suiClient.waitForTransactionBlock({ digest: res.digest }).then(() => {
          if (!!res.digest) {
            toast.success(<div><Link target="_blank" href="https://app.bucketprotocol.io/position">Success! Click to see your position</Link></div>);
          } else {
            toast.error("Exceed slippage! Try smaller amount");
          }
        })
      },
      onError: () => {
        toast.error("Exceed slippage! Try smaller amount");
      },
    })
  };

  return (
    <div className="w-[36%] flex flex-col items-center max-md:w-full">
      <div className="shadow-lg bg-white relative flex w-full h-160 flex-col mt-2 mx-auto py-13.5 px-13 rounded-md max-md:mt-10 max-md:px-10">
        <span className="text-black text-xl self-stretch">
          Supply Collateral
        </span>
        {/* User Balance */}
        <div className="flex max-w-full gap-5 mt-5.5 self-end">
          <span className="text-neutral-400 text-xs">Balance</span>
          <FormatNumber
            value={stakeAmount}
            notation="standard"
            maxFractionDigits={4}
            minFractionDigits={2}
            skeletonClass="w-16 h-4"
            numberClass="text-neutral-400 text-right text-xs underline self-stretch whitespace-nowrap"
          />
        </div>
        {/* Amount field */}
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
        {/* Slider bar */}
        <div className="w-full h-15 mt-6">
          <Slider
            defaultValue={[2]}
            max={3}
            min={1.1}
            step={0.01}
            className="mt-9"
            value={leverage}
            onValueChange={setLeverage}
          />
        </div>
        {/* Leverage Information */}
        <div className="self-center w-full flex flex-col gap-2.5 mt-9">
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">SUI Price</div>
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
            <div className="text-black text-xs">Slippage</div>
            <p className="flex items-center gap-1.5">
              <span className="text-black text-right text-xs">{`<= `}</span>
              <FormatNumber
                value={2}
                unit="%"
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
            </p>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Collateral </div>
            <FormatNumber
              value={20000}
              notation="standard"
              unit="SUI"
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Your Debt</div>
            <FormatNumber
              value={9999}
              notation="standard"
              unit="BUCK"
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">{`Max LTV ( SUI )`}</div>
            <FormatNumber
              value={90}
              unit="%"
              minFractionDigits={0}
              spaceWithUnit
              skeletonClass="w-16 h-4"
              numberClass="text-black text-right text-xs"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Borrow Limit</div>
            <p className="flex items-center gap-1.5">
              <FormatNumber
                value={4500}
                notation="standard"
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
              <span className="text-black text-right text-xs">→</span>
              <FormatNumber
                value={9000}
                unit="BUCK"
                notation="standard"
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
            </p>
          </div>
          <div className="w-full flex justify-between">
            <div className="text-black text-xs">Liquidation Price</div>
            <p className="flex items-center gap-1.5">
              <div className="text-black text-right text-xs">{`~`}</div>
              <FormatNumber
                value={0.45}
                unit="SUI"
                notation="standard"
                maxFractionDigits={4}
                minFractionDigits={0}
                spaceWithUnit
                skeletonClass="w-16 h-4"
                numberClass="text-black text-right text-xs"
              />
            </p>
          </div>
        </div>
        {/* Leverage Button */}
        <button
          className="text-blue-600 text-xl whitespace-nowrap justify-center items-center border bg-white self-stretch mt-9 px-5 py-2.5 rounded-lg border-solid border-blue-600 max-md:mt-10 xl:hover:scale-105 xl:active:scale-95 ease-in-out duration-300"
          onClick={handleLeverage}
        >
          Leverage
        </button>
      </div>
    </div>
  );
};

export default LeveragePanel;
