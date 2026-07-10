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