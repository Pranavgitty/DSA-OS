from pathlib import Path
import json
from jinja2 import Template

ROOT = Path(__file__).parent

DATA_FILE = ROOT / "data" / "arrays.json"
TEMPLATE_FILE = ROOT / "templates" / "problem.md.j2"

OUTPUT_DIR = (
    ROOT.parent
    / "02 Striver A2Z Sheet"
    / "01 Arrays"
)


def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def load_progress():
    with open(ROOT / "data" / "progress.json", "r", encoding="utf-8") as f:
        return json.load(f)

def load_template():
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as f:
        return Template(f.read())


def generate():
    data = load_data()
    progress = load_progress()
    template = load_template()

    for problem in data["problems"]:

        folder = OUTPUT_DIR / problem["difficulty"]
        folder.mkdir(parents=True, exist_ok=True)

        filename = f'{problem["id"]} {problem["title"]}.md'

        status = progress.get(problem["id"], {})

        rendered = template.render(
            **problem,
            solved=status.get("solved", False)
        )
        
        with open(folder / filename, "w", encoding="utf-8") as f:
            f.write(rendered)

        print(f"Generated {filename}")


if __name__ == "__main__":
    generate()
