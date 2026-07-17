from pathlib import Path
import json

DATASET_DIR = Path("generator/dataset")
VAULT_DIR = Path("vault/02 Striver A2Z Sheet")

# ----------------------------
# LOAD DATASET
# ----------------------------
dataset_problems = {}

for file in DATASET_DIR.glob("*.json"):
    if file.name == "schema.json":
        continue

    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)

    for p in data["problems"]:
        dataset_problems[p["id"]] = {
            "title": p["title"],
            "dataset": file.stem
        }

print(f"Dataset problems: {len(dataset_problems)}")

# ----------------------------
# LOAD VAULT FILES
# ----------------------------
vault_files = list(VAULT_DIR.rglob("*.md"))

vault_ids = set()

for f in vault_files:
    name = f.name

    # extract ID from filename (A01, SL01 etc)
    parts = name.split(" ")
    if len(parts) > 0:
        vault_ids.add(parts[0])

print(f"Vault files: {len(vault_ids)}")

# ----------------------------
# FIND MISSING
# ----------------------------
missing = []

for pid in dataset_problems.keys():
    if pid not in vault_ids:
        missing.append(pid)

# ----------------------------
# OUTPUT REPORT
# ----------------------------
print("\n====================")
print("MISSING PROBLEMS")
print("====================")

for m in missing:
    print(m, "-", dataset_problems[m]["title"])

print("\nTOTAL MISSING:", len(missing))