import { App, TFile } from "obsidian";
import { VaultService } from "./VaultService";

export interface OverallProgress {
	total: number;
	solved: number;
	remaining: number;
	percentage: number;
}

export interface TopicProgress {
	total: number;
	solved: number;
}

export class ProgressService {
	private readonly vault: VaultService;

	constructor(private readonly app: App) {
		this.vault = new VaultService(app);
	}

	// ==========================
	// Helpers
	// ==========================

	getAllProblems(): TFile[] {
		return this.vault.getAllProblems();
	}

	isSolved(file: TFile): boolean {
		const frontmatter =
			this.app.metadataCache.getFileCache(file)?.frontmatter;

		return frontmatter?.status === "Solved";
	}

	// ==========================
	// Overall Progress
	// ==========================

	getOverallProgress(): OverallProgress {
		const problems = this.getAllProblems();

		const solved = problems.reduce(
			(count, file) => count + (this.isSolved(file) ? 1 : 0),
			0
		);

		const total = problems.length;

		return {
			total,
			solved,
			remaining: total - solved,
			percentage:
				total === 0
					? 0
					: Math.round((solved / total) * 100),
		};
	}

	// ==========================
	// Topic Progress
	// ==========================

	getTopicProgress(): Map<string, TopicProgress> {
		const topics = new Map<string, TopicProgress>();

		for (const file of this.getAllProblems()) {
			const frontmatter =
				this.app.metadataCache.getFileCache(file)?.frontmatter;

			const topic = frontmatter?.topic;

			if (typeof topic !== "string") {
				continue;
			}

			let progress = topics.get(topic);

			if (!progress) {
				progress = {
					total: 0,
					solved: 0,
				};

				topics.set(topic, progress);
			}

			progress.total++;

			if (this.isSolved(file)) {
				progress.solved++;
			}
		}

		return topics;
	}

	// ==========================
	// Queries
	// ==========================

	getSolvedProblems(): TFile[] {
		return this.getAllProblems().filter(file =>
			this.isSolved(file)
		);
	}

	getUnsolvedProblems(): TFile[] {
		return this.getAllProblems().filter(file =>
			!this.isSolved(file)
		);
	}
}