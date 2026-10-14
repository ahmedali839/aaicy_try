import { useState } from "react";
import { Play } from "lucide-react";

// import Circles from "./5-Circles.svg";
// import content from "/Hero/content.svg";
// import overlayMaskGroup from "./overlay-mask-group.svg";

import "../styles/Landing-Page.css";

export default function LandingPage() {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <main
      className="flex flex-col items-center justify-center p-[15px] relative bg-[linear-gradient(180deg,rgba(244,244,245,1)_50%,rgba(250,250,250,1)_100%)] overflow-x-hidden"
      aria-labelledby="hero-heading"
    >
      {/* <img
        className="absolute w-full top-0 left-0 h-[400px] object-cover pointer-events-none"
        alt=""
        aria-hidden="true"
        src={overlayMaskGroup}
      /> */}

      <div
        // className="flex max-w-[1200px] w-[1200px] items-center justify-center gap-2.5 relative flex-[0_0_auto]"
        className="flex w-full max-w-[1200px] mx-auto items-start justify-between gap-6 lg:gap-8 relative flex-[0_0_auto]"
      >
        {/* left side */}
        <section
          // className="flex flex-col max-w-[1200px] items-start justify-center gap-[13.9px] pt-20 pb-0 px-0 relative flex-1 grow"
          className="flex flex-col items-start justify-center gap-[13.9px] pt-20 pb-0 px-0 relative flex-1 grow min-w-0"
        >
          <div className="flex flex-col w-full max-w-[700px] items-start relative flex-[0_0_auto]">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <h1
                id="hero-heading"
                className="relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-SemiBold',Helvetica] font-semibold text-zinc-950 text-5xl tracking-[-1.92px] leading-[67.2px]"
              >
                Social media management. <br />
                Using AI.
              </h1>
            </div>
          </div>

          <div className="inline-flex flex-col max-w-[650px] items-start relative flex-[0_0_auto]">
            <div className="flex flex-col items-start pt-0 pb-[0.69px] px-0 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-zinc-600 text-[16.3px] tracking-[0.36px] leading-[28.8px]">
                Don&apos;t hire a social media agency.
                <br />
                Ocoya allows bulk content creation and engagement with AI and
                workflows.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center justify-center gap-2.5 pt-[11.1px] pb-5 px-0 relative flex-[0_0_auto]">
            <a
              href="#get-started"
              className="pt-2 pb-[9px] px-[15px] bg-zinc-800 inline-flex items-center justify-center relative flex-[0_0_auto] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
            >
              <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[16.8px] whitespace-nowrap">
                Try free
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsIntroOpen(true)}
              className="gap-[5px] px-[15px] py-[9px] bg-white inline-flex items-center justify-center relative flex-[0_0_auto] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
              aria-haspopup="dialog"
              aria-expanded={isIntroOpen}
            >
              <span className="relative w-[76.44px] h-[16.8px]">
                <span className="flex flex-col w-full items-start pt-0 pb-[0.8px] px-0 relative -top-px">
                  <span className="relative flex items-center w-fit mt-[-1.00px] mr-[-0.56px] [font-family:'Inter-Medium',Helvetica] font-medium text-zinc-800 text-sm tracking-[0] leading-[16.8px] whitespace-nowrap">
                    Watch intro
                  </span>
                </span>
              </span>

              <span
                className="flex flex-col w-4 items-start relative aspect-[0.84]"
                aria-hidden="true"
              >
                <span className="flex items-start justify-center relative self-stretch w-full flex-[0_0_auto]">
                  <span className="relative flex-1 self-stretch grow">
                    <span className="relative block w-[71.88%] h-[71.04%] top-[14.48%] left-[23.44%] bg-[url(/vector.svg)] bg-[100%_100%]" />
                  </span>
                </span>

                <Play className="w-3.5 h-3.5 fill-current text-zinc-800" />
              </span>

              <span className="absolute w-full h-full top-0 left-0 rounded-lg border border-solid border-neutral-300 pointer-events-none" />
            </button>
          </div>

          <div className="inline-flex flex-col items-start gap-5 pt-[1.1px] pb-0 px-0 relative flex-[0_0_auto]">
            {/* <img
              className="relative w-[220px] h-[60px]"
              alt="Customer social media platform logos"
              src={Circles}
            /> */}

            <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
              <div className="inline-flex items-center justify-center gap-2 px-2.5 py-[5px] relative flex-[0_0_auto] bg-white rounded-md overflow-hidden">
                <span className="absolute w-full h-full top-0 left-0 rounded-md border border-solid border-[#e7e9ec] pointer-events-none" />

                <span
                  className="inline-flex items-center justify-center relative flex-[0_0_auto]"
                  aria-hidden="true"
                >
                  <span className="absolute h-[226.00%] top-[-63.00%] left-[calc(50.00%_-_9px)] w-[18px] bg-[#48d87d] rounded-[100px] aspect-[1] opacity-[0.12]" />
                  <span className="relative w-2 h-2 bg-[#48d87d] rounded-[100px] aspect-[1]" />
                </span>

                <span className="relative w-[26.19px] h-[14.41px]">
                  <span className="flex flex-col w-full items-center relative -top-px">
                    <span className="relative flex items-center justify-center w-fit mt-[-1.00px] ml-[-0.40px] mr-[-0.40px] [font-family:'Inter-Regular',Helvetica] font-normal text-zinc-950 text-xs text-center tracking-[0.48px] leading-[14.4px] whitespace-nowrap">
                      LIVE
                    </span>
                  </span>
                </span>
              </div>

              <p className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-zinc-600 text-[12.7px] tracking-[0.28px] leading-[25.2px] whitespace-nowrap">
                Trusted by 618,457 customers worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* OLD (static) image – kept for reference */}
        {/* <img
          className="relative w-[464px] h-[1200px]"
          alt="Ocoya social media content management interface"
          src="/Hero/content.svg"
        /> */}

        {/* RIGHT SIDE: viewport (screen height) + infinite upward auto-scroll */}
        <div
          className="relative flex-shrink-0 w-[420px] lg:w-[520px] h-[calc(100vh-160px)] overflow-hidden rounded-2xl"
          aria-hidden="true"
        >
          <div className="hero-scroll-track">
            <img
              src="/Hero/content.svg"
              alt=""
              className="block w-full h-auto"
              draggable="false"
            />
            <img
              src="/Hero/content.svg"
              alt=""
              className="block w-full h-auto"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <section id="get-started" className="sr-only" aria-label="Get started">
        Start your free Ocoya trial.
      </section>

      {isIntroOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsIntroOpen(false);
            }
          }}
        >
          <section
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="intro-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="intro-title"
                  className="[font-family:'Plus_Jakarta_Sans-SemiBold',Helvetica] text-xl font-semibold text-zinc-950"
                >
                  Welcome to Ocoya
                </h2>
                <p className="mt-2 [font-family:'Inter-Regular',Helvetica] text-sm leading-6 text-zinc-600">
                  Create, schedule, and manage your social content with AI.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsIntroOpen(false)}
                className="rounded-md px-2 py-1 text-sm font-medium text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
                aria-label="Close introduction"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}