import React from "react";
import Security from "../../../../public/assets/security.svg";
import Privacy from "../../../../public/assets/privacy.svg";
import Image from "next/image";
import BankDifferentitor from "./BankDifferentitor";

function BankSecurityCards() {
  return (
    <div className="bg-[#F4F8FB]">
      <div className="container mx-auto max-[1024px]:py-6 max-[1024px]:px-8 max-[991px]:max-w-full max-[479px]:px-4 max-[375px]:px-4 max-[375px]:px-4 max-[320px]:px-4">
        <div className="relative bottom-20 max-[479px]:bottom-[30rem] h-[40%] max-[479px]:h-[166px] max-[425px]:h-[146px] max-[393px]:h-[142px] max-[375px]:h-[126px] max-[320px]:h-[168px] max-[280px]:h-[185px]">
          <div className="grid grid-cols-2 justify-center gap-12 max-[1440px]:gap-4 mx-auto rounded-lg max-[1200px]:gap-4 w-[90%] max-[1200px]:w-full max-[479px]:grid-cols-1">
            <div className="w-[665px] max-[1440px]:w-[570px] h-full max-[1200px]:w-[500px] max-[1024px]:w-[510px] bg-[#fff] p-10  rounded-2xl max-[1024px]:w-full max-[576px]:px-5 home-box-cards max-[479px]:px-[11px] max-[479px]:pt-[35px]">
              <Image
                src={Security}
                className="w-[110px] h-[110px] max-[1200px]:w-[90px] max-[1200px]:h-[90px] mx-auto"
                alt="img"
              />
              <div className="mt-6 text-center max-[375px]:mt-4 font-[Poppins]">
                <p className=" head-text font-[faktum] pb-2 text-[24px] font-semibold  max-[576px]:text-[24px] text-[#212529]">
                  Security
                </p>
                <p className="text-[#212529] text-[16px] max-[479px]:text-[14px]">
                  At our company, safeguarding our customers’ best interests is
                  our top priority.
                </p>
              </div>
            </div>{" "}
            <div className="w-[665px] max-[1440px]:w-[570px] max-[1200px]:w-[500px] h-full max-[1024px]:w-[510px] bg-[#fff] p-10 rounded-2xl max-[1024px]:w-full max-[576px]:px-5 home-box-cards max-[479px]:px-[11px]">
              <Image
                src={Privacy}
                className="w-[110px] h-[110px] max-[1200px]:w-[90px] max-[1200px]:h-[90px] mx-auto"
                alt="img"
              />
              <div className="mt-6 text-center max-[375px]:mt-4 font-[Poppins]">
                <p className=" head-text font-[faktum] text-[24px] font-semibold pb-2 max-[576px]:text-[24px] text-[#212529]">
                  Data Privacy
                </p>
                <p className=" text-[#212529] text-[16px] max-[479px]:text-[14px]">
                  We take all necessary precautions to ensure the privacy and
                  security of your data.
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
        <BankDifferentitor />
      </div>
    </div>
  );
}

export default BankSecurityCards;
