import Image from "next/image";

interface IVaultTitleProps {
  title: string;
  basicInfo: {
    name: string;
    logo: string;
  };
}

const VaultTitle = ({ title, basicInfo }: IVaultTitleProps) => {
  return (
    <>
      <div className="text-black text-4xl whitespace-nowrap mt-5">{title}</div>
      <div className="flex w-[237px] max-w-full gap-4 mt-5 items-center">
        <Image
          src={basicInfo.logo}
          alt={basicInfo.name}
          className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full rounded-[50%]"
          width={36}
          height={36}
        />
        <div className="text-neutral-800 text-2xl whitespace-nowrap">
          {basicInfo.name}
        </div>
      </div>
    </>
  );
};

export default VaultTitle;
