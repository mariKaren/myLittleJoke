import Swal from "sweetalert2";
import type { Joke } from "../api/jokeApi";
import { removeFavorite, addBlocked } from "../utils/storage";
import { FiTrash2 } from "react-icons/fi"; 

interface Props {
  jokes: Joke[];
  onRemove: (id: number) => void;
}

export const FavoritesList: React.FC<Props> = ({ jokes,onRemove }) => {

  // Función que maneja la eliminación de una broma
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Qué quieres hacer?",
      text: "Podés borrar solo de favoritos o eliminarla para siempre.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Solo borrar de favoritos",
      cancelButtonText: "Eliminar y bloquear",
      reverseButtons: true,
        customClass: {
          title: "font-custom",
          htmlContainer: "font-custom",
          confirmButton: "!bg-[#2cb383]",
  },
    }).then((result) => {
      if (result.isConfirmed) {
        removeFavorite(id);
        onRemove(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        removeFavorite(id);
        addBlocked(id);
        onRemove(id);
      }
    });
  };

  // Si no hay chistes favoritos, muestra el mensaje
  if (jokes.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No tienes favoritos aún.</p>;
  }

  return (
    <div className="grid gap-4 mt-6 max-w-2xl mx-auto">
      {jokes.map((j) => (
        <div
          key={j.id}
          className="bg-white p-4 rounded-2xl flex justify-between items-center gap-2"
          style={{ boxShadow: "0 2px 4px rgba(165, 94, 234,0.3)" }}
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
            className="text-gray-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};