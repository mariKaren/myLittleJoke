const FAVORITES_KEY = "favorites";
const BLOCKED_KEY = "blocked";

/**
 * Obtener IDs de bromas favoritas almacenadas en localStorage.
 */
export const getFavorites = (): number[] =>
    JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

/**
 * Agregar una broma a favoritos, verificando que no esté duplicada.
 * @param id - ID de la broma
 */
export const saveFavorite = (id: number) => {
    const favs = getFavorites();
    if (!favs.includes(id)) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favs, id]));
    }
};

/**
 * Remover una broma de la lista de favoritos.
 * @param id - ID de la broma
 */
export const removeFavorite = (id: number) => {
    const favs = getFavorites().filter((fid) => fid !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
};


/**
 * Verificar si una broma está marcada como favorita.
 * @param id - ID de la broma
 */
export const isFavorite = (id: number): boolean =>
    getFavorites().includes(id);


/**
 * Obtener IDs de bromas bloqueadas almacenadas en localStorage.
 */
export const getBlocked = (): number[] =>
    JSON.parse(localStorage.getItem(BLOCKED_KEY) || "[]");

/**
 * Agregar una broma a la lista de bloqueadas, evitando duplicados.
 * @param id - ID de la broma
 */
export const addBlocked = (id: number) => {
    const blocked = getBlocked();
    if (!blocked.includes(id)) {
        localStorage.setItem(BLOCKED_KEY, JSON.stringify([...blocked, id]));
    }
};