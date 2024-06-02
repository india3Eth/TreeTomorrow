import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe",
    comment: "Amazing platform! Easy to use and helps the environment.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe1",
    comment:
    "TreeTomorrow has revolutionized the way I participate in reforestation efforts. The blockchain transparency is unmatched, and I love being part of a global community dedicated to planting trees. This platform is a game-changer, allowing me to see the tangible results of my contributions.",

  },

  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe2",
    comment:
    "I appreciate how secure and transparent the platform is. Knowing my contributions are blockchain-recorded gives me peace of mind.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe3",
    comment:
    "I've been using TreeTomorrow for a few months now, and it's been an incredible experience. The platform's security is top-notch, with all transactions recorded on the blockchain, ensuring no central database vulnerabilities. The intuitive user interface makes planting trees a breeze, and I love the gamification aspect, earning rewards and badges for my efforts. Joining TreeTomorrow's community has been one of my best decisions!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe4",
    comment:
    "Planting trees has never been easier. Love the transparency and real-time tracking features!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe",
    userName: "@john_Doe5",
    comment:
    "TreeTomorrow's interface is so intuitive! I was able to plant trees effortlessly. Highly recommend this platform to all tree enthusiasts.",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Love{" "}
        </span>
        TreeTomorrow
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
