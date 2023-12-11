import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface IFoldedPanelProps {
  title: string;
  content: string;
  contentHeight: string;
  isFolded: boolean;
  setIsFolded: () => void;
}

const FoldedPanel = ({
  title,
  content,
  contentHeight,
  isFolded,
  setIsFolded,
}: IFoldedPanelProps) => {
  const [isClose, setIsClose] = useState(true);
  const [isHide, setIsHide] = useState(true);

  useEffect(() => {
    if (isFolded) {
      setIsClose(true);
      setTimeout(() => {
        setIsHide(true);
      }, 300);
    } else {
      setIsHide(false);
      setTimeout(() => {
        setIsClose(false);
      }, 100);
    }
  }, [isFolded]);

  return (
    <div
      className="items-start self-stretch flex grow flex-col mt-6 max-md:max-w-full max-md:mt-4 cursor-pointer"
      onClick={setIsFolded}
    >
      <div className="text-black text-base xl:text-xl font-medium self-stretch max-md:max-w-full mb-4 xl:mb-5">
        {title}
      </div>
      <div
        className={cn(
          "text-neutral-400 text-xs self-stretch max-md:max-w-full ease-in-out duration-300",
          isClose ? "h-0 opacity-0" : contentHeight + " opacity-100",
          isHide && "hidden"
        )}
      >
        {content}
      </div>
      <Separator
        className={cn(
          "w-full bg-[#56575B] ease-in-out duration-300 xl:mt-3",
          isClose ? "mt-0" : "mt-2"
        )}
      />
    </div>
  );
};

export default FoldedPanel;
