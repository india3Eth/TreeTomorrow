import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/undraw_digital_currency_qpak.png";
import image3 from "../assets/undraw_Ether_re_y7ft.png";
import image4 from "../assets/undraw_nakamoto_2iv6.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Blockchain",
    description:
      "Every tree you plant is recorded on the blockchain, ensuring transparency and traceability. Review and verify the entire process from start to finish.",
    image: image4,
  },
  {
    title: "User Interface",
    description:
      "Our user-friendly interface makes it easy for anyone to participate in reforestation efforts. Navigate through the platform with ease.",
    image: image3,
  },
  {
    title: "Security",
    description:
      "Our platform ensures maximum security by recording every transaction on the blockchain. No central database is used, so your data and contributions are decentralized and tamper-proof, providing unparalleled security and trust.",
    image: image,
  },
];

const featureList: string[] = [
  "Blockchain",
  "Interface",
  "Community",
  "Rewards",
  "Visualization",
  "Security",
  "Minimalist",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
