import { useState, useEffect } from "react";

export default function CatFact() {
  const [fact, setFact] = useState("");

  const getFact = async () => {
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    setFact(data.fact);
  };

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-lg font-bold mb-3">🐱 Random Cat Fact</h2>

        <p className="text-gray-700 mb-4">
          {fact || "Loading..."}
        </p>

        <button
          onClick={getFact}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get New Fact
        </button>
      </div>
    </div>
  );
}
