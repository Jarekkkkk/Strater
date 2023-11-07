import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import FoldedPanel from "../ui/FoldedPanel";
import { MOCK_FAQ } from "@/constants/mockData";

const FAQs = () => {
  const defaultFoldedState = MOCK_FAQ.map((item) => true);
  const [isFolded, setIsFolded] = useState(defaultFoldedState);

  const handleFoldedState = (index: number) => {
    const newFoldedState = [...defaultFoldedState];
    newFoldedState[index] = !newFoldedState[index];
    setIsFolded(newFoldedState);
  };

  return (
    <div className="items-start bg-slate-200 self-stretch flex w-full flex-col pt-20 pb-24 px-20 max-md:max-w-full max-md:px-5">
      <div className="self-center flex w-[880px] max-w-full flex-col">
        <div className="self-stretch flex flex-col px-5 max-md:max-w-full">
          <div className="text-black text-3xl font-medium self-stretch whitespace-nowrap max-md:max-w-full">
            FAQs
          </div>
          <Separator className={cn("w-full bg-[#56575B] mt-5.5")} />
          {MOCK_FAQ.map((item, index) => (
            <FoldedPanel
              key={"faq" + "title" + index}
              title={item.title}
              content={item.content}
              contentHeight={item.contentHeight}
              isFolded={isFolded[index]}
              setIsFolded={() => handleFoldedState(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
