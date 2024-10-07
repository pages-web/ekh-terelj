import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Trend() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-displaysm font-normal mb-4">Experience our trend activities</h1>
      <p className="text-lg mb-6 text-muted-foreground">
        Discover luxury from towering heights with a private theater production in our suites, a swim in the highest hotel pool in Western Europe or indulge in afternoon tea with a unique Asian twist.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {["Dining Delights", "Wellness", "Experience", "Meeting & Celebration"].map((label, index) => (
          <Button key={index} variant={label === "Dining Delights" ? "default" : "outline"}>
            {label}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1"></div>
        <Button variant="link" className="text-lg">
          See All <ArrowRight className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "BRASSERIE 1930",
            imgSrc: "/images/Rectangle 12.png",
            imgAlt: "Brasserie 1930",
            description: "Anchored to the Young Street shoulder of the hotel, Brasserie 1930 delivers an elevated dining experience in consultation with...",
            hours: ["Lunch: 12:00pm - 3:00pm", "Dinner: 6:00pm - 10:00pm"]
          },
          {
            title: "MCRAE BAR",
            imgSrc: "/images/Rectangle 12.png",
            imgAlt: "McRae Bar",
            description: "Named in honour of George McRae, the building's original architect, McRae Bar, overlooking Loftus Street, redefines the cla...",
            hours: ["Tuesday - Saturday", "4:00pm - 12:00am"]
          },
          {
            title: "PRIVATE DINING",
            imgSrc: "/images/Rectangle 12.png",
            imgAlt: "Private Dining",
            description: "Wrapped in Capella's iconic heritage-listed walls are a collection of former offices of the Department of Education that have bee...",
            hours: ["Monday - Sunday", "7:00am - 9:00pm"]
          }
        ].map((activity, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={activity.imgSrc} alt={activity.imgAlt} className="w-full h-48 object-cover mb-4" />
              <CardDescription>{activity.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <div>
                {activity.hours.map((hour, idx) => (
                  <p key={idx}>{hour}</p>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}