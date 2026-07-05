from __future__ import annotations

import csv
import json
import re
import time
from dataclasses import dataclass
from difflib import SequenceMatcher
from pathlib import Path
from typing import Dict, List, Optional

# ============================================================================
# Paths
# ============================================================================

ROOT = Path(__file__).parent

DATASET_MD = ROOT / "dataset.md"

DATASET_DIR = ROOT / "dataset"

UNMATCHED_FILE = ROOT / "unmatched.csv"

DUPLICATES_FILE = ROOT / "duplicates.csv"

SIMILARITY_THRESHOLD = 0.95

# ============================================================================
# Data Models
# ============================================================================

@dataclass
class MasterProblem:

    title: str

    normalized: str

    leetcode: str

    code360: str

    naukri: str

    gfg: str


# ============================================================================
# Title Normalization
# ============================================================================

ROMAN = {
    " i ": " 1 ",
    " ii ": " 2 ",
    " iii ": " 3 ",
    " iv ": " 4 ",
    " v ": " 5 ",
}

ALIASES = {

    "largest element": "largest element in array",

    "second largest element": "second largest element in array",

    "left rotate array by one": "left rotate array by one place",

    "left rotate array by k places": "left rotate array by k places",

    "maximum product subarray in an array":
        "maximum product subarray",

    "print the matrix in spiral manner":
        "spiral matrix",

    "sort an array of 0 s 1 s and 2 s":
        "sort colors",

}


def normalize_title(title: str) -> str:

    title = title.lower().strip()

    title = title.replace("&", " and ")

    title = title.replace("/", " ")

    title = title.replace("-", " ")

    title = title.replace("_", " ")

    title = title.replace(",", " ")

    title = re.sub(r"\([^)]*\)", " ", title)

    title = re.sub(r"[^a-z0-9 ]", " ", title)

    title = f" {title} "

    for roman, arabic in ROMAN.items():
        title = title.replace(roman, arabic)

    title = re.sub(r"\s+", " ", title).strip()

    if title in ALIASES:
        title = ALIASES[title]

    return title


# ============================================================================
# URL Helpers
# ============================================================================

LINK_RE = re.compile(r"\((https?://[^)]+)\)")


def extract_url(cell: str) -> str:

    cell = cell.strip()

    if not cell:
        return ""

    if cell == "-":
        return ""

    m = LINK_RE.search(cell)

    if m:
        return m.group(1)

    if cell.startswith("http"):
        return cell

    return ""


# ============================================================================
# Markdown Parser
# ============================================================================

def parse_table_row(line: str) -> Optional[MasterProblem]:

    if not line.startswith("|"):
        return None

    cols = [c.strip() for c in line.split("|")[1:-1]]

    if len(cols) != 5:
        return None

    if cols[0] == "#":
        return None

    if cols[0].startswith("--"):
        return None

    title = cols[1]

    normalized = normalize_title(title)

    code360 = extract_url(cols[3])

    return MasterProblem(
        title=title,
        normalized=normalized,
        leetcode=extract_url(cols[2]),
        code360=code360,
        naukri=code360,
        gfg=extract_url(cols[4]),
    )


def build_master_index() -> Dict[str, MasterProblem]:

    print("Reading dataset.md...")

    mapping: Dict[str, MasterProblem] = {}

    duplicates = []

    with open(DATASET_MD, encoding="utf-8") as f:

        for line in f:

            row = parse_table_row(line)

            if row is None:
                continue

            if row.normalized in mapping:
                duplicates.append(row)
                continue

            mapping[row.normalized] = row

    if duplicates:

        with open(
            DUPLICATES_FILE,
            "w",
            newline="",
            encoding="utf-8",
        ) as f:

            writer = csv.writer(f)

            writer.writerow(
                [
                    "normalized",
                    "duplicate_title",
                ]
            )

            for d in duplicates:
                writer.writerow(
                    [
                        d.normalized,
                        d.title,
                    ]
                )

    print(f"Loaded {len(mapping)} master problems.")

    return mapping
    # ============================================================================
