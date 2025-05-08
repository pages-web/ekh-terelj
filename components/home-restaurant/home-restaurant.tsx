import HeadingButton from "../heading-button/heading-button";
import Heading from "../heading/heading";
import Image from "../ui/image";

const HomeRestaurant = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-6 flex flex-col items-center text-center">
        <HeadingButton title="Restaurant" link="" />
        <Heading
          title="Ikh Terelj Restaurant"
          desc="Floor-to-ceiling windows unlock sublime views from all 202 rooms and
            suites, each highlighted by sophisticated décor with Chinoiserie
            touches. Body-contouring beds draped in luxury Frette linens make
            for a relaxing stay, while marble-clad bathrooms feature heated
            floors and signature Jo Loves amenities."
        />
      </div>

      <div className="lg:flex gap-2">
        <Image
          src={"/images/restaurant.jpg"}
          alt={"restaurant"}
          width={600}
          height={400}
          className=""
        />

        <div className="p-4 space-y-4">
          <h3 className="text-textxl uppercase font-bold">Restaurant</h3>
          <p className="text-black/70 text-textmd">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores qui
            ullam consequatur facilis, sed sequi, omnis excepturi, perferendis
            animi asperiores quo in sunt obcaecati ipsum expedita. Nisi neque,
            accusantium maiores aperiam nesciunt veritatis beatae vitae adipisci
            quam deleniti hic commodi inventore cum error eum eius.
            Reprehenderit, quibusdam delectus maxime quo repellat magni
            laboriosam quam esse. Dolorem similique, possimus fugit vitae hic
            illum. Est architecto odit repellat quasi nostrum vel atque
            aspernatur esse ipsam laborum dignissimos modi numquam nesciunt
            incidunt molestias minima maiores blanditiis dolore quod veritatis,
            alias quas. Inventore dolor autem quas quod neque. Non excepturi
            animi quas ratione dolorem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeRestaurant;
