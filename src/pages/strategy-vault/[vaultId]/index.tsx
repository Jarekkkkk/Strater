const SingleStrategyVaultPage = () => {
  return (
    <div className="items-stretch bg-slate-200 flex flex-col">
      <div className="border-b-[color:var(--Gray-Text,#9C9C9C)] bg-white flex w-full flex-col items-center px-5 py-6 border-b-[0.5px] border-solid max-md:max-w-full">
        <div className="flex w-full max-w-[1217px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="text-black text-xl font-bold self-center my-auto">
            Start-er
          </div>
          <div className="items-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-black text-base whitespace-nowrap justify-center items-center bg-white grow px-5 py-4 rounded-md">
              Overview
            </div>
            <div className="text-black text-base whitespace-nowrap justify-center items-center bg-white grow px-5 py-4 rounded-md">
              Martingale
            </div>
            <div className="text-black text-base whitespace-nowrap justify-center items-center bg-white grow px-5 py-4 rounded-md">
              Strategy Vault
            </div>
            <div className="text-black text-base whitespace-nowrap justify-center items-center bg-white grow px-5 py-4 rounded-md">
              Portofolio
            </div>
          </div>
          <div className="text-white text-sm whitespace-nowrap justify-center items-stretch bg-blue-600 self-center my-auto px-3 py-2 rounded-lg">
            Connect Wallet
          </div>
        </div>
      </div>
      <div className="bg-white flex w-full flex-col items-stretch max-md:max-w-full">
        <div className="flex-col overflow-hidden relative flex min-h-[970px] w-full items-center pt-20 pb-56 px-5 max-md:max-w-full max-md:pb-24">
          <img
            loading="lazy"
            srcSet="..."
            className="absolute z-[-1] h-full w-full object-cover object-center inset-0"
          />
          <div className="relative mb-0 w-full max-w-[1032px] max-md:max-w-full max-md:mb-2.5">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[61%] max-md:w-full max-md:ml-0">
                <div className="relative flex grow flex-col max-md:max-w-full max-md:mt-10">
                  <div className="items-stretch flex w-[75px] max-w-full gap-3.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ee277ba-e0fc-4345-bf2a-9ba451e420d6?"
                      className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
                    />
                    <div className="text-neutral-400 text-base whitespace-nowrap">
                      Back
                    </div>
                  </div>
                  <div className="text-black text-4xl whitespace-nowrap mt-5">
                    Yield Boost
                  </div>
                  <div className="items-stretch flex w-[237px] max-w-full gap-4 mt-5">
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full rounded-[50%]"
                    />
                    <div className="text-neutral-800 text-2xl whitespace-nowrap">
                      Bucket Protocol
                    </div>
                  </div>
                  <div className="items-start self-stretch flex justify-between gap-5 mt-10 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
                    <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-gray-400 text-base whitespace-nowrap">
                        APR Since Inception
                      </div>
                      <div className="text-black text-3xl whitespace-nowrap mt-2.5">
                        3.68%
                      </div>
                    </div>
                    <div className="self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-gray-400 text-base whitespace-nowrap">
                        AUM
                      </div>
                      <div className="justify-between items-stretch self-stretch flex gap-1.5 mt-2.5">
                        <div className="text-black text-3xl">1.07K</div>
                        <div className="text-gray-400 text-base whitespace-nowrap mt-5 self-start">
                          SUI
                        </div>
                      </div>
                    </div>
                    <div className="w-px shrink-0 h-[73px] mt-1.5 self-start" />
                    <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-gray-400 text-base whitespace-nowrap">
                        My Positions
                      </div>
                      <div className="items-stretch flex justify-between gap-2.5 mt-2.5">
                        <div className="text-black text-3xl">0.0000</div>
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-square object-contain object-center w-[35px] overflow-hidden self-center shrink-0 max-w-full my-auto rounded-[50%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="items-stretch self-stretch flex flex-col mt-16 max-md:max-w-full max-md:mt-10">
                    <div className="text-black text-base max-md:max-w-full">
                      Intro
                    </div>
                    <div className="text-gray-400 text-xs mt-5 max-md:max-w-full">
                      Users Deposit SUI and auto swap half for USDC and provide
                      liquidity for SUI/BUCK on DEX to earn trading fees and SUI
                      rewards.
                    </div>
                  </div>
                  <div className="items-stretch self-stretch flex flex-col mt-9 max-md:max-w-full">
                    <div className="text-black text-base max-md:max-w-full">
                      Risk
                    </div>
                    <div className="text-gray-400 text-xs mt-5 max-md:max-w-full">
                      Users Deposit SUI and auto swap half for USDC and provide
                      liquidity for SUI/BUCK on DEX to earn trading fees and SUI
                      rewards.
                    </div>
                  </div>
                  <div className="items-stretch self-stretch flex flex-col mt-9 max-md:max-w-full">
                    <div className="text-black text-base max-md:max-w-full">
                      Contract
                    </div>
                    <div className="flex justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                      <div className="text-gray-400 text-xs">
                        Bucket Contract
                      </div>
                      <div className="text-gray-400 text-xs">
                        0x712cABa…cc6D2Fb30
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8c410d-ab35-4823-87e4-2f8c74269bd0?"
                        className="aspect-square object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full"
                      />
                    </div>
                    <div className="flex justify-between gap-5 mt-1.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
                      <div className="text-gray-400 text-xs">Strateg Vault</div>
                      <div className="text-gray-400 text-xs">
                        0x712cABa…cc6D2Fb30
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/33bc127b-3560-482c-a53a-77178284455b?"
                        className="aspect-square object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[39%] ml-5 max-md:w-full max-md:ml-0">
                <div className="shadow-lg bg-white relative flex w-full flex-col mt-32 mx-auto pl-12 pr-14 pt-16 pb-14 rounded-md max-md:mt-10 max-md:px-5">
                  <div className="text-black text-xl self-stretch">
                    Convert your SUI collateral to LST and earn 4.7% APR
                  </div>
                  <div className="flex w-[142px] max-w-full gap-5 mt-9 self-end">
                    <div className="text-neutral-400 text-xs">Staked SUI</div>
                    <div className="text-neutral-400 text-right text-xs underline self-stretch whitespace-nowrap">
                      89,320.923
                    </div>
                  </div>
                  <div className="items-center bg-neutral-100 self-stretch flex w-full justify-between gap-5 mt-3.5 pl-6 pr-9 py-7 border-[0.3px] border-solid border-gray-400 max-md:px-5">
                    <div className="text-black text-base my-auto">10,000</div>
                    <div className="self-stretch flex items-stretch justify-between gap-3.5">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                      />
                      <div className="text-black text-base self-center whitespace-nowrap my-auto">
                        SUI
                      </div>
                    </div>
                  </div>
                  <div className="self-center flex justify-between gap-5 mt-7">
                    <div className="flex grow basis-[0%] flex-col items-stretch">
                      <div className="text-black text-xs">Validator APY</div>
                      <div className="text-black text-xs mt-5">
                        Validator Fee
                      </div>
                      <div className="text-black text-xs mt-5">
                        Exchange Rate
                      </div>
                      <div className="text-black text-xs mt-4">
                        Validator APY
                      </div>
                    </div>
                    <div className="self-stretch flex grow basis-[0%] flex-col">
                      <div className="self-stretch flex flex-col items-stretch pl-16 max-md:pl-5">
                        <div className="text-black text-right text-xs">
                          4.41 %
                        </div>
                        <div className="text-black text-right text-xs ml-3.5 mt-5 max-md:ml-2.5">
                          0 %
                        </div>
                      </div>
                      <div className="text-black text-right text-xs self-stretch mt-5">
                        1 SUI ≈ 1.00 afSUI
                      </div>
                      <div className="text-black text-right text-xs mt-5">
                        9,999 afSUI
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-600 text-xl whitespace-nowrap justify-center items-center border bg-white self-stretch mt-12 px-5 py-2.5 rounded-lg border-solid border-blue-600 max-md:mt-10">
                    Convert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 flex w-full flex-col items-center pt-16 pb-12 px-5 max-md:max-w-full">
        <div className="flex w-full max-w-[1080px] flex-col items-stretch max-md:max-w-full">
          <div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
            <div className="items-stretch flex grow basis-[0%] flex-col">
              <div className="items-stretch flex justify-between gap-5 max-md:justify-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ffb2430-efea-45f4-ad52-57783a4869bb?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d8d9abd-44c8-46b7-b0d3-d3fb121db958?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3b31ccc-b79b-47cc-bd0a-b4fad665ea39?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/02402882-a17d-4dd6-88bc-b8e669b6150a?"
                  className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                />
              </div>
              <div className="items-stretch flex gap-2.5 mt-6 max-md:justify-center">
                <div className="text-white text-base underline">
                  Terms of service
                </div>
                <div className="text-white text-base"> | </div>
                <div className="text-white text-base underline whitespace-nowrap">
                  Privacy Policy
                </div>
              </div>
              <div className="text-gray-400 text-xs whitespace-nowrap mt-6">
                Developed by gugulabs
              </div>
            </div>
            <div className="items-stretch self-center flex justify-between gap-5 my-auto max-md:justify-center">
              <div className="text-gray-400 text-base underline">Docs</div>
              <div className="text-gray-400 text-base underline">Help</div>
              <div className="text-gray-400 text-base underline whitespace-nowrap">
                Blog
              </div>
            </div>
          </div>
          <div className="text-white text-xs font-light self-center whitespace-nowrap mt-20 max-md:mt-10">
            © 2023 All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStrategyVaultPage;
