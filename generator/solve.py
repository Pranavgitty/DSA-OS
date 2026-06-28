import json
import sys
from pathlib import Path

ROOT = Path(__file__).parent
PROGRESS = ROOT / "data" / "progress.json"

problem_id = sys.argv[1]

with open(PROGRESS, "r", encoding="utf-8") as f:
    progress = json.load(f)

if problem_id not in progress:
    progress[problem_id] = {}

progress[problem_id]["solved"] = True

with open(PROGRESS, "w", encoding="utf-8") as f:
    json.dump(progress, f, indent=4)

print(f"{problem_id} marked as solved.")
