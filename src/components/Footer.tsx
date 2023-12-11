import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-zinc-800 self-stretch flex w-full flex-col pt-16 pb-12 px-20 max-md:max-w-full max-md:px-5">
      <div className="self-center flex w-full max-w-[1080px] flex-col max-md:max-w-full">
        <div className="self-center flex flex-col w-full items-start justify-between max-md:max-w-full">
          {/* Social Links */}
          <div className="items-start self-stretch flex w-fit gap-4 ">
            <Link
              href={"#"}
              className="xl:hover:scale-110 xl:active:scale-90 xl:ease-in-out xl:duration-300"
            >
              <Image
                src="/images/twitter-round.svg"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
                alt="x"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={"#"}
              className="xl:hover:scale-110 xl:active:scale-90 xl:ease-in-out xl:duration-300"
            >
              <Image
                src="/images/medium-round.svg"
                className="aspect-square object-contain object-center w-full overflow-hidden flex-1"
                alt="medium"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={"#"}
              className="xl:hover:scale-110 xl:active:scale-90 xl:ease-in-out xl:duration-300"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22e4afea-7301-472b-8bd4-b7e15f737a6b?"
                className="w-6 aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
            </Link>
            <Link
              href={"#"}
              className="xl:hover:scale-110 xl:active:scale-90 xl:ease-in-out xl:duration-300"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/70e3ae82-c44e-4050-9548-b427be955b69?"
                className="w-6 aspect-square object-contain object-center w-full overflow-hidden flex-1"
              />
            </Link>
          </div>
          {/* Navs */}
          <div className="w-full flex items-centers justify-between self-stretch mt-6 max-md:flex-col max-md:gap-6">
            <div className="w-65 items-start flex gap-2.5 max-md:justify-center ">
              <Link
                href={"#"}
                className="text-white text-base hover:hover:underline"
              >
                Terms of service
              </Link>
              <div className="text-white text-base self-stretch"> | </div>
              <Link
                href={"#"}
                className="text-white text-base hover:underline self-stretch whitespace-nowrap"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="items-start flex w-[182px] justify-between gap-5">
              <Link
                href={"#"}
                className="text-gray-400 text-base hover:underline self-stretch"
              >
                Docs
              </Link>
              <Link
                href={"#"}
                className="text-gray-400 text-base hover:underline self-stretch"
              >
                Help
              </Link>
              <Link
                href={"#"}
                className="text-gray-400 text-base hover:underline self-stretch whitespace-nowrap"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/images/horizontal-seperator.svg"
        alt="horizontal seperator"
        className="w-301 h-[0.5px] mt-20 max-md:mt-12"
        width={1204}
        height={1}
      />
      <div className="text-white text-xs font-light self-center whitespace-nowrap mt-8 max-md:mt-10">
        © {year} All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
