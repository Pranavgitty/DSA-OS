import { App, TFile } from "obsidian";
import { VaultService } from "./VaultService";

export class ProgressService {

	constructor(private app: App) {}

	// ==========================
	// Helpers
	// ==========================

	private getAllProblems(): TFile[] {

		return new VaultService(this.app).getAllProblems();

	}

	public isSolved(file: TFile): boolean {

		const cache = this.app.metadataCache.getFileCache(file);

		return cache?.frontmatter?.status === "Solved";

	}

	// ==========================
	// Overall Progress
	// ==========================

	getOverallProgress() {

		const problems = this.getAllProblems();

		const solved = problems.filter(file =>
			this.isSolved(file)
		).length;

		return {
			total: problems.length,
			solved,
			remaining: problems.length - solved,
			percentage:
				problems.length === 0
					? 0
					: Math.round((solved / problems.length) * 100),
		};

	}

	// ==========================
	// Topic Progress
	// ==========================

	getTopicProgress() {

		const topics = new Map<
			string,
			{
				total: number;
				solved: number;
			}
		>();

		for (const file of this.getAllProblems()) {

			const cache = this.app.metadataCache.getFileCache(file);

			console.log(file.basename, cache?.frontmatter);

			const topic = cache?.frontmatter?.topic;

			if (!topic) continue;

			if (!topics.has(topic)) {

				topics.set(topic, {
					total: 0,
					solved: 0,
				});

			}

			const current = topics.get(topic)!;

			current.total++;

			if (this.isSolved(file)) {

				current.solved++;

			}

		}

		return topics;

	}

	// ==========================
	// Solved Problems
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

	// ==========================
	// Status Updates
	// ==========================

	async markSolved(file: TFile) {

		await this.app.fileManager.processFrontMatter(
			file,
			(frontmatter) => {

				frontmatter.status = "Solved";

			}
		);

	}

	async markUnsolved(file: TFile) {

		await this.app.fileManager.processFrontMatter(
			file,
			(frontmatter) => {

				frontmatter.status = "Not Started";

			}
		);

	}

	async toggleSolved(file: TFile) {

		if (this.isSolved(file)) {

			await this.markUnsolved(file);

		} else {

			await this.markSolved(file);

		}

	}

}
