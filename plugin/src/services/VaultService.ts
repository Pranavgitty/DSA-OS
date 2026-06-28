import { App, TFile } from "obsidian";

export class VaultService {

	constructor(private app: App) {}

	getAllProblems(): TFile[] {

		const files = this.app.vault.getMarkdownFiles();

		return files.filter(file =>
			file.path.startsWith("02 Striver A2Z Sheet/")
		);

	}

	getProgress() {

		const problems = this.getAllProblems();

		const solved = problems.filter(file => {

			const cache = this.app.metadataCache.getFileCache(file);

			return cache?.frontmatter?.status === "Solved";

		});

		return {
			total: problems.length,
			solved: solved.length,
			percentage:
				problems.length === 0
					? 0
					: Math.round((solved.length / problems.length) * 100)
		};

	}

}
