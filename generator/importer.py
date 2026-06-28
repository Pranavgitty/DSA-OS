from pathlib import Path
import re

ROOT = Path(__file__).parent
PROJECT_ROOT = ROOT.parent

HTML_FILE = PROJECT_ROOT / "tmp" / "striver.html"


def load_html():
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        return f.read()


def extract_problem_blocks(html: str):
    """
    Finds every embedded problem object that contains a problem_name.
    """

    pattern = re.compile(
        r'\\"problem_name\\":\\".*?\\"',
        re.DOTALL
    )

    return pattern.findall(html)


def main():

    html = load_html()

    problems = extract_problem_blocks(html)

    print(f"Found {len(problems)} raw problem entries.")

    print()

    print("First 10 entries:\n")

    for p in problems[:10]:
        print(p)
        print("-" * 80)


if __name__ == "__main__":
    main()
