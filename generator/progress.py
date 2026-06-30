import json
from pathlib import Path
from datetime import date

ROOT = Path(__file__).parent

PROGRESS_FILE = ROOT / "data" / "progress.json"


def load_progress():
    with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_progress(progress):
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, indent=4)


def solve(problem_id):

    progress = load_progress()

    if problem_id not in progress:
        progress[problem_id] = {
            "status": "Solved",
            "attempts": 1,
            "lastSolved": str(date.today()),
            "revisionStage": 0,
            "favorite": False,
            "notes": ""
        }
    else:
        progress[problem_id]["status"] = "Solved"
        progress[problem_id]["attempts"] += 1
        progress[problem_id]["lastSolved"] = str(date.today())

    save_progress(progress)

    print(f"✅ Marked {problem_id} as solved.")
