import { Phone, MapPin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactComponent() {
  return (
    <div className="w-full container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-8 text-gray-600">
        No request is too great and no detail too small. We are also here to
        assist you before your trip at Flower Hotel.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Phone className="mr-2 h-5 min-w-5" />
            <div>
              <h2 className="font-semibold">Phone</h2>
              <p>+976 9900 4359</p>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <MapPin className="mr-2 h-5 min-w-5" />
            <div>
              <h2 className="font-semibold">Location</h2>
              <p>{`Ulaanbaatar, Mongolia, Ikh Terelj resort`}</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <Mail className="mr-2 h-5 min-w-5" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p>ekh.terelj@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="h-[400px] lg:h-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2677.5520482391134!2d107.40107967680291!3d47.84827087125747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d94255801871fe5%3A0xb6d2b3a83c270feb!2sEkh%20terelj%20resort!5e0!3m2!1smn!2smn!4v1746674109557!5m2!1smn!2smn"
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
