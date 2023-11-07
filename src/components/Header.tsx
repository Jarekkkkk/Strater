const Header = () => {
  return (
    <div className="fixed top-0 border-b-[color:var(--Gray-Text,#9C9C9C)] bg-white flex w-full flex-col px-20 py-6 border-b-[0.5px] border-solid max-md:max-w-full max-md:px-5 z-10">
      <div className="self-center flex w-full max-w-[1217px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
        <div className="text-black text-xl font-bold self-center my-auto">
          Strat-er
        </div>
        <div className="items-start self-stretch flex gap-0 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[145px] max-w-full px-9 py-4 rounded-md max-md:px-5">
            Overview
          </div>
          <div className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[154px] max-w-full px-9 py-4 rounded-md max-md:px-5">
            Martingale
          </div>
          <div className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[181px] max-w-full px-9 py-4 rounded-md max-md:px-5">
            Strategy Vault
          </div>
          <div className="text-black text-base self-stretch whitespace-nowrap justify-center items-center bg-white w-[147px] max-w-full px-9 py-4 rounded-md max-md:px-5">
            Portofolio
          </div>
        </div>
        <div className="text-white text-sm self-center whitespace-nowrap justify-center items-center bg-blue-600 w-32 max-w-full my-auto px-3 py-2 rounded-lg">
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Header;
