// ==========================================
// DBU Smart CRM
// cards.js
// ==========================================

const grid = document.getElementById("programGrid");
const detailsPanel = document.getElementById("detailsPanel");

/**
 * Render Program Cards
 */

export function renderProgramCards(programs) {

    if (!grid) return;

    grid.innerHTML = "";

    if (!programs || programs.length === 0) {

        grid.innerHTML = `
            <div class="empty-results">
                <h2>No Programs Found</h2>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        return;
    }

    programs.forEach(program => {

        const card = createCard(program);

        grid.appendChild(card);

    });

}


/**
 * Create Card
 */

function createCard(program) {

    const card = document.createElement("div");

    card.className = "program-card";

    card.innerHTML = `

        <div class="program-header">

            <h3 class="program-title">

                ${escape(program.name)}

            </h3>

            <span class="status-badge ${statusClass(program.status)}">

                ${program.status || "Open"}

            </span>

        </div>

        <div class="program-faculty">

            ${escape(program.faculty)}

        </div>

        <div class="badge-container">

            ${badge(program.country,"country")}

            ${badge(program.mode,"mode")}

            ${badge(program.category,"category")}

        </div>

        <div class="program-info">

            <div>

                <strong>Duration</strong>

                <p>${escape(program.duration || "-")}</p>

            </div>

            <div>

                <strong>Semesters</strong>

                <p>${escape(program.semesters || "-")}</p>

            </div>

        </div>

        <div class="fee">

            ₹ ${format(program.semesterFee)}

            <small>/ Semester</small>

        </div>

    `;

    card.addEventListener("click", () => {

        openDetails(program);

    });

    return card;

}


/**
 * Program Details
 */

function openDetails(program){

    detailsPanel.innerHTML = `

        <h2>

            ${escape(program.name)}

        </h2>

        <p>

            ${escape(program.faculty)}

        </p>

        <hr>

        <h3>Duration</h3>

        <p>${escape(program.duration)}</p>

        <h3>Semesters</h3>

        <p>${escape(program.semesters)}</p>

        <h3>Eligibility</h3>

        <p>${escape(program.eligibility)}</p>

        <h3>Department</h3>

        <p>${escape(program.department)}</p>

        <h3>Country</h3>

        <p>${escape(program.country)}</p>

        <h3>Mode</h3>

        <p>${escape(program.mode)}</p>

        <h3>Semester Fee</h3>

        <p>₹ ${format(program.semesterFee)}</p>

        <h3>Total Fee</h3>

        <p>₹ ${format(program.totalFee)}</p>

        <h3>Hostel Fee</h3>

        <p>₹ ${format(program.hostelFee)}</p>

        <h3>Registration Fee</h3>

        <p>₹ ${format(program.registrationFee)}</p>

        <h3>Description</h3>

        <p>${escape(program.description)}</p>

        <br>

        <button
            class="primary-btn"
            id="copyProgram">

            Copy Details

        </button>

    `;

    const button = document.getElementById("copyProgram");

    if(button){

        button.addEventListener("click",()=>{

            navigator.clipboard.writeText(JSON.stringify(program,null,2));

            alert("Program copied.");

        });

    }

}


/**
 * Badge
 */

function badge(value){

    if(!value) return "";

    return `<span class="badge">${escape(value)}</span>`;

}


/**
 * Status Color
 */

function statusClass(status){

    if(!status) return "open";

    status = status.toLowerCase();

    if(status.includes("close")){

        return "closed";

    }

    return "open";

}


/**
 * Fee Formatting
 */

function format(value){

    if(value===undefined || value===null || value===""){

        return "-";

    }

    const number = Number(
        String(value).replace(/,/g,"")
    );

    if(isNaN(number)){

        return value;

    }

    return number.toLocaleString("en-IN");

}


/**
 * XSS Safe
 */

function escape(value){

    if(value===undefined || value===null){

        return "";

    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}