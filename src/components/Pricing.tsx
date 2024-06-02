import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Starter",
    popular: 0,
    price: 0.001,
    description:
      "Plant a tree and receive an ENS subname NFT with a photo and geotagging as proof.",
    buttonText: "Get Started",
    benefitList: [
      "1 tree",
      "1 ENS subname NFT 1155",
      "Geolocation and image proof",
      "Community support",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 0.005,
    description:
      "Plant multiple trees and receive ENS subname NFTs with photos and geotagging as proof.",
    buttonText: "Start Free Trial",
    benefitList: [
      "5 tree",
      "5 ENS subname NFT 1155",
      "Geolocation and image proof",
      "Priority support",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 0.01,
    description:
      "For larger contributions, plant multiple trees and receive ENS subname NFTs with photos and geotagging as proof.",
    buttonText: "Contact US",
    benefitList: [
      "10 tree",
      "10 ENS subname NFT 1155",
      "Geolocation and image proof",
      "Priority support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Access{" "}
        </span>
        
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
      
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">{pricing.price} $ETH</span>
                <span className="text-muted-foreground"> /tree</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
