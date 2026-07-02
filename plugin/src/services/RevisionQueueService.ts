import { App, TFile } from "obsidian";

export class RevisionQueueService {
	constructor(private app: App) {}

	/**
	 * Returns every markdown file in the vault.
	 */
	private getAllProblems(): TFile[] {
		return this.app.vault.getMarkdownFiles();
	}

	/**
	 * Returns all problems whose nextRevision is today or earlier.
	 */
	getTodaysProblems(): TFile[] {
		const today = new Date().toISOString().slice(0, 10);

		const dueProblems: TFile[] = [];

		for (const file of this.getAllProblems()) {
			const cache = this.app.metadataCache.getFileCache(file);
			const nextRevision = cache?.frontmatter?.nextRevision;

			if (typeof nextRevision !== "string") {
				continue;
			}

			if (nextRevision <= today) {
				dueProblems.push(file);
			}
		}

		return dueProblems;
	}
}