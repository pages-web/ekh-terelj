"use client";

import Image from "next/image";

const blogs = [
  {
    title: "Casa Cook Rhodes",
    date: "2024.04.15",
    category: "Travel",
    description:
      "Take full advantage of the unique settings, insider knowledge and on-hand wellness and cultural experts of Aman Tokyo, Amanemu...",
    image: "/images/casa-cook.png", 
  },
  {
    title: "Secret beaches of the French Riviera",
    date: "2024.04.15",
    category: "Travel",
    description:
      "Eager to capture the unruly landscape, earthy hues and golden light of this fabled stretch of coastline, the French Riviera has lon...",
    image: "/images/french-riviera.png",
  },
  {
    title: "Journey through Japan",
    date: "2024.04.15",
    category: "Travel",
    description:
      "Take full advantage of the unique settings, insider knowledge and on-hand wellness and cultural experts of Aman Tokyo, Amanemu...",
    image: "/images/japan.png",
  },
];

export default function BlogSection() {
  return (
    <section className="container mx-auto text-center">
     
      <div className="inline-block bg-gray-100 text-gray-800 text-xs px-4 py-1 rounded-full">
        Blog
      </div>

  
      <h2 className="text-3xl font-semibold mt-4">Latest News</h2>
      <p className="text-gray-600 mt-2">
        The Otemachi Tower is connected to five-line Otemachi subway station.
        Close to Tokyo Station, offering access to the nationwide bullet train
        network.
      </p>

    
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              width={600}
              height={400}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-left">
              <p className="text-xs text-gray-500">
                {blog.category} – {blog.date}
              </p>
              <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
