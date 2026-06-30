import sys

from progress import solve


def main():

    if len(sys.argv) < 3:
        print("Usage: python cli.py solve <ProblemID>")
        return

    command = sys.argv[1]
    problem_id = sys.argv[2]

    if command == "solve":
        solve(problem_id)

    else:
        print("Unknown command")


if __name__ == "__main__":
    main()