# Matching
# ============================================================================

def exact_match(
    title: str,
    master: Dict[str, MasterProblem],
) -> Optional[MasterProblem]:

    return master.get(normalize_title(title))


# ============================================================================
# Safer Fuzzy Matching (replace Part 2 implementation)
# ============================================================================

def fuzzy_match(
    title: str,
    master: Dict[str, MasterProblem],
) -> Optional[MasterProblem]:

    normalized = normalize_title(title)

    candidates = []

    for problem in master.values():

        score = SequenceMatcher(
            None,
            normalized,
            problem.normalized,
        ).ratio()

        if score >= SIMILARITY_THRESHOLD:
            candidates.append((score, problem))

    if not candidates:
        return None

    candidates.sort(
        key=lambda x: x[0],
        reverse=True,
    )

    # Never guess if two candidates have effectively
    # the same confidence.
    if len(candidates) >= 2:

        if abs(candidates[0][0] - candidates[1][0]) < 0.01:
            return None

    return candidates[0][1]



def find_problem(
    title: str,
    master: Dict[str, MasterProblem],
) -> Optional[MasterProblem]:

    exact = exact_match(title, master)

    if exact is not None:
        return exact

    return fuzzy_match(title, master)


# ============================================================================
# Dataset IO
# ============================================================================

def load_dataset(path: Path) -> dict:

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_dataset(path: Path, data: dict):

    with open(path, "w", encoding="utf-8") as f:

        json.dump(
            data,
            f,
            indent=2,
            ensure_ascii=False,
        )

        f.write("\n")


# ============================================================================
# Statistics
# ============================================================================

@dataclass
class Stats:

    datasets: int = 0

    problems: int = 0

    updated: int = 0

    exact_matches: int = 0

    fuzzy_matches: int = 0

    unmatched: int = 0


# ============================================================================
# Link Merge
# ============================================================================

def ensure_links(problem: dict):

    links = problem.setdefault("links", {})

    links.setdefault("striver", "")
    links.setdefault("leetcode", "")
    links.setdefault("gfg", "")
    links.setdefault("youtube", "")

    # New fields
    links.setdefault("code360", "")
    links.setdefault("naukri", "")

    return links


def merge_links(
    links: dict,
    master: MasterProblem,
) -> bool:

    changed = False

    def update(field: str, value: str):

        nonlocal changed

        if not value:
            return

        if links.get(field, "") != value:

            links[field] = value

            changed = True

    update("leetcode", master.leetcode)

    update("gfg", master.gfg)

    update("code360", master.code360)

    update("naukri", master.naukri)

    return changed


# ============================================================================
# Dataset Processing
# ============================================================================

def process_problem(
    problem: dict,
    master: Dict[str, MasterProblem],
    stats: Stats,
    unmatched_rows: List[List[str]],
) -> bool:

    stats.problems += 1

    title = problem["title"]

    result = exact_match(title, master)

    if result is not None:

        stats.exact_matches += 1

    else:

        result = fuzzy_match(title, master)

        if result is not None:
            stats.fuzzy_matches += 1

    if result is None:

        stats.unmatched += 1

        unmatched_rows.append(
            [
                problem["id"],
                title,
            ]
        )

        return False

    links = ensure_links(problem)

    return merge_links(
        links,
        result,
    )
    # ============================================================================
# Dataset Processing
# ============================================================================

def process_dataset(
    dataset_path: Path,
    master: Dict[str, MasterProblem],
    stats: Stats,
    unmatched_rows: List[List[str]],
):

    print(f"Processing {dataset_path.name}")

    data = load_dataset(dataset_path)

    modified = False

    for problem in data.get("problems", []):

        if process_problem(
            problem,
            master,
            stats,
            unmatched_rows,
        ):
            modified = True
            stats.updated += 1

    if modified:
        save_dataset(dataset_path, data)
        print("  ✓ Updated")
    else:
        print("  • No changes")

    stats.datasets += 1


