import { Link } from "@/i18n/routing";

export default function Menu() {
    return (
        <div className="flex gap-2 justify-center items-center">
            <Link href="#about" >About</Link>
            <Link href="#hotel" >Hotel</Link>
            <Link href="#contact" >Contact</Link>
            <Link href="#services" >Services</Link>
            <Link href="#gallery" >Gallery</Link>
            <Link href="#reviews" >Reviews</Link>
            <Link href="#location" >Location</Link>
            <Link href="#booking" >Booking</Link>
        </div>
    );
}