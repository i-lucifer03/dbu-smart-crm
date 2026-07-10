// ==============================================
// DBU Smart CRM
// details.js
// Milestone 2 - Part 1
// ==============================================

import {
    formatCurrency,
    safeText,
    createBadge
} from "./utils.js";

let currentProgram = null;

/**
 * Show Program Details
 */
export function showProgramDetails(program) {

    currentProgram = program;
setTimeout(() => {
    renderAdditionalDetails(program);
}, 0);
    const panel = document.getElementById("detailsPanel");

    if (!panel) return;

    panel.innerHTML = `

<div class="details-wrapper">

    ${heroSection(program)}

    ${basicInformation(program)}

    ${feeSection(program)}

    <div id="details-extra"></div>

</div>

`;

}

/* ==========================================
   HERO SECTION
========================================== */

function heroSection(program) {

    return `

<section class="program-hero">

    <div>

        <h1>

            ${safeText(program.name)}

        </h1>

        <p>

            ${safeText(program.faculty)}

        </p>

        <div class="hero-badges">

            ${createBadge(program.country)}

            ${createBadge(program.mode)}

            ${createBadge(program.category)}

        </div>

    </div>

</section>

`;

}

/* ==========================================
   BASIC INFORMATION
========================================== */

function basicInformation(program){

return`

<section class="details-card">

<h2>

Program Information

</h2>

<div class="info-grid">

<div>

<label>Faculty</label>

<p>${safeText(program.faculty)}</p>

</div>

<div>

<label>Department</label>

<p>${safeText(program.department)}</p>

</div>

<div>

<label>Duration</label>

<p>${safeText(program.duration)}</p>

</div>

<div>

<label>Semesters</label>

<p>${safeText(program.semesters)}</p>

</div>

<div>

<label>Country</label>

<p>${safeText(program.country)}</p>

</div>

<div>

<label>Mode</label>

<p>${safeText(program.mode)}</p>

</div>

<div>

<label>Status</label>

<p>${safeText(program.status)}</p>

</div>

<div>

<label>Seats</label>

<p>${safeText(program.seats)}</p>

</div>

</div>

</section>

`;

}

/* ==========================================
   FEES
========================================== */

function feeSection(program){

return`

<section class="details-card">

<h2>

Fee Structure

</h2>

<div class="fee-grid">

${feeCard(
"Semester Fee",
formatCurrency(program.semesterFee)
)}

${feeCard(
"Annual Fee",
formatCurrency(program.annualFee)
)}

${feeCard(
"Total Fee",
formatCurrency(program.totalFee)
)}

${feeCard(
"Registration",
formatCurrency(program.registrationFee)
)}

${feeCard(
"Hostel Fee",
formatCurrency(program.hostelFee)
)}

</div>

</section>

`;

}

/* ==========================================
   FEE CARD
========================================== */

function feeCard(title,value){

return`

<div class="fee-card">

<span>

${safeText(title)}

</span>

<h3>

${safeText(value)}

</h3>

</div>

`;

}

/* ==========================================
   PUBLIC GETTER
========================================== */

export function getCurrentProgram(){

return currentProgram;

}
/* ==========================================
   ADDITIONAL DETAILS SECTION
========================================== */

export function renderAdditionalDetails(program){

    const container = document.getElementById("details-extra");

    if(!container) return;

    container.innerHTML = `

        ${eligibilitySection(program)}

        ${entranceSection(program)}

        ${approvalSection(program)}

        ${careerSection(program)}

        ${descriptionSection(program)}

        ${internationalSection(program)}

    `;

}

/* ==========================================
   ELIGIBILITY
========================================== */

function eligibilitySection(program){

return `

<section class="details-card">

<h2>Eligibility</h2>

<p>

${safeText(program.eligibility || "Not Available")}

</p>

</section>

`;

}

/* ==========================================
   ENTRANCE TEST
========================================== */

