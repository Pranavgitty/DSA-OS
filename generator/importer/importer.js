const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "input", "striver.html");

const html = fs.readFileSync(INPUT, "utf8");

// Extract every Flight chunk
const regex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;

let match;
let stream = "";

while ((match = regex.exec(html)) !== null) {
    stream += JSON.parse(`"${match[1]}"`);
}

console.log("Decoded stream length:", stream.length);

const idx = stream.indexOf('"sections"');

console.log("sections index:", idx);

function extractJSONArray(str, startIdx) {
    let start = str.indexOf("[", startIdx);

    let depth = 0;

    for (let i = start; i < str.length; i++) {

        if (str[i] === "[") depth++;

        else if (str[i] === "]") {

            depth--;

            if (depth === 0) {

                return str.slice(start, i + 1);

            }

        }

    }

    return null;
}

const sectionsJSON = extractJSONArray(stream, idx);

const OUTPUT = path.join(__dirname, "..", "dataset");

if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
}

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

const sections = JSON.parse(sectionsJSON);

console.log("Total Sections:", sections.length);

let totalProblems = 0;

const FILE_MAP = {
    "Solve Problems on Arrays [Easy -> Medium -> Hard]": "arrays",
    "Binary Search [1D, 2D Arrays, Search Space]": "binary-search",
    "Strings [Basic and Medium]": "strings-basic-medium",
    "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]": "linked-list",
    "Recursion [PatternWise]": "recursion",
    "Bit Manipulation [Concepts & Problems]": "bit-manipulation",
    "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]": "stack-queue",
    "Sliding Window & Two Pointer Combined Problems": "sliding-window",
    "Heaps [Learning, Medium, Hard Problems]": "heaps",
    "Greedy Algorithms [Easy, Medium/Hard]": "greedy",
    "Binary Trees [Traversals, Medium and Hard Problems]": "binary-trees",
    "Binary Search Trees [Concept and Problems]": "bst",
    "Graphs [Concepts & Problems]": "graphs",
    "Dynamic Programming [Patterns and Problems]": "dynamic-programming",
    "Tries": "tries",
    "Strings": "strings-hard"
};

const ID_PREFIX = {
    "arrays": "A",
    "binary-search": "BS",
    "strings-basic-medium": "S",
    "linked-list": "LL",
    "recursion": "R",
    "bit-manipulation": "BM",
    "stack-queue": "SQ",
    "sliding-window": "SW",
    "heaps": "H",
    "greedy": "G",
    "binary-trees": "BT",
    "bst": "BST",
    "graphs": "GR",
    "dynamic-programming": "DP",
    "tries": "TR",
    "strings-hard": "SH"
};

for (const section of sections) {

    const dataset = {
        topic: section.category_name,
        problems: []
    };

    let counter = 1;

    const key = FILE_MAP[section.category_name] || slugify(section.category_name);
    
    for (const sub of section.subcategories) {

        for (const problem of sub.problems) {

            dataset.problems.push({

                id: `${ID_PREFIX[key] || "X"}${String(counter).padStart(2, "0")}`,

                title: problem.problem_name,

                difficulty: problem.difficulty,

                pattern: sub.subcategory_name,

                summary: "",

                links: {
                    striver: problem.article === "$undefined" ? "" : problem.article,
                    leetcode: problem.leetcode === "$undefined" ? "" : problem.leetcode,
                    gfg: problem.link === "$undefined" ? "" : problem.link,
                    youtube: problem.youtube === "$undefined" ? "" : problem.youtube
                }

            });

            counter++;

        }

    }

    const filename = `${FILE_MAP[section.category_name] || slugify(section.category_name)}.json`;

    fs.writeFileSync(
        path.join(OUTPUT, filename),
        JSON.stringify(dataset, null, 2)
    );

    console.log("✓", filename);
}


