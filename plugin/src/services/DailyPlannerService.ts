import { App, TFile } from "obsidian";

const DEFAULT_DAILY_TARGET = 5;

const DEFAULT_TOPIC_ORDER = [
	"01 Arrays",
	"02 Binary Search",
	"03 Strings",
	"04 Linked List",
	"05 Recursion",
	"06 Bit Manipulation",
	"07 Stack & Queue",
	"08 Sliding Window",
	"09 Trees",
	"10 BST",
	"11 Heap",
	"12 Greedy",
	"13 Graphs",
	"14 Trie",
	"15 Dynamic Programming",
];

export class DailyPlannerService {

	constructor(private app: App) {}
	
	private getCurrentTopic(): string | null {

		for (const topic of DEFAULT_TOPIC_ORDER) {

			const files = this.app.vault
				.getMarkdownFiles()
				.filter(file =>
					file.path.startsWith(`02 Striver A2Z Sheet/${topic}/`)
				);

			const solved = files.filter(file => {

				const cache = this.app.metadataCache.getFileCache(file);

				return cache?.frontmatter?.status === "Solved";

			});

			if (solved.length !== files.length) {

				return topic;

			}

		}

		return null;

	}
	
	private getUnsolvedProblems(topic: string): TFile[] {

		return this.app.vault
			.getMarkdownFiles()
			.filter(file =>
				file.path.startsWith(`02 Striver A2Z Sheet/${topic}/`)
			)
			.sort((a, b) => {

				const aCache =
					this.app.metadataCache.getFileCache(a);

				const bCache =
					this.app.metadataCache.getFileCache(b);

				const aId =
					String(aCache?.frontmatter?.id ?? "");

				const bId =
					String(bCache?.frontmatter?.id ?? "");

				return aId.localeCompare(
					bId,
					undefined,
					{
						numeric: true,
					}
				);

			})
			.filter(file => {

				const cache =
					this.app.metadataCache.getFileCache(file);

				return cache?.frontmatter?.status !== "Solved";

			});

	}
	
	getTodaysPlan(): TFile[] {

		const currentTopic = this.getCurrentTopic();

		if (!currentTopic) {

			return [];

		}

		const unsolvedProblems =
			this.getUnsolvedProblems(currentTopic);

		return unsolvedProblems.slice(
			0,
			DEFAULT_DAILY_TARGET
		);

	}

	}

	
