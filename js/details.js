// ===============================================
// DBU Smart CRM
// details.js
// Version 2.0
// Part 1
// ===============================================

import {
    formatCurrency,
    safeText,
    createBadge,
    copyToClipboard
} from "./utils.js";

import { generateWhatsApp } from "./whatsapp.js";
import { toggleFavorite } from "./favorites.js";
import { addRecent } from "./storage.js";

/* ====================================================
   STATE
==================================================== */

let currentProgram = null;

/* ====================================================
   PUBLIC
==================================================== */

export function showProgramDetails(program) {

    currentProgram = program;

    addRecent(program.id);

    const panel = document.getElementById("detailsPanel");

    if (!panel) return;

    panel.innerHTML = `

<div class="details-wrapper">

    ${hero(program)}

    ${basicInformation(program)}

    ${feeSection(program)}

    <div id="programExtra"></div>

    <div id="programActions"></div>

</div>

`;

    renderExtra(program);

    renderActions(program);

}

/* ====================================================
   HERO
==================================================== */

function hero(program){

return `

<section class="program-hero">

    <div class="hero-left">

        <h1>

            ${safeText(program.name)}

        </h1>

        <p>

            ${safeText(program.faculty)}

        </p>

        <div class="hero-badges">

            ${badge(program.country)}

            ${badge(program.mode)}

            ${badge(program.category)}

            ${badge(program.status)}

        </div>

    </div>

</section>

`;

}

/* ====================================================
   BASIC INFORMATION
==================================================== */

function basicInformation(program){

return `

<section class="details-card">

<h2>

Program Information

</h2>

<div class="info-grid">

${infoItem("Faculty",program.faculty)}

${infoItem("Department",program.department)}

${infoItem("Duration",program.duration)}

${infoItem("Semesters",program.semesters)}

${infoItem("Country",program.country)}

${infoItem("Mode",program.mode)}

${infoItem("Seats",program.seats)}

${infoItem("Status",program.status)}

</div>

</section>

`;

}

/* ====================================================
   FEE SECTION
==================================================== */

function feeSection(program){

return `

<section class="details-card">

<h2>

Fee Structure

</h2>

<div class="fee-grid">

${feeCard(
"Semester",
program.semesterFee
)}

${feeCard(
"Annual",
program.annualFee
)}

${feeCard(
"Total",
program.totalFee
)}

${feeCard(
"Registration",
program.registrationFee
)}

${feeCard(
"Hostel",
program.hostelFee
)}

</div>

</section>

`;

}

/* ====================================================
   FEE CARD
==================================================== */

function feeCard(title,value){

return `

<div class="fee-card">

<span>

${safeText(title)}

</span>

<h3>

${formatCurrency(value)}

</h3>

</div>

`;

}

/* ====================================================
   INFO ITEM
==================================================== */

function infoItem(title,value){

return `

<div>

<label>

${safeText(title)}

</label>

<p>

${safeText(value || "-")}

</p>

</div>

`;

}

/* ====================================================
   BADGE
==================================================== */

function badge(value){

if(!value) return "";

return createBadge(value);

}

/* ====================================================
   PLACEHOLDERS
==================================================== */

function renderExtra(program){

const container=document.getElementById("programExtra");

if(!container) return;

container.innerHTML="";

}

function renderActions(program){

const container=document.getElementById("programActions");

if(!container) return;

container.innerHTML="";

}

/* ====================================================
   PUBLIC
==================================================== */

export function getCurrentProgram(){

return currentProgram;

}
// ===============================================
// DBU Smart CRM
// details.js
// Version 2.0
// Part 1
// ===============================================

import {
    formatCurrency,
    safeText,
    createBadge,
    copyToClipboard
} from "./utils.js";

import { generateWhatsApp } from "./whatsapp.js";
import { toggleFavorite } from "./favorites.js";
import { addRecent } from "./storage.js";

/* ====================================================
   STATE
==================================================== */

let currentProgram = null;

/* ====================================================
   PUBLIC
==================================================== */

export function showProgramDetails(program) {

    currentProgram = program;

    addRecent(program.id);

    const panel = document.getElementById("detailsPanel");

    if (!panel) return;

    panel.innerHTML = `

<div class="details-wrapper">

    ${hero(program)}

    ${basicInformation(program)}

    ${feeSection(program)}

    <div id="programExtra"></div>

    <div id="programActions"></div>

</div>

`;

    renderExtra(program);

    renderActions(program);

}

/* ====================================================
   HERO
==================================================== */

function hero(program){

return `

<section class="program-hero">

    <div class="hero-left">

        <h1>

            ${safeText(program.name)}

        </h1>

        <p>

            ${safeText(program.faculty)}

        </p>

        <div class="hero-badges">

            ${badge(program.country)}

            ${badge(program.mode)}

            ${badge(program.category)}

            ${badge(program.status)}

        </div>

    </div>

</section>

`;

}

/* ====================================================
   BASIC INFORMATION
==================================================== */

function basicInformation(program){

return `

<section class="details-card">

<h2>

Program Information

</h2>

<div class="info-grid">

${infoItem("Faculty",program.faculty)}

${infoItem("Department",program.department)}

${infoItem("Duration",program.duration)}

${infoItem("Semesters",program.semesters)}

${infoItem("Country",program.country)}

${infoItem("Mode",program.mode)}

${infoItem("Seats",program.seats)}

${infoItem("Status",program.status)}

</div>

</section>

`;

}

/* ====================================================
   FEE SECTION
==================================================== */

function feeSection(program){

return `

<section class="details-card">

<h2>

Fee Structure

</h2>

<div class="fee-grid">

${feeCard(
"Semester",
program.semesterFee
)}

${feeCard(
"Annual",
program.annualFee
)}

${feeCard(
"Total",
program.totalFee
)}

${feeCard(
"Registration",
program.registrationFee
)}

${feeCard(
"Hostel",
program.hostelFee
)}

</div>

</section>

`;

}

/* ====================================================
   FEE CARD
==================================================== */

function feeCard(title,value){

return `

<div class="fee-card">

<span>

${safeText(title)}

</span>

<h3>

${formatCurrency(value)}

</h3>

</div>

`;

}

/* ====================================================
   INFO ITEM
==================================================== */

function infoItem(title,value){

return `

<div>

<label>

${safeText(title)}

</label>

<p>

${safeText(value || "-")}

</p>

</div>

`;

}

/* ====================================================
   BADGE
==================================================== */

function badge(value){

if(!value) return "";

return createBadge(value);

}

/* ====================================================
   PLACEHOLDERS
==================================================== */

function renderExtra(program){

const container=document.getElementById("programExtra");

if(!container) return;

container.innerHTML="";

}

function renderActions(program){

const container=document.getElementById("programActions");

if(!container) return;

container.innerHTML="";

}

/* ====================================================
   PUBLIC
==================================================== */

export function getCurrentProgram(){

return currentProgram;

}