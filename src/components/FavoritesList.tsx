import Swal from "sweetalert2";
import type { Joke } from "../api/jokeApi";
import { removeFavorite, addBlocked } from "../utils/storage";

interface Props {
  jokes: Joke[];
  onUpdate: () => void;
}

export const FavoritesList: React.FC<Props> = ({ jokes, onUpdate }) => {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Qué querés hacer?",
      text: "Podés borrar solo de favoritos o eliminarla para siempre.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Solo borrar de favoritos",
      cancelButtonText: "Eliminar y bloquear",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeFavorite(id);
        onUpdate();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        removeFavorite(id);
        addBlocked(id);
        onUpdate();
      }
    });
  };

  if (jokes.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No tienés favoritos aún.</p>;
  }

  return (
    <div className="grid gap-4 mt-6 max-w-2xl mx-auto mb-[70px]">
      {jokes.map((j) => (
        <div
          key={j.id}
          className="bg-white p-4 rounded-2xl shadow flex justify-between items-center"
        >
          <div>
            {j.type === "single" ? (
              <p>{j.joke}</p>
            ) : (
              <>
                <p>{j.setup}</p>
                <p className="text-gray-500">{j.delivery}</p>
              </>
            )}
          </div>
          <button
            onClick={() => handleDelete(j.id)}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};