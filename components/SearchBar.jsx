"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ filters = [] }) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!location && !type && !budget) {
      alert("Veuillez remplir au moins un critère de recherche.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log("Recherche avec:", { location, type, budget });
      router.push(`/search?location=${location}&type=${type}&budget=${budget}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto -mt-10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filters.includes("location") && (
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Localisation
            </label>
            <select
              id="location"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Sélectionnez une localisation"
            >
              <option value="">Tout Dakar</option>
              <option value="Almadies">Almadies</option>
              <option value="Plateau">Plateau</option>
              <option value="Point E">Point E</option>
            </select>
          </div>
        )}

        {filters.includes("type") && (
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Type de bien
            </label>
            <select
              id="type"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Sélectionnez un type de bien"
            >
              <option value="">Tous types</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison">Maison</option>
              <option value="Terrain">Terrain</option>
            </select>
          </div>
        )}

        {filters.includes("price") && (
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Budget (FCFA)
            </label>
            <select
              id="budget"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              aria-label="Sélectionnez un budget"
            >
              <option value="">Tous budgets</option>
              <option value="0-500000">0 - 500,000 FCFA</option>
              <option value="500000-1000000">500,000 - 1,000,000 FCFA</option>
              <option value="1000000+">1,000,000+ FCFA</option>
            </select>
          </div>
        )}

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#8d7364] to-[#ffcd9e] text-white p-3 rounded-lg transition-transform shadow-md hover:shadow-lg ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
            aria-label="Lancer la recherche"
          >
            {isLoading ? "Recherche en cours..." : "Rechercher"}
          </button>
        </div>
      </div>
    </div>
  );
}