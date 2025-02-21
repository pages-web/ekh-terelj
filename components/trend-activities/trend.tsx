import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Trend() {
  return (
    <div className="container py-8">
      <h1 className="text-displaysm font-normal mb-4">Services</h1>
      {/* <p className="text-lg mb-6 text-muted-foreground">
        Discover luxury from towering heights with a private theater production
        in our suites, a swim in the highest hotel pool in Western Europe or
        indulge in afternoon tea with a unique Asian twist.
      </p> */}

      {/* <div className="grid grid-cols-2 lg:flex lg:flex-wrap  gap-2 mb-6">
        {[
          "Dining Delights",
          "Wellness",
          "Experience",
          "Meeting & Celebration",
        ].map((label, index) => (
          <Button
            key={index}
            variant={label === "Dining Delights" ? "default" : "outline"}
          >
            {label}
          </Button>
        ))}
      </div> */}

      {/* <div className="flex justify-between items-center mb-6">
        <div className="flex-1"></div>
        <Button variant="link" className="text-lg">
          See All <ArrowRight className="ml-2" />
        </Button>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Flower Jacuzzi & Saun",
            imgSrc: "/images/service1.png",
            imgAlt: "Flower Jacuzzi & Saun",
            description: `We invite you to our very first Japanese Sauna in Mongolia by the name Yorimichi. There are separate sections for women and men in the sauna which has a warm pool to relax. Choices of cold beverages are available at your cost in the sauna. All of our guests who staying in the hotel rooms can access to the sauna free of charge. There will a charge apply for the visitors who are not staying in the hotel`,
          },
          {
            title: "Bus service",
            imgSrc: "/images/service2.png",
            imgAlt: "Bus service",
            description: `Our hotel offers an airport transfer service to our guests. Depending on a number of guests, options are available which include bus for 8 passengers. Our pick-up service from Chinggis Khan Airport showing. Depending on the number of people, there are small buses for 8 people and up to 28 people will be served by bus.`,
          },
          {
            title: "Massage",
            imgSrc: "/images/service3.png",
            imgAlt: "Private Dining",
            description:
              "Foot reflexology treatment and massage will be offered at a higher professional level. Foot reflexology treatment and massage will be offered at a higher professional level. Foot reflexology treatment and massage will be offered at a higher professional level",
          },
          {
            title: "Souvenir Shop",
            imgSrc: "/images/service4.png",
            imgAlt: "Souvenir Shop",
            description:
              "Wrapped in Capella's iconic heritage-listed walls are a collection of former offices of the Department of Education that have bee...",
          },
          {
            title: "Business Center",
            imgSrc: "/images/service5.png",
            imgAlt: "Business Center",
            description:
              "Wrapped in Capella's iconic heritage-listed walls are a collection of former offices of the Department of Education that have bee...",
          },
        ].map((activity, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={activity.imgSrc}
                alt={activity.imgAlt}
                className="w-full h-48 object-cover mb-4"
              />
              <CardDescription className="">
                {activity.description}
              </CardDescription>
            </CardContent>
            {/* <CardFooter>
              <div>
                {activity.hours.map((hour, idx) => (
                  <p key={idx}>{hour}</p>
                ))}
              </div>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  );
}
