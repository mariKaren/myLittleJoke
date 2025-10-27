import React, { useEffect, useState } from "react";
import { type Joke } from "../api/jokeApi";
import { getFavorites } from "../utils/storage";
import { FavoritesList } from "../components/FavoritesList";

const CHUNK_SIZE = 10;

const Favorites: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favIds, setFavIds] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  

  // Cargar IDs de favoritos al iniciar
  useEffect(() => {
    const ids = getFavorites();
    setFavIds(ids);
    setHasMore(ids.length > 0);
    loadFirstPage(ids);
  }, []);

  // Función para traer un batch de IDs
  const fetchJokesBatch = async (ids: number[]) => {
    const fetched = await Promise.all(
      ids.map(async (id) => {
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
    return fetched.filter(Boolean) as Joke[];
  };

  // Cargar la primera página
  const loadFirstPage = async (ids: number[]) => {
    setLoading(true);
    const firstBatch = ids.slice(0, CHUNK_SIZE);
    const data = await fetchJokesBatch(firstBatch);
    setJokes(data);
    setPage(0);
    setLoading(false);
    setHasMore(ids.length > CHUNK_SIZE);
  };

  // Cargar más páginas
  const loadMore = async () => {
    if (loadingMore) return;//Evitar peticiones duplicadas
    setLoadingMore(true);

    const nextPage = page + 1;
    const start = nextPage * CHUNK_SIZE;
    const end = start + CHUNK_SIZE;
    const nextBatchIds = favIds.slice(start, end);

    if (nextBatchIds.length === 0) {
      setHasMore(false);
      setLoadingMore(false);
      return;
    }

    // Espera para no saturar la API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newJokes = await fetchJokesBatch(nextBatchIds);
    setJokes((prev) => [...prev, ...newJokes]);
    setPage(nextPage);
    setHasMore(favIds.length > end);
    setLoadingMore(false);
  };

  // Manejar eliminación local y rellenar hueco
  const handleRemoveLocal = (id: number) => {
    // Actualizar la lista global de IDs primero
    const updatedFavIds = favIds.filter(fid => fid !== id);
    setFavIds(updatedFavIds);

    // Eliminar el chiste del array visible
    setJokes(prevJokes => {
      const remainingJokes = prevJokes.filter(j => j.id !== id);

      // El índice del siguiente chiste a traer para mantener la página completa
      const nextIndexToFetch = remainingJokes.length;

      if (updatedFavIds[nextIndexToFetch] !== undefined) {
        fetchJokesBatch([updatedFavIds[nextIndexToFetch]]).then(replacement => {
          if (replacement.length > 0) {
            setJokes(prev => [...prev, replacement[0]]);
          }
        });
      }//Realizar la petición con el índice y agregarla Jokes
      
      return remainingJokes;
    });

    // Actualizar hasMore
    setHasMore(updatedFavIds.length > (page + 1) * CHUNK_SIZE);
  };

  return (
    <div className="pt-4 mb-[100px]">
      <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-700">
        Mis Favoritos
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Cargando favoritos...</p>
      ) : (
        <>
          <FavoritesList jokes={jokes} onRemove={handleRemoveLocal} />

          {hasMore && (
            <div className="text-center mt-4 mb-10">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  loadingMore ? "bg-gray-400" : "bg-c-green hover:bg-c-green-dark "
                }`}
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Cargando...
                  </span>
                ) : (
                  "Cargar más"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;