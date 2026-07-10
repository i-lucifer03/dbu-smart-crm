// =======================================
// DBU Smart CRM
// dataLoader.js
// =======================================

/**
 * Loads programs.json from /data folder
 * Supports:
 * 1. Array format
 * 2. { programs: [] } format
 */

export async function loadPrograms() {

    try {

        const response = await fetch("./data/programs.json");

        if (!response.ok) {

            throw new Error(
                `Unable to load programs.json (${response.status})`
            );

        }

        const json = await response.json();

        let programs = [];

        // -----------------------------
        // Detect JSON Structure
        // -----------------------------

        if (Array.isArray(json)) {

            programs = json;

        }

        else if (
            json &&
            Array.isArray(json.programs)
        ) {

            programs = json.programs;

        }

        else {

            throw new Error(
                "Unsupported JSON structure."
            );

        }

        // -----------------------------
        // Normalize
        // -----------------------------

        programs = programs.map((program, index) =>
            normalizeProgram(program, index)
        );

        console.log(
            `✔ ${programs.length} Programs Loaded`
        );

        return programs;

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

/**
 * Normalize every program
 * Makes sure every object has
 * the same properties.
 */

function normalizeProgram(program, index) {

    return {

        id:

            program.id ??
            program.programId ??
            index + 1,

        name:

            program.programName ??
            program.name ??
            program.title ??
            "Untitled Program",

        faculty:

            program.faculty ??
            "",

        department:

            program.department ??
            "",

        category:

            program.category ??
            "",

        mode:

            program.mode ??
            "Regular",

        country:

            program.country ??
            "India",

        duration:

            program.duration ??
            "",

        semesters:

            program.semesters ??
            "",

        eligibility:

            program.eligibility ??
            "",

        description:

            program.description ??
            "",

        career:

            program.career ??
            "",

        semesterFee:

            program.semesterFee ??
            "",

        annualFee:

            program.annualFee ??
            "",

        totalFee:

            program.totalFee ??
            "",

        hostelFee:

            program.hostelFee ??
            "",

        registrationFee:

            program.registrationFee ??
            "",

        entrance:

            program.entrance ??
            "",

        approvals:

            program.approvals ??
            [],

        seats:

            program.seats ??
            "",

        status:

            program.status ??
            "Open",

        raw: program

    };

}