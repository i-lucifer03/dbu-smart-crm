// =============================
// DBU Smart CRM
// app.js
// =============================

import { loadPrograms } from "./js/dataLoader.js";
import { renderProgramCards } from "./js/cards.js";
import { initializeSearch } from "./js/search.js";

// Global State
export let programs = [];
export let filteredPrograms = [];

document.addEventListener("DOMContentLoaded", async () => {

    try {

        showLoading();

        // Load JSON
        programs = await loadPrograms();

        filteredPrograms = [...programs];

        console.log(`Loaded ${programs.length} programs`);

        // Statistics
        updateStatistics(programs);

        // Render Cards
        renderProgramCards(filteredPrograms);

        // Search
        initializeSearch(programs, onSearchResults);

        // Future
        // initializeFilters();
        // initializeDetails();

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load programs.json");

    }

    finally {

        hideLoading();

    }

});


// ====================================
// Called whenever search returns result
// ====================================

function onSearchResults(results){

    filteredPrograms = results;

    renderProgramCards(filteredPrograms);

    updateProgramCount(filteredPrograms.length);

}


// ====================================
// Statistics
// ====================================

function updateStatistics(data){

    document.getElementById("totalPrograms").textContent = data.length;

    document.getElementById("programCount").textContent =
        `${data.length} Results`;

    // Faculty Count

    const faculties = new Set();

    data.forEach(program=>{

        if(program.faculty){

            faculties.add(program.faculty);

        }

    });

    document.getElementById("totalFaculty").textContent =
        faculties.size;

    // International

    const international = data.filter(program=>{

        return program.country &&
               program.country.toLowerCase() !== "india";

    });

    document.getElementById("internationalPrograms").textContent =
        international.length;

    // Online

    const online = data.filter(program=>{

        return program.mode &&
               program.mode.toLowerCase().includes("online");

    });

    document.getElementById("onlinePrograms").textContent =
        online.length;

}



// ====================================
// Update Result Count
// ====================================

function updateProgramCount(total){

    document.getElementById("programCount").textContent =
        `${total} Results`;

}



// ====================================
// Loading
// ====================================

function showLoading(){

    document.getElementById("loadingOverlay").style.display="flex";

}

function hideLoading(){

    document.getElementById("loadingOverlay").style.display="none";

}



// ====================================
// Toast
// ====================================

export function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.style.display = "block";

    setTimeout(()=>{

        toast.style.display="none";

    },3000);

}



// ====================================
// Dark Mode
// ====================================

const darkButton = document.getElementById("darkModeBtn");

if(darkButton){

    darkButton.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

    });

}