// =====================================
// DBU Smart CRM
// Universal Search Engine
// =====================================

let allPrograms = [];

let callback = null;

let searchBox = null;

export function initializeSearch(programs, onResults){

    allPrograms = programs;

    callback = onResults;

    searchBox = document.getElementById("searchInput");

    if(!searchBox) return;

    searchBox.addEventListener("input",search);

    document
        .getElementById("resetSearch")
        ?.addEventListener("click",resetSearch);

}

function search(){

    const query = searchBox.value
        .trim()
        .toLowerCase();

    if(query===""){

        callback(allPrograms);

        updateInfo(allPrograms.length);

        return;

    }

    const words = query.split(/\s+/);

    const result = allPrograms.filter(program=>{

        const text = createSearchText(program);

        return words.every(word=>text.includes(word));

    });

    callback(result);

    updateInfo(result.length);

}

function resetSearch(){

    searchBox.value="";

    callback(allPrograms);

    updateInfo(allPrograms.length);

}

function updateInfo(total){

    const info=document.getElementById("searchInfo");

    if(!info) return;

    info.textContent=`${total} Program(s) Found`;

}

function createSearchText(program){

    return [

        program.name,

        program.faculty,

        program.department,

        program.country,

        program.mode,

        program.category,

        program.description,

        program.eligibility,

        program.career,

        program.status,

        program.semesterFee,

        program.totalFee,

        Array.isArray(program.approvals)
            ?program.approvals.join(" ")
            :""

    ]

    .join(" ")

    .toLowerCase();

}