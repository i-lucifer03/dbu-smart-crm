import {formatCurrency} from "./utils.js";

export function generateWhatsApp(program){

return `🎓 *Desh Bhagat University*

*Program:* ${program.name}

*Faculty:* ${program.faculty}

*Duration:* ${program.duration}

*Eligibility:*
${program.eligibility}

*Fee Structure*

Semester Fee:
${formatCurrency(program.semesterFee)}

Registration Fee:
${formatCurrency(program.registrationFee)}

Hostel Fee:
${formatCurrency(program.hostelFee)}

*Recognitions*

✅ UGC Recognized

✅ NAAC A+

✅ AIU Member

For admission assistance,
Contact DBU Admission Cell.
`;

}