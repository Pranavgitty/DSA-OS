import { App, TFile } from "obsidian";

export class RevisionQueueService {

	constructor(private app: App) {}

	getTodaysProblems(): TFile[] {

		const today = new Date().toISOString().split("T")[0];

		const files = this.app.vault
			.getMarkdownFiles()
			.filter(file =>
				file.path.startsWith("02 Striver A2Z Sheet/")
			);

		const dueProblems: TFile[] = [];

		for (const file of files) {

			const cache = this.app.metadataCache.getFileCache(file);

			const frontmatter = cache?.frontmatter;

			if (!frontmatter) continue;

			if (frontmatter.status !== "Solved") continue;

			if (!frontmatter.nextRevision) continue;

			const nextRevision = String(frontmatter.nextRevision);

			if (nextRevision <= today) {
				dueProblems.push(file);
			}

		}

		return dueProblems;

	}

}
