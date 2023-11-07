const Footer = () => {
  return (
    <div className="bg-zinc-800 self-stretch flex w-full flex-col pt-16 pb-12 px-20 max-md:max-w-full max-md:px-5">
      <div className="self-center flex w-full max-w-[1080px] flex-col max-md:max-w-full">
        <div className="self-center flex w-full items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="items-start self-stretch flex flex-col w-[246px]">
            <div className="items-start self-stretch flex w-full justify-between gap-5 max-md:justify-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/310494d9-c76b-4312-9e6c-d2f46cd33c2f?"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/92ed2675-ddd1-464d-bbf7-2c6697de25cd?"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22e4afea-7301-472b-8bd4-b7e15f737a6b?"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/70e3ae82-c44e-4050-9548-b427be955b69?"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
            </div>
            <div className="items-start self-stretch flex gap-2.5 mt-6 max-md:justify-center">
              <div className="text-white text-base underline">
                Terms of service
              </div>
              <div className="text-white text-base self-stretch"> | </div>
              <div className="text-white text-base underline self-stretch whitespace-nowrap">
                Privacy Policy
              </div>
            </div>
            <div className="text-gray-400 text-xs self-stretch whitespace-nowrap mt-6">
              Developed by gugulabs
            </div>
          </div>
          <div className="items-start self-center flex w-[182px] max-w-full justify-between gap-5 my-auto max-md:justify-center">
            <div className="text-gray-400 text-base underline self-stretch">
              Docs
            </div>
            <div className="text-gray-400 text-base underline self-stretch">
              Help
            </div>
            <div className="text-gray-400 text-base underline self-stretch whitespace-nowrap">
              Blog
            </div>
          </div>
        </div>
        <div className="text-white text-xs font-light self-center whitespace-nowrap mt-20 max-md:mt-10">
          © 2023 All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
