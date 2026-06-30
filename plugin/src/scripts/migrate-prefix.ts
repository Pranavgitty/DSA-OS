import fs from "fs";
import path from "path";
import matter from "gray-matter";

const VAULT_PATH = path.resolve("./"); // run inside plugin root

const PREFIX: Record<string, string> = {
	"01 Arrays": "A",
	"02 Binary Search": "BS",
	"03 Strings": "S",
	"04 Linked List": "LL",
	"05 Recursion": "R",
	"06 Bit Manipulation": "BM",
	"07 Stack & Queue": "SQ",
	"08 Sliding Window": "SL",
	"09 Trees": "T",
	"10 BST": "BST",
	"11 Heap": "H",
	"12 Greedy": "G",
	"13 Graphs": "GR",
	"14 Trie": "TR",
	"15 Dynamic Programming": "DP",
};

// collect all markdown files
function getAllFiles(dir: string): string[] {
	let results: string[] = [];

	for (const file of fs.readdirSync(dir)) {
		const full = path.join(dir, file);
		const stat = fs.statSync(full);

		if (stat.isDirectory()) {
			results = results.concat(getAllFiles(full));
		} else if (file.endsWith(".md")) {
			results.push(full);
		}
	}

	return results;
}

// extract number from S01 etc
function extractOldIndex(id: string): number {
	const match = id.match(/\d+/);
	return match ? parseInt(match[0]) : 0;
}

const files = getAllFiles(VAULT_PATH);

// STEP 1: read + group
const groups: Record<string, any[]> = {};

for (const file of files) {
	const raw = fs.readFileSync(file, "utf-8");
	const { data } = matter(raw);

	const topic = data.topic;
	const id = data.id;

	if (!topic || !id) continue;

	if (!groups[topic]) groups[topic] = [];

	groups[topic].push({
		file,
		raw,
		data,
		oldId: id,
		oldIndex: extractOldIndex(id),
	});
}

// STEP 2: process each topic
for (const topic of Object.keys(groups)) {
	const items = groups[topic] ?? [];

	// sort by old numeric index
	items.sort((a, b) => a.oldIndex - b.oldIndex);

	const prefix = PREFIX[topic];

	if (!prefix) {
		console.log(`❌ No prefix found for topic: ${topic}`);
		continue;
	}

	let counter = 1;

	for (const item of items) {
		const newIndex = String(counter).padStart(2, "0");
		const newId = `${prefix}${newIndex}`;

		const parsed = matter(item.raw);

		// update frontmatter
		parsed.data.id = newId;

		const updated = matter.stringify(parsed.content, parsed.data);

		// write file content first
		fs.writeFileSync(item.file, updated, "utf-8");

		// rename file
		const dir = path.dirname(item.file);
		const ext = path.extname(item.file);

		const baseName = path.basename(item.file);

		// replace old S01 / S02 prefix if exists
		const cleaned = baseName.replace(/^S\d+\s*/, "");

		const newFileName = `${newId} ${cleaned}`;
		const newPath = path.join(dir, newFileName);

		if (newPath !== item.file) {
			fs.renameSync(item.file, newPath);
		}

		console.log(`✔ ${item.oldId} → ${newId}`);

		counter++;
	}
}

console.log("✅ Migration complete");