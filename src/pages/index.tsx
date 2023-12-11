import Header from "@/components/Header";
import FAQs from "@/components/home/FAQs";
import Footer from "@/components/Footer";
import Card from "@/components/home/Card";
import { MOCK_LIVE_STRATEGY, MOCK_COMING_SOON } from "@/constants/mockData";

export default function Home() {
  return (
    <div className="relative w-full justify-center items-center bg-[#ECECEE] flex flex-col xl:pt-25">
      <Header />
      <div className="flex w-full flex-col max-md:max-w-full bg-main bg-cover bg-center bg-no-repeat">
        <div className="flex-col overflow-hidden self-stretch relative flex w-full pt-24 pb-36 px-20 max-md:max-w-full max-md:pb-24 max-md:px-5">
          <div className="relative self-center flex mb-0 w-full max-w-[1082px] flex-col max-md:max-w-full max-md:mb-2.5">
            <div className="items-start self-stretch flex flex-col max-md:max-w-full">
              <div className="text-black text-3xl self-stretch whitespace-nowrap max-md:max-w-full">
                Live Strategy Vault
              </div>
              <div className="w-full grid grid-cols-1 xl:grid-cols-[334px_334px_334px] justify-between gap-y-5 xl:gap-y-15 xl:mt-12">
                {MOCK_LIVE_STRATEGY.map((info, index) => (
                  <Card
                    key={info.protocolName + info.title + index}
                    cardInfo={info}
                  />
                ))}
              </div>
            </div>
            {/* <div className="items-start self-stretch flex grow flex-col mt-40 max-md:max-w-full max-md:mt-10">
              <div className="text-black text-3xl self-stretch whitespace-nowrap max-md:max-w-full">
                Coming Soon
              </div>
              <div className="w-full grid grid-cols-1 xl:grid-cols-[334px_334px_334px] justify-between gap-y-5 xl:gap-y-15 mt-12 max-md:mt-10">
                {MOCK_COMING_SOON.map((item, index) => (
                  <Card
                    key={item.name + item.title + index}
                    title={item.title}
                    protocol={item.name}
                    logo={item.logo}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <FAQs />
      <Footer />
    </div>
  );
}
