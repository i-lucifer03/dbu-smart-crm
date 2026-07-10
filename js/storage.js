// ======================================
// Local Storage Manager
// ======================================

const FAVORITES="dbu_favorites";

const RECENT="dbu_recent";

export function getFavorites(){

    return JSON.parse(
        localStorage.getItem(FAVORITES) || "[]"
    );

}

export function saveFavorite(id){

    const list=getFavorites();

    if(!list.includes(id)){

        list.push(id);

        localStorage.setItem(
            FAVORITES,
            JSON.stringify(list)
        );

    }

}

export function removeFavorite(id){

    let list=getFavorites();

    list=list.filter(item=>item!==id);

    localStorage.setItem(
        FAVORITES,
        JSON.stringify(list)
    );

}

export function isFavorite(id){

    return getFavorites().includes(id);

}

export function addRecent(id){

    let list=JSON.parse(
        localStorage.getItem(RECENT)||"[]"
    );

    list=list.filter(item=>item!==id);

    list.unshift(id);

    list=list.slice(0,10);

    localStorage.setItem(
        RECENT,
        JSON.stringify(list)
    );

}

export function getRecent(){

    return JSON.parse(
        localStorage.getItem(RECENT)||"[]"
    );

}