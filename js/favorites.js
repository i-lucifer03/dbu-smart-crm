import {
saveFavorite,
removeFavorite,
isFavorite
}
from "./storage.js";

export function toggleFavorite(program){

    if(isFavorite(program.id)){

        removeFavorite(program.id);

        return false;

    }

    saveFavorite(program.id);

    return true;

}