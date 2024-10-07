"use client"
import { Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

const suites = [
  {
    name: "Deluxe Suite",
    price: "1,200,000₮ MNT",
    oldPrice: "1,600,000₮",
    rating: 4.7,
    reviews: 2578,
    image: "/images/Rectangle 7.png",
  },
  {
    name: "Premier Suite",
    price: "1,600,000₮ MNT",
    rating: 4.7,
    reviews: 2578,
    image: "/images/Rectangle 7.png",
  },
  {
    name: "Duxton Room Twin",
    price: "2,000,000₮ MNT",
    rating: 4.7,
    reviews: 2578,
    image: "/images/Rectangle 7.png",
  },
  {
    name: "Duxton Room Twin",
    price: "1,400,000₮ MNT",
    rating: 4.7,
    reviews: 2578,
    image: "/images/Rectangle 7.png",
  },
]

export default function Trending() {
  const id = "product-1-detail";
  const locale = useParams().locale;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-displaysm font-normal">Most Visited Hotel Suites This Month</h2>
        <Link href="#" className="text-primary flex items-center">
          See All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <p className="text-muted-foreground mb-6">
        A masterclass of sophistication, a stay at Atlantis The Royal delivers extraordinary luxury, unlike anywhere else.
      </p>
      <Link href={`/room-detail/${id}`} locale={locale === "en" ? "en" : "mn"} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suites.map((suite, index) => (
          <Card key={index}>
            <CardHeader className="p-0">
              <Image
                src={suite.image}
                alt={suite.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle>{suite.name}</CardTitle>
                <div className="text-right flex gap-2">
                  <p className="text-textlg font-bold">{suite.price}</p>
                  {suite.oldPrice && (
                    <p className="text-textsm text-muted-foreground line-through">{suite.oldPrice}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-textsm text-muted-foreground">
                  {suite.rating} ({suite.reviews.toLocaleString()} Reviews)
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </Link>
    </div>
  )
}