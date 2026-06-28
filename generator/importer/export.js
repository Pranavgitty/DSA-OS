const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(__dirname, "..", "dataset");

if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
}

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}
