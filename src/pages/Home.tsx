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
  const MAX_RETRIES = 5;

  // Función para cargar una broma
  //Sin useCallback, loadJoke sería una nueva función diferente en cada render, afectando el useefect de abajo
  const loadJoke = useCallback(async (attempts = 0) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchJoke(category);
      const blocked = getBlocked();

      // Evitar bromas bloqueadas
      if (blocked.includes(data.id)) {
        if (attempts >= MAX_RETRIES) {
          setError("No se pudo obtener una broma válida después de varios intentos.");
          setJoke(null);
          setLoading(false);
          return;
        }

        setTimeout(() => loadJoke(attempts + 1), 300);
        return;
      } //Se agrega un limite de intentos para evitar entrar en un bucle infinito

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
    <div className="max-w-xl mx-auto items-center p-6">
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
 