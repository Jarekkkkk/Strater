import { cn } from "@/lib/utils";
import { useState } from "react";
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
  // const [isFolded, setIsFolded] = useState(true);

  return (
    <div
      className="items-start self-stretch flex grow flex-col mt-6 max-md:max-w-full max-md:mt-4 cursor-pointer"
      onClick={setIsFolded}
    >
      <div className="text-black text-xl font-medium self-stretch max-md:max-w-full">
        {title}
      </div>
      <div
        className={cn(
          "text-neutral-400 text-xs self-stretch mt-5 max-md:max-w-full ease-in-out duration-300",
          isFolded ? "h-0 opacity-0" : contentHeight + " opacity-100 mt-5"
        )}
      >
        {content}
      </div>
      <Separator
        className={cn(
          "w-full bg-[#56575B] ease-in-out duration-300",
          isFolded ? "mt-3" : "mt-4"
        )}
      />
    </div>
  );
};

export default FoldedPanel;
