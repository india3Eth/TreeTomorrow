import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GirlWithEthIcon } from "./Icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Make a lasting
            {" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
            Impact
            </span>
          </h1>{" "}
          by{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            Planting a Tree
            </span>{" "}
            and receive an
            {" "}
            <span className="inline bg-gradient-to-r from-[#7dfab1] via-[#34d979] to-[#02ad4a] text-transparent bg-clip-text">
             NFT
            </span>{" "}
            as proof.
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Join our mission to reforest the planet. Each tree you plant will be recorded on the blockchain and you'll receive an NFT with its geolocation and image.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Plant a Tree Now</Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/rutvij-fsd/TreeTomorrow/tree/main"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Learn More
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        
        <GirlWithEthIcon/>
        {/* <HeroCards /> */}
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