function entranceSection(program){

return `

<section class="details-card">

<h2>Admission Process</h2>

<div class="info-grid">

<div>

<label>Entrance Test</label>

<p>${safeText(program.entrance || "Direct Admission")}</p>

</div>

<div>

<label>Seats</label>

<p>${safeText(program.seats || "N/A")}</p>

</div>

<div>

<label>Status</label>

<p>${safeText(program.status || "Open")}</p>

</div>

<div>

<label>Category</label>

<p>${safeText(program.category || "-")}</p>

</div>

</div>

</section>

`;

}

/* ==========================================
   APPROVALS
========================================== */

function approvalSection(program){

let approvals="";

if(Array.isArray(program.approvals)){

    approvals=program.approvals
    .map(item=>`<span class="approval-chip">${safeText(item)}</span>`)
    .join("");

}else{

    approvals=`<span class="approval-chip">

${safeText(program.approvals||"Not Available")}

</span>`;

}

return `

<section class="details-card">

<h2>Recognitions & Approvals</h2>

<div class="approval-container">

${approvals}

</div>

</section>

`;

}

/* ==========================================
   CAREER
========================================== */

function careerSection(program){

return `

<section class="details-card">

<h2>Career Opportunities</h2>

<p>

${safeText(program.career || "Information not available.")}

</p>

</section>

`;

}

/* ==========================================
   DESCRIPTION
========================================== */

function descriptionSection(program){

return `

<section class="details-card">

<h2>About this Program</h2>

<p>

${safeText(program.description || "No description available.")}

</p>

</section>

`;

}

/* ==========================================
   INTERNATIONAL
========================================== */

function internationalSection(program){

const rows=[];

if(program.country)
rows.push(infoRow("Country",program.country));

if(program.studentCategory)
rows.push(infoRow("Student Category",program.studentCategory));

if(program.currency)
rows.push(infoRow("Currency",program.currency));

if(program.language)
rows.push(infoRow("Language",program.language));

if(program.visaRequired)
rows.push(infoRow("Visa Required",program.visaRequired));

if(program.equivalenceRequired)
rows.push(infoRow("Equivalence",program.equivalenceRequired));

if(rows.length===0)
return "";

return `

<section class="details-card">

<h2>International Admission</h2>

${rows.join("")}

</section>

`;

}

/* ==========================================
   INFO ROW
========================================== */

function infoRow(title,value){

return `

<div class="info-row">

<strong>${safeText(title)}</strong>

<span>${safeText(value)}</span>

</div>

`;

}
/* ==========================================
   ACTION BUTTONS
========================================== */

import { generateWhatsApp } from "./whatsapp.js";
import { toggleFavorite } from "./favorites.js";
import { copyToClipboard } from "./utils.js";

function actionButtons(program){

return `

<section class="details-card">

<h2>Quick Actions</h2>

<div class="action-grid">

<button class="action-btn primary"
id="btnWhatsapp">

📱 WhatsApp

</button>

<button class="action-btn"

id="btnCopy">

📋 Copy Details

</button>

<button class="action-btn"

id="btnFavorite">

⭐ Favorite

</button>

<button class="action-btn"

id="btnShare">

🔗 Share

</button>

</div>

</section>

`;

}

/* ==========================================
   INITIALIZE EVENTS
========================================== */

export function initializeDetailEvents(program){

const whatsapp=document.getElementById("btnWhatsapp");

const copy=document.getElementById("btnCopy");

const favorite=document.getElementById("btnFavorite");

const share=document.getElementById("btnShare");

/* WhatsApp */

whatsapp?.addEventListener("click",()=>{

const message=generateWhatsApp(program);

const url=`https://wa.me/?text=${encodeURIComponent(message)}`;

window.open(url,"_blank");

});

/* Copy */

copy?.addEventListener("click",()=>{

copyToClipboard(JSON.stringify(program,null,2));

alert("Program copied successfully.");

});

/* Favorite */

favorite?.addEventListener("click",()=>{

const status=toggleFavorite(program);

favorite.innerHTML=status
? "⭐ Saved"
: "⭐ Favorite";

});

/* Share */

share?.addEventListener("click",()=>{

if(navigator.share){

navigator.share({

title:program.name,

text:program.name,

url:window.location.href

});

}else{

copyToClipboard(window.location.href);

alert("Link copied.");

}

});

}