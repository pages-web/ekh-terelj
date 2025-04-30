"use client";

import { useState } from "react";

export default function Subscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="container mx-auto mb-9 text-center">
      <div className="inline-block bg-gray-100 text-gray-800 text-xs px-4 py-1 rounded-full">
        Subscription
      </div>

      <h2 className="text-3xl font-semibold mt-4">Be the first to know</h2>
      <p className="text-gray-600 mt-2">
        To receive updates about exclusive experiences, events, new destinations
        and more, please register your interest.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex items-center justify-center w-full max-w-lg mx-auto border-b border-gray-300"
      >
        <input
          type="email"
          className="w-full py-3 px-4 text-gray-700 bg-transparent focus:outline-none"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-black font-semibold tracking-wide ml-2"
        >
          SEND
        </button>
      </form>
    </section>
  );
}
