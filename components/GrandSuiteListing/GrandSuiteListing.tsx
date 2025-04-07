import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, Wifi } from "lucide-react";

export default function GrandSuiteListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        <img
          src="/suite-main.jpg"
          alt="Suite Main"
          className="rounded-2xl shadow-md"
        />
        <div className="grid grid-cols-3 gap-4">
          {["suite1.jpg", "suite2.jpg", "suite3.jpg", "suite4.jpg"].map(
            (src, idx) => (
              <img
                key={idx}
                src={`/${src}`}
                alt={`Suite ${idx + 1}`}
                className="rounded-xl shadow"
              />
            )
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Grand Suite 57th Street</h2>
          <p className="text-gray-500">
            4 guest · 2 bedroom · <Wifi className="inline w-4 h-4" />
          </p>
        </div>

        <div className="space-y-2">
          <Feature
            icon="🌟"
            title="Great location"
            desc="100% of recent guests gave the location 5-star rating."
          />
          <Feature
            icon="🏊‍♂️"
            title="Dive right in"
            desc="One of the few places in the area with pool."
          />
          <Feature
            icon="✅"
            title="Great check-in experience"
            desc="100% gave the check-in process 5-star rating."
          />
          <Feature
            icon="🕒"
            title="Free cancellation for 48 hours."
            desc="Cancel your reservation within 48 hours."
          />
        </div>

        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>Check-in</span>
              <span>2023/04/16</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out</span>
              <span>2023/04/21</span>
            </div>
            <div className="flex justify-between">
              <span>Guests</span>
              <span>2 Adult, 1 Child</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span>480$ x 5 nights</span>
                <span>2400$</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>59$</span>
              </div>
              <div className="flex justify-between font-semibold pt-2">
                <span>Total price</span>
                <span>2459$</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-sm text-gray-500">
          <p>
            Starting at 185-257 square metres (2,000-2,770 square feet), Aman
            New York’s Aman Suites are the largest one-bedroom suites in the
            Crown Building...
          </p>
        </div>
      </div>
    </div>
  );
}

type FeatureProps = {
  icon: string;
  title: string;
  desc: string;
};

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
