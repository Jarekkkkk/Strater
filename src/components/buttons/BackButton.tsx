import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex w-fit gap-3 items-center"
      onClick={() => {
        router.back();
      }}
    >
      <IoIosArrowBack className="text-xl text-[#939393]" />
      <div className="text-[#939393] text-base whitespace-nowrap">Back</div>
    </button>
  );
};

export default BackButton;
