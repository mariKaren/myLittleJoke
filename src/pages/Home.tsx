import { useState, useEffect, useCallback } from "react";
import { fetchJoke, type Joke } from "../api/jokeApi";
import { FilterBar } from "../components/FilterBar";
import { JokeCard } from "../components/JokeCard";
import { getBlocked, addBlocked, getFilter, saveFilter } from "../utils/storage";

export const Home: React.FC = () => {
  const [category, setCategory] = useState<string>(() => getFilter());
  const [joke, setJoke] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Función para cargar una broma
  //Sin useCallback, loadJoke sería una nueva función diferente en cada render, afectando el useefect de abajo
  const loadJoke = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchJoke(category);
      const blocked = getBlocked();

      // Evitar bromas bloqueadas
      if (blocked.includes(data.id)) {
        // Esperar un poco antes de reintentar para evitar bucles rápidos
        setTimeout(() => loadJoke(), 300);
        return;
      } //agregar limite

      setJoke(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener una broma. Intenta nuevamente.");
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    saveFilter(category); 
    loadJoke();
  }, [category,loadJoke]);

  // Función para bloquear una broma
  const handleBlock = (id: number) => {
    addBlocked(id);
    loadJoke();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Selector de categorías */}
      <FilterBar category={category} onChange={setCategory} />

      {/* Card con la broma o el error */}
      <JokeCard
        joke={joke}
        loading={loading}
        error={error}
        onRefresh={loadJoke}
        onBlock={handleBlock}
      />
    </div>
  );
};
 