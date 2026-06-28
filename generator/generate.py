from pathlib import Path
import json
from jinja2 import Template

ROOT = Path(__file__).parent
PROJECT_ROOT = ROOT.parent

DATASET_DIR = PROJECT_ROOT / "dataset"

TEMPLATE_FILE = ROOT / "templates" / "problem.md.j2"

PROGRESS_FILE = ROOT / "data" / "progress.json"

TOPIC_FOLDERS = {
    "Arrays": "01 Arrays",
    "Binary Search": "02 Binary Search",
    "Strings": "03 Strings",
    "Linked List": "04 Linked List",
    "Recursion": "05 Recursion",
    "Bit Manipulation": "06 Bit Manipulation",
    "Stack & Queue": "07 Stack & Queue",
    "Sliding Window": "08 Sliding Window",
    "Trees": "09 Trees",
    "BST": "10 BST",
    "Heap": "11 Heap",
    "Greedy": "12 Greedy",
    "Graphs": "13 Graphs",
    "Trie": "14 Trie",
    "Dynamic Programming": "15 Dynamic Programming",
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

    topic = data["topic"]

    if topic not in TOPIC_FOLDERS:
        print(f"Skipping unknown topic: {topic}")
        return

    output_dir = (
        PROJECT_ROOT
        / "02 Striver A2Z Sheet"
        / TOPIC_FOLDERS[topic]
    )

    for problem in data["problems"]:

        difficulty_folder = output_dir / problem["difficulty"]

        difficulty_folder.mkdir(parents=True, exist_ok=True)

        filename = f'{problem["id"]} {problem["title"]}.md'

        status = progress.get(problem["id"], {})

        rendered = template.render(
            **problem,
            solved=status.get("solved", False)
        )

        with open(
            difficulty_folder / filename,
            "w",
            encoding="utf-8"
        ) as f:
            f.write(rendered)

        print(f"Generated {filename}")


def generate():

    template = load_template()

    progress = load_progress()

    for dataset_file in sorted(DATASET_DIR.glob("*.json")):

        if dataset_file.name == "schema.json":
            continue

        generate_topic(
            dataset_file,
            template,
            progress
        )


if __name__ == "__main__":
    generate()
