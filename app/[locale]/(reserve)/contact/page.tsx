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
        assist you before your trip at Best Western Tuushin Hotel.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Phone className="mr-2" />
            <div>
              <h2 className="font-semibold">Phone</h2>
              <p>+976 11 32 3162</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            <div>
              <h2 className="font-semibold">Location</h2>
              <p>{`Prime Minister Amar's street 15, Ulaanbaatar Mongolia`}</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <Mail className="mr-2" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p>info@bestwern.mn</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.5851568300054!2d106.91716661562448!3d47.91843997920676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692434a0b0c3b%3A0x2e3a5285c0d8f4b7!2sBest%20Western%20Premier%20Tuushin%20Hotel!5e0!3m2!1sen!2sus!4v1633034920000!5m2!1sen!2sus"
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
