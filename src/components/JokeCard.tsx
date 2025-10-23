import { useState, useEffect } from "react";
import {type Joke } from "../api/jokeApi";
import { Star, Ban } from "lucide-react";
import { isFavorite, toggleFavorite } from "../utils/storage";

interface JokeCardProps {
  joke: Joke | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onBlock: (id: number) => void;
}

export const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  loading,
  error,
  onRefresh,
  onBlock,
}) => {
    
  const [isFav, setIsFav] = useState(false);

  // Actualizar el estado local si cambia la broma, actualiza si está en favoritos
  useEffect(() => {
    if (joke?.id) {
      setIsFav(isFavorite(joke.id));
    }
  }, [joke?.id]); //El efecto se ejecuta cuando cambia el id


  // Manejo de favoritos
  const handleFavorite = () => {
    if (!joke) return null;
    toggleFavorite(joke.id);
    setIsFav((prev) => !prev); 
  };

  return (
    <section className="max-w-xl w-full bg-white rounded-2xl shadow p-6 text-center mt-6 relative">
      {/* Categoría */}
      <h2 className="text-md font-semibold text-gray-600 mb-4">
        {joke?.category || "Categoría"}
      </h2>

       {/* Contenido dinámico */}
      <div className="min-h-[100px] flex flex-col items-center justify-center">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Cargando broma...</p>
        ) : error ? (
          <p className="text-red-500 font-semibold text-lg">{error}</p>
        ) : joke ? (
          joke.type === "single" ? (
            <p className="text-gray-800 text-lg leading-relaxed transition-opacity duration-300">
              {joke.joke}
            </p>
          ) : (
            <>
              <p className="text-gray-800 text-lg leading-relaxed transition-opacity duration-300">
                {joke.setup}
              </p>
              <p className="text-gray-600 mt-2 italic">{joke.delivery}</p>
            </>
          )
        ) : (
          <p className="text-gray-400 italic">Sin broma disponible</p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex justify-center items-center gap-6 mt-5">
        { joke && ( 
        <>
          {/* Favorito */}
          <button
            onClick={handleFavorite}
            aria-label="Agregar o quitar de favoritos"
            className={`transition-transform hover:scale-110 ${
              isFav ? "text-yellow-500" : "text-gray-400"
            }`}
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star
              size={28}
              fill={isFav ? "gold" : "none"}
              stroke={isFav ? "gold" : "gray"}
              strokeWidth={2}
            />
          </button>

          {/* Bloquear */}
          <button
            onClick={() => joke && onBlock(joke.id)}
            aria-label="Bloquear esta broma"
            className="text-gray-400 hover:text-red-500 transition-transform hover:scale-110"
            title="Bloquear esta broma"
          >
            <Ban size={26} />
          </button> 
        </>)}
      </div>

      {/* Botón para otra broma */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onRefresh}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors"
        >
          Obtener otra broma
        </button>
      </div>
    </section>
  );
};