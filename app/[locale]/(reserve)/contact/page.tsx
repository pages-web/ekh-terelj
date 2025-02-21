import { Phone, MapPin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactComponent() {
  return (
    <div className="w-full max-w-[1600px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-8 text-gray-600">
        No request is too great and no detail too small. We are also here to
        assist you before your trip at Flower Hotel.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Phone className="mr-2" />
            <div>
              <h2 className="font-semibold">Phone</h2>
              <p>+976-11-458330</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            <div>
              <h2 className="font-semibold">Location</h2>
              <p>{`Bayanzurkh Duureg, Zaluuchuud Avenue -18, Ulaanbaatar-49, Mongolia, P.O.Box-328`}</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <Mail className="mr-2" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p>reservation@flower-hotel.mn</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Leave a message ?</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Enter your first name" />
              <Input placeholder="Enter your last name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="email" placeholder="Enter your email" />
              <Input type="tel" placeholder="Enter your phone" />
            </div>
            <Textarea placeholder="Limit 250 characters" />
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Send message
            </Button>
          </form>
        </div>
        <div className="h-[400px] lg:h-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.9127757590254!2d106.9352121770386!3d47.92438637122066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692166117ef3d%3A0x16047093895df1e4!2sFlower%20Hotel!5e1!3m2!1smn!2smn!4v1740094066102!5m2!1smn!2smn"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
