import React, { useEffect, useState, useCallback } from "react";
import { type Joke } from "../api/jokeApi";
import { getFavorites } from "../utils/storage";
import { FavoritesList } from "../components/FavoritesList";

export const Favorites: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const favIds = getFavorites();
      if (favIds.length === 0) {
        setJokes([]);
        setLoading(false);
        return;
      }

      const fetched = await Promise.all(
        favIds.map(async (id) => {
          try {
            const res = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`);
            const data = await res.json();
            return !data.error ? data : null;
          } catch (err) {
            console.error(`Error fetching joke ${id}:`, err);
            return null;
          }
        })
      );

      setJokes(fetched.filter(Boolean) as Joke[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-semibold text-gray-700">
        Mis Favoritos
      </h1>
      {loading ? (
        <p className="text-center text-gray-500 mt-6">Cargando favoritos...</p>
      ) : (
        <FavoritesList jokes={jokes} onUpdate={loadFavorites} />
      )}
    </div>
  );
};