# ============================================================================
# Reports
# ============================================================================

def write_unmatched_report(
    rows: List[List[str]],
):

    with open(
        UNMATCHED_FILE,
        "w",
        newline="",
        encoding="utf-8",
    ) as f:

        writer = csv.writer(f)

        writer.writerow(
            [
                "Problem ID",
                "Problem Title",
            ]
        )

        writer.writerows(rows)


def print_summary(
    stats: Stats,
    elapsed: float,
):

    print()

    print("=" * 70)

    print("Link Enrichment Summary")

    print("=" * 70)

    print(f"Datasets Processed : {stats.datasets}")

    print(f"Problems Scanned  : {stats.problems}")

    print(f"Updated           : {stats.updated}")

    print(f"Exact Matches     : {stats.exact_matches}")

    print(f"Fuzzy Matches     : {stats.fuzzy_matches}")

    print(f"Unmatched         : {stats.unmatched}")

    print(f"Time Taken        : {elapsed:.2f}s")

    print("=" * 70)


# ============================================================================
# Validation
# ============================================================================

def validate_links(problem: dict):

    links = ensure_links(problem)

    required = (
        "striver",
        "leetcode",
        "gfg",
        "youtube",
        "code360",
        "naukri",
    )

    missing = []

    for key in required:

        if key not in links:
            missing.append(key)

    return missing


def validate_dataset(
    dataset_path: Path,
):

    data = load_dataset(dataset_path)

    invalid = 0

    for problem in data["problems"]:

        missing = validate_links(problem)

        if missing:
            invalid += 1
            print(
                f"[WARN] {problem['id']} "
                f"is missing {', '.join(missing)}"
            )

    return invalid
    # ============================================================================
# Dataset Discovery
# ============================================================================

def discover_dataset_files() -> List[Path]:
    """
    Returns every dataset json except schema.json.
    """

    files = []

    for file in sorted(DATASET_DIR.glob("*.json")):

        if file.name == "schema.json":
            continue

        files.append(file)

    return files


# ============================================================================
# Enrichment Driver
# ============================================================================

def enrich_all(
    master: Dict[str, MasterProblem],
) -> Stats:

    stats = Stats()

    unmatched_rows: List[List[str]] = []

    dataset_files = discover_dataset_files()

    print(f"Found {len(dataset_files)} dataset files.\n")

    for dataset in dataset_files:

        process_dataset(
            dataset,
            master,
            stats,
            unmatched_rows,
        )

    write_unmatched_report(unmatched_rows)

    return stats


# ============================================================================
# Validation Driver
# ============================================================================

def validate_all():

    print("\nRunning validation...\n")

    invalid = 0

    for dataset in discover_dataset_files():

        invalid += validate_dataset(dataset)

    if invalid == 0:
        print("✓ Validation passed.\n")
    else:
        print(f"✗ {invalid} invalid problems found.\n")


# ============================================================================
# Banner
# ============================================================================

def print_banner():

    print("=" * 72)
    print("               DSA-OS DATASET LINK ENRICHMENT")
    print("=" * 72)
    print("Source : dataset.md")
    print("Target : generator/dataset/*.json")
    print("=" * 72)
    # ============================================================================
# Main
# ============================================================================

def main():

    start = time.perf_counter()

    print_banner()

    if not DATASET_MD.exists():
        raise FileNotFoundError(
            f"Missing dataset.md:\n{DATASET_MD}"
        )

    if not DATASET_DIR.exists():
        raise FileNotFoundError(
            f"Missing dataset directory:\n{DATASET_DIR}"
        )

    master = build_master_index()

    stats = enrich_all(master)

    validate_all()

    elapsed = time.perf_counter() - start

    print_summary(
        stats,
        elapsed,
    )

    print()

    print(f"Unmatched report : {UNMATCHED_FILE}")

    if DUPLICATES_FILE.exists():
        print(f"Duplicates report: {DUPLICATES_FILE}")

    print("\nDone.")


if __name__ == "__main__":
    main()