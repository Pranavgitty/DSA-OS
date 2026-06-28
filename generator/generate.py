from pathlib import Path
import json
from jinja2 import Template

ROOT = Path(__file__).parent
PROJECT_ROOT = ROOT.parent

DATASET_DIR = ROOT / "dataset"

TEMPLATE_FILE = ROOT / "templates" / "problem.md.j2"

PROGRESS_FILE = ROOT / "data" / "progress.json"

TOPIC_MAP = {
    "arrays": "01 Arrays",

    "binary-search-1d-2d-arrays-search-space": "02 Binary Search",

    "strings-basic-medium": "03 Strings",
    "strings-hard": "03 Strings",

    "linked-list": "04 Linked List",
    "recursion": "05 Recursion",

    "bit-manipulation-concepts-and-problems": "06 Bit Manipulation",

    "stack-and-queues-learning-pre-in-post-fix-monotonic-stack-implementation": "07 Stack & Queue",

    "sliding-window-and-two-pointer-combined-problems": "08 Sliding Window",

    "binary-trees-traversals-medium-and-hard-problems": "09 Trees",

    "binary-search-trees-concept-and-problems": "10 BST",

    "heaps-learning-medium-hard-problems": "11 Heap",

    "greedy-algorithms-easy-mediumhard": "12 Greedy",

    "graphs-concepts-and-problems": "13 Graphs",

    "tries": "14 Trie",

    "dynamic-programming-patterns-and-problems": "15 Dynamic Programming",
}


def load_progress():
    with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_template():
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        return Template(f.read())


def generate_topic(dataset_file, template, progress):

    with open(dataset_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    dataset_name = dataset_file.stem

    if dataset_name not in TOPIC_MAP:
        print(f"Skipping unknown topic: {dataset_name}")
        return

    output_dir = (
        PROJECT_ROOT
        / "02 Striver A2Z Sheet"
        / TOPIC_MAP[dataset_name]
    )

    for problem in data["problems"]:

        difficulty_folder = output_dir / problem["difficulty"]

        difficulty_folder.mkdir(parents=True, exist_ok=True)

        safe_title = (
            problem["title"]
            .replace("/", " or ")
            .replace("\\", " ")
            .replace(":", " -")
            .replace("*", "")
            .replace("?", "")
            .replace('"', "")
            .replace("<", "")
            .replace(">", "")
            .replace("|", "")
)

        filename = f'{problem["id"]} {safe_title}.md'

        status = progress.get(problem["id"], {})

        rendered = template.render(
            **problem,
            solved=status.get("solved", False)
        )

        file_path = difficulty_folder / filename

        if file_path.exists():
            print(f"Skipped {filename}")
            continue

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(rendered)

        print(f"Generated {filename}")


def generate():

    template = load_template()

    progress = load_progress()

    for dataset_file in sorted(DATASET_DIR.glob("*.json")):
        print(dataset_file)

        if dataset_file.name == "schema.json":
            continue

        generate_topic(
            dataset_file,
            template,
            progress
        )


if __name__ == "__main__":
    generate()
