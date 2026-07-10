// ===============================================
// DBU Smart CRM
// actions.js
// Refactored Actions Module
// ===============================================

import {
    formatCurrency,
    copyToClipboard
} from "./utils.js";

import { generateWhatsApp } from "./whatsapp.js";
import { toggleFavorite } from "./favorites.js";
import { showToast } from "../app.js";

/* ====================================================
   ACTIONS CONFIGURATION
==================================================== */

const ACTIONS = {
    whatsapp: {
        icon: "📱",
        label: "WhatsApp",
        handler: "shareWhatsapp"
    },
    copy: {
        icon: "📋",
        label: "Copy",
        handler: "copyProgram"
    },
    favorite: {
        icon: "⭐",
        label: "Favorite",
        handler: "favoriteProgram"
    },
    share: {
        icon: "🔗",
        label: "Share",
        handler: "shareProgram"
    },
    print: {
        icon: "🖨️",
        label: "Print",
        handler: "printProgram"
    },
    download: {
        icon: "📄",
        label: "Summary",
        handler: "downloadSummary"
    }
};

/* ====================================================
   PUBLIC - RENDER ACTION BUTTONS
==================================================== */

export function renderActions(program, container) {

    if (!container) return;

    container.innerHTML = `

<section class="details-card">

<h2>Quick Actions</h2>

<div class="action-grid">
    ${Object.entries(ACTIONS).map(([key, action]) => `
        <button
            class="action-btn"
            id="btn${key.charAt(0).toUpperCase() + key.slice(1)}"
            data-action="${key}"
            title="${action.label}">
            ${action.icon} ${action.label}
        </button>
    `).join("")}
</div>

<div id="actionMessage" class="action-message"></div>

</section>

`;

    bindActionEvents(program, container);

}

/* ====================================================
   PRIVATE - BIND EVENT LISTENERS
==================================================== */

function bindActionEvents(program, container) {

    const buttons = container.querySelectorAll(".action-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            executeAction(action, program, container);

        });

    });

}

/* ====================================================
   PRIVATE - EXECUTE ACTION
==================================================== */

function executeAction(actionType, program, container) {

    const actions = {

        whatsapp: () => shareWhatsapp(program),

        copy: () => copyProgram(program, container),

        favorite: () => favoriteProgram(program, container),

        share: () => shareProgram(program, container),

        print: () => printProgram(),

        download: () => downloadSummary(program, container)

    };

    if (actions[actionType]) {

        actions[actionType]();

    }

}

/* ====================================================
   ACTION: WHATSAPP
==================================================== */

function shareWhatsapp(program) {

    try {

        const message = generateWhatsApp(program);

        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    } catch (error) {

        console.error("WhatsApp share failed:", error);

        showToast("WhatsApp share failed.");

    }

}

/* ====================================================
   ACTION: COPY
==================================================== */

function copyProgram(program, container) {

    try {

        const text = `

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

        notify("Program copied to clipboard.", container);

    } catch (error) {

        console.error("Copy failed:", error);

        showToast("Failed to copy program.");

    }

}

/* ====================================================
   ACTION: FAVORITE
==================================================== */

function favoriteProgram(program, container) {

    try {

        const saved = toggleFavorite(program);

        notify(

            saved

                ? "✓ Added to favorites."

                : "✗ Removed from favorites.",

            container

        );

    } catch (error) {

        console.error("Favorite toggle failed:", error);

        showToast("Favorite operation failed.");

    }

}

/* ====================================================
   ACTION: SHARE
==================================================== */

async function shareProgram(program, container) {

    try {

        if (navigator.share) {

            await navigator.share({

                title: program.name,

                text: program.name,

                url: window.location.href

            });

            return;

        }

        copyToClipboard(window.location.href);

        notify("Link copied to clipboard.", container);

    } catch (error) {

        console.error("Share failed:", error);

        showToast("Share operation failed.");

    }

}

/* ====================================================
   ACTION: PRINT
==================================================== */

function printProgram() {

    try {

        window.print();

    } catch (error) {

        console.error("Print failed:", error);

        showToast("Print operation failed.");

    }

}

/* ====================================================
   ACTION: DOWNLOAD SUMMARY
==================================================== */

function downloadSummary(program, container) {

    try {

        const summary = `

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

        const blob = new Blob([summary], { type: "text/plain" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = `${program.name}.txt`;

        a.click();

        URL.revokeObjectURL(url);

        notify("Summary downloaded.", container);

    } catch (error) {

        console.error("Download failed:", error);

        showToast("Download operation failed.");

    }

}

/* ====================================================
   HELPER - NOTIFY USER
==================================================== */

function notify(message, container) {

    const messageBox = container?.querySelector("#actionMessage");

    if (!messageBox) return;

    messageBox.innerHTML = message;

    messageBox.classList.add("show");

    setTimeout(() => {

        messageBox.classList.remove("show");

    }, 2500);

}
