from pathlib import Path
import json
from jinja2 import Template

ROOT = Path(__file__).parent
PROJECT_ROOT = ROOT.parent

DATASET_DIR = ROOT / "dataset"

TEMPLATE_FILE = ROOT / "templates" / "problem.md.j2"

PROGRESS_FILE = ROOT / "data" / "progress.json"

TOPIC_MAP = {
    "learn-the-basics": "01 Arrays",

    "solve-problems-on-arrays-easy---medium---hard": "01 Arrays",

    "binary-search-1d-2d-arrays-search-space": "02 Binary Search",

    "strings-basic-medium": "03 Strings",
    "strings-hard": "03 Strings",

    "learn-linkedlist-single-ll-double-ll-medium-hard-problems": "04 Linked List",

    "recursion-patternwise": "05 Recursion",

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
        
def get_subfolder(dataset_name: str, pattern: str):

    # Default ordering
    DEFAULT = {
        "Easy": "01 Easy",
        "Medium": "02 Medium",
        "Hard": "03 Hard",
    }
    
    if dataset_name == "solve-problems-on-arrays-easy---medium---hard":

        ARRAY_MAP = {
            "Easy": "01 Easy",
            "Medium": "02 Medium",
            "Hard": "03 Hard",
        }

        return ARRAY_MAP.get(pattern, pattern)
    
    if dataset_name == "binary-search-1d-2d-arrays-search-space":

        BS_MAP = {
            "BS on 1D Arrays": "01 BS on 1D Arrays",
            "BS on Answers": "02 BS on Answers",
            "BS on 2D Arrays": "03 BS on 2D Arrays",
        }

        return BS_MAP.get(pattern, pattern)
        
    if dataset_name == "learn-linkedlist-single-ll-double-ll-medium-hard-problems":

        LL_MAP = {
            "Learn 1D LinkedList": "01 Learn 1D LinkedList",
            "Learn Doubly LinkedList": "02 Learn Doubly LinkedList",
            "Medium Problems of LL": "03 Medium Problems of LL",
            "Medium Problems of DLL": "04 Medium Problems of DLL",
            "Hard Problems of LL": "05 Hard Problems of LL",
        }

        return LL_MAP.get(pattern, pattern)
        
    if dataset_name == "recursion-patternwise":

        RECURSION_MAP = {
            "Get a Strong Hold": "01 Get a Strong Hold",
            "Subsequences Pattern": "02 Subsequences Pattern",
            "Trying out all Combos / Hard": "03 Trying out all Combos OR Hard",
        }

        return RECURSION_MAP.get(pattern, pattern)
        
    if dataset_name == "bit-manipulation-concepts-and-problems":

        BM_MAP = {
            "Learn Bit Manipulation": "01 Learn Bit Manipulation",
            "Interview Problems": "02 Interview Problems",
            "Advanced Maths": "03 Advanced Maths",
        }

        return BM_MAP.get(pattern, pattern)
        
    if dataset_name == "stack-and-queues-learning-pre-in-post-fix-monotonic-stack-implementation":

        SQ_MAP = {
            "Learning": "01 Learning",
            "Prefix, Infix, PostFix Conversion Problems": "02 Prefix, Infix, PostFix Conversion Problems",
            "Monotonic Stack/Queue Problems [VVV. Imp]": "03 Monotonic Stack Queue Problems",
            "Implementation Problems": "04 Implementation Problems",
        }

        return SQ_MAP.get(pattern, pattern)
        
    if dataset_name == "binary-trees-traversals-medium-and-hard-problems":

        TREE_MAP = {
            "Traversals": "01 Traversals",
            "Medium Problems": "02 Medium Problems",
            "Hard Problems": "03 Hard Problems",
        }

        return TREE_MAP.get(pattern, pattern)
        
    if dataset_name == "binary-search-trees-concept-and-problems":

        BST_MAP = {
            "Concepts": "01 Concepts",
            "Practice Problems": "02 Practice Problems",
        }

        return BST_MAP.get(pattern, pattern)
    
    if dataset_name == "heaps-learning-medium-hard-problems":

        HEAP_MAP = {
            "Learning": "01 Learning",
            "Medium Problems": "02 Medium Problems",
            "Hard Problems": "03 Hard Problems",
        }

        return HEAP_MAP.get(pattern, pattern)
    
    if dataset_name == "greedy-algorithms-easy-mediumhard":

        GREEDY_MAP = {
            "Easy Problems": "01 Easy Problems",
            "Medium/Hard": "02 Medium-Hard",
        }

        return GREEDY_MAP.get(pattern, pattern)
    
    if dataset_name == "graphs-concepts-and-problems":

        GRAPH_MAP = {
            "Learning": "01 Learning",
            "Problems on BFS/DFS": "02 Problems on BFS-DFS",
            "Topo Sort and Problems": "03 Topo Sort and Problems",
            "Shortest Path Algorithms and Problems": "04 Shortest Path Algorithms and Problems",
            "MinimumSpanningTree/Disjoint Set and Problems": "05 MST & Disjoint",
            "Other Algorithms": "06 Other Algorithms",
        }

        return GRAPH_MAP.get(pattern, pattern)
    
    if dataset_name == "dynamic-programming-patterns-and-problems":

        DP_MAP = {
            "Introduction to DP": "01 Introduction to DP",
            "1D DP": "02 1D DP",
            "2D/3D DP and DP on Grids": "03 2D-3D DP and DP on Grids",
            "DP on Subsequences": "04 DP on Subsequences",
            "DP on Strings": "05 DP on Strings",
            "DP on Stocks": "06 DP on Stocks",
            "DP on LIS": "07 DP on LIS",
            "MCM DP | Partition DP": "08 MCM DP and Partition DP",
            "DP on Squares": "09 DP on Squares",
        }

        return DP_MAP.get(pattern, pattern)
        
    if dataset_name == "sliding-window-and-two-pointer-combined-problems":

        SW_MAP = {
            "Medium Problems": "01 Medium Problems",
            "Hard Problems": "02 Hard Problems",
        }

        return SW_MAP.get(pattern, pattern)
        
    if dataset_name == "strings-basic-medium":

        STRING_MAP = {
            "Basic and Easy String Problems": "01 Basic and Easy String Problems",
            "Medium String Problems": "02 Medium String Problems",
        }

        return STRING_MAP.get(pattern, pattern)
        
    if dataset_name == "strings-hard":

        return "03 Hard Problems"
        
    if dataset_name == "tries":

        TRIE_MAP = {
            "Theory": "01 Theory",
            "Problems": "02 Problems",
        }

        return TRIE_MAP.get(pattern, pattern)
    
    return DEFAULT.get(pattern, pattern)

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

        # Skip Learn the Basics problems
        if problem["id"].startswith("X"):
            continue
            
        DIFFICULTY_MAP = {
            "Easy": "01 Easy",
            "Medium": "02 Medium",
            "Hard": "03 Hard",
        }
        
        subfolder = get_subfolder(dataset_name, problem["pattern"])

        difficulty_folder = output_dir / subfolder

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

        print(problem)

        rendered = template.render(
            **problem,
            topic=TOPIC_MAP[dataset_name],
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
