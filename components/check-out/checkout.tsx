import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

export default function CheckOut() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Secure Booking</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <AccountSection />
          <PersonalInfoSection />
          <CheckInSection />
          <PaymentSection />
          <CancellationPolicySection />
          <Button className=" bg-teal-600 hover:bg-teal-700 w-full">Confirm Booking</Button>
        </div>
        <ReservationSummary />
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="mb-6 flex justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Have an account?</h2>
        <p className="text-sm text-gray-600 mb-2">
          Create or Sign in to this booking. (Optional)
        </p>
      </div>
      <Button variant="outline">Sign in</Button>
    </div>
  );
}

function PersonalInfoSection() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Your personal information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField id="firstName" label="First name" placeholder="Enter your first name" />
        <InputField id="lastName" label="Last name" placeholder="Enter your last name" />
        <InputField id="email" label="E-mail" type="email" placeholder="Enter your email" />
        <InputField id="phone" label="Phone" type="tel" placeholder="Enter your phone" />
      </div>
      <div className="mt-4">
        <Label htmlFor="specialRequests">Special requests (optional)</Label>
        <Textarea id="specialRequests" placeholder="Limit 250 characters" />
      </div>
    </div>
  );
}

function InputField({ id, label, type = "text", placeholder }: { id: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

function CheckInSection() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">When can you check in?</h2>
      <Select>
        <option>Select check-in time</option>
      </Select>
    </div>
  );
}

function PaymentSection() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Payment method</h2>
      <Select>
        <option>Select payment method</option>
      </Select>
    </div>
  );
}

function CancellationPolicySection() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Cancellation policy</h2>
      <ul className="list-disc list-inside text-sm text-gray-600">
        <li>This rate is non-refundable. If you change or cancel your booking you will not get a refund or credit to use for a future stay. This policy will apply regardless of COVID-19, subject to any local consumer laws.</li>
        <li>No refunds will be issued for late check-in or early check-out.</li>
        <li>Stay extensions require a new reservation.</li>
      </ul>
      <p className="text-sm text-gray-600 mt-2">
        By clicking on the button below, I acknowledge that I have reviewed the Privacy Statement Opens in a new window, and Government Travel Advice Opens in a new window.
      </p>
    </div>
  );
}

function ReservationSummary() {
  return (
    <div className="w-full gap-4 md:w-1/2">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Your reservation</h2>
        <img
          src="/images/Rectangle 19.png"
          alt="Room view"
          className="w-full h-[300px] object-cover rounded-lg mb-4"
        />
        <div className="mb-4 flex justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold">Best Western Premier Tuushin Hotel</h3>
            <p>Deluxe Twin Room</p>
          </div>
          <div className="flex items-center mt-1">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2">8.2</span>
            <span className="text-xl font-bold">Very good (580 reviews)</span>
          </div>
        </div>
        <p className="flex items-center text-sm mb-5 text-gray-600">
          <Info className="w-4 h-4 mr-1" /> Non-refundable
        </p>
        <div className="flex justify-between items-center">
          <div className="mb-4 gap-3">
            <p className="text-sm">Room: 1 room</p>
            <p className="text-sm">Bed: 1 bed, 2 adults</p>
          </div>
          <div className="mb-4">
            <p className="text-sm">Check-in: Tue, Apr 16</p>
            <p className="text-sm">Check-out: Sat, Apr 20</p>
          </div>
        </div>
        <PriceDetails />
      </div>
    </div>
  );
}

function PriceDetails() {
  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-2">Price details</h3>
      <div className="flex justify-between text-sm mb-1">
        <span>1 room x 4 nights</span>
        <span>1.600.000₮</span>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <span>Taxes and fees</span>
        <span>100.000₮</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span>Local tax</span>
        <span>50.000₮</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total price</span>
        <span className="text-green-600">1.750.000₮</span>
      </div>
    </div>
  );
}