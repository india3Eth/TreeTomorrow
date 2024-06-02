import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "Plant a tree from anywhere in the world with just a few clicks. Our platform ensures easy access to reforestation efforts for everyone.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Join a global community of tree planters and environmental enthusiasts. Share your impact and collaborate with others dedicated to making a difference.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Our platform is designed to scale with your ambitions. Whether you want to plant one tree or a thousand, we've got you covered.",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "Earn rewards and badges for your tree-planting efforts. Track your progress and compete with friends to see who can plant the most trees.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Plant enthusiasts, you just have to buy a minted ENS subname from our website. And, you can review our full proof-of-minting code as proof.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
