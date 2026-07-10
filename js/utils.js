// ======================================
// DBU Smart CRM
// utils.js
// ======================================

export function formatCurrency(value){

    if(value===null || value===undefined || value==="")
        return "-";

    const number=Number(
        String(value).replace(/,/g,"")
    );

    if(isNaN(number))
        return value;

    return "₹ "+number.toLocaleString("en-IN");

}

export function safeText(value){

    if(value===null || value===undefined)
        return "";

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}

export function yesNo(value){

    if(value===true)
        return "Yes";

    if(value===false)
        return "No";

    return value || "-";

}

export function copyToClipboard(text){

    navigator.clipboard.writeText(text);

}

export function createBadge(text){

    if(!text)
        return "";

    return `<span class="badge">${safeText(text)}</span>`;

}