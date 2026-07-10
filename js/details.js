// ===============================================
// DBU Smart CRM
// details.js
// Version 2.0
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
   PUBLIC - SHOW DETAILS
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
   HERO SECTION
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
   BASIC INFORMATION SECTION
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

${feeCard("Semester",program.semesterFee)}

${feeCard("Annual",program.annualFee)}

${feeCard("Total",program.totalFee)}

${feeCard("Registration",program.registrationFee)}

${feeCard("Hostel",program.hostelFee)}

</div>

</section>

`;

}

/* ====================================================
   FEE CARD COMPONENT
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
   INFO ITEM COMPONENT
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
   BADGE HELPER
==================================================== */

function badge(value){

if(!value) return "";

return createBadge(value);

}

/* ====================================================
   EXTRA SECTION (PLACEHOLDER)
==================================================== */

function renderExtra(program){

const container=document.getElementById("programExtra");

if(!container) return;

container.innerHTML="";

}

/* ====================================================
   ACTIONS SECTION
==================================================== */

function renderActions(program){

    const container=document.getElementById("programActions");

    if(!container) return;

    container.innerHTML=`

<section class="details-card">

<h2>

Quick Actions

</h2>

<div class="action-grid">

<button
class="action-btn whatsapp"
id="btnWhatsapp">

📱 WhatsApp

</button>

<button
class="action-btn"
id="btnCopy">

📋 Copy

</button>

<button
class="action-btn"
id="btnFavorite">

⭐ Favorite

</button>

<button
class="action-btn"
id="btnShare">

🔗 Share

</button>

<button
class="action-btn"
id="btnPrint">

🖨️ Print

</button>

<button
class="action-btn"
id="btnDownload">

📄 Summary

</button>

</div>

<div
id="actionMessage"
class="action-message">

</div>

</section>

`;

    bindEvents(program);

}

/* ====================================================
   EVENT BINDING
==================================================== */

function bindEvents(program){

    document
    .getElementById("btnWhatsapp")
    ?.addEventListener(
        "click",
        ()=>shareWhatsapp(program)
    );

    document
    .getElementById("btnCopy")
    ?.addEventListener(
        "click",
        ()=>copyProgram(program)
    );

    document
    .getElementById("btnFavorite")
    ?.addEventListener(
        "click",
        ()=>favoriteProgram(program)
    );

    document
    .getElementById("btnShare")
    ?.addEventListener(
        "click",
        ()=>shareProgram(program)
    );

    document
    .getElementById("btnPrint")
    ?.addEventListener(
        "click",
        printProgram
    );

    document
    .getElementById("btnDownload")
    ?.addEventListener(
        "click",
        ()=>downloadSummary(program)
    );

}

/* ====================================================
   WHATSAPP ACTION
==================================================== */

function shareWhatsapp(program){

    const message=
        generateWhatsApp(program);

    const url=
`https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

}

/* ====================================================
   COPY ACTION
==================================================== */

function copyProgram(program){

const text=`

Program : ${program.name}

Faculty : ${program.faculty}

Duration : ${program.duration}

Eligibility :
${program.eligibility}

Semester Fee :
${formatCurrency(program.semesterFee)}

Annual Fee :
${formatCurrency(program.annualFee)}

Total Fee :
${formatCurrency(program.totalFee)}

Registration :
${formatCurrency(program.registrationFee)}

Hostel :
${formatCurrency(program.hostelFee)}

`;

copyToClipboard(text);

notify("Program copied.");

}

/* ====================================================
   FAVORITE ACTION
==================================================== */

function favoriteProgram(program){

    const saved=
        toggleFavorite(program);

    notify(

        saved

        ? "Added to favorites."

        : "Removed from favorites."

    );

}

/* ====================================================
   SHARE ACTION
==================================================== */

async function shareProgram(program){

    if(navigator.share){

        await navigator.share({

            title:program.name,

            text:program.name,

            url:window.location.href

        });

        return;

    }

    copyToClipboard(window.location.href);

    notify("Link copied.");

}

/* ====================================================
   PRINT ACTION
==================================================== */

function printProgram(){

    window.print();

}

/* ====================================================
   DOWNLOAD SUMMARY ACTION
==================================================== */

function downloadSummary(program){

const summary=`

Program

${program.name}

Faculty

${program.faculty}

Duration

${program.duration}

Eligibility

${program.eligibility}

Semester Fee

${formatCurrency(program.semesterFee)}

Annual Fee

${formatCurrency(program.annualFee)}

Total Fee

${formatCurrency(program.totalFee)}

`;

const blob=new Blob(

    [summary],

    {type:"text/plain"}

);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download=

`${program.name}.txt`;

a.click();

URL.revokeObjectURL(url);

notify("Summary downloaded.");

}

/* ====================================================
   NOTIFICATION HELPER
==================================================== */

function notify(message){

const box=

document.getElementById(

"actionMessage"

);

if(!box) return;

box.innerHTML=message;

box.classList.add("show");

setTimeout(()=>{

box.classList.remove("show");

},2500);

}

/* ====================================================
   GETTER - GET CURRENT PROGRAM
==================================================== */

export function getCurrentProgram(){

return currentProgram;

}
