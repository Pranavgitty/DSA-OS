import { App, TFile } from "obsidian";

export class VaultService {

	constructor(private app: App) {}

	getAllProblems(): TFile[] {

		const files = this.app.vault.getMarkdownFiles();

		return files.filter(file =>
			file.path.startsWith("02 Striver A2Z Sheet/")
		);

	}

	getProblemById(id: string): TFile | null {

		for (const file of this.getAllProblems()) {

			const cache = this.app.metadataCache.getFileCache(file);

			if (String(cache?.frontmatter?.id) === id) {

				return file;

			}

		}

		return null;

	}
}
