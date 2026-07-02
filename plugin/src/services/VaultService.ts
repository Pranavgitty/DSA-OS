import { App, TFile } from "obsidian";
import { PATHS } from "../constants/Paths";

export class VaultService {
	constructor(private readonly app: App) {}

	/**
	 * Returns every problem in the Striver sheet.
	 */
	getAllProblems(): TFile[] {
		return this.app.vault
			.getMarkdownFiles()
			.filter(file => file.path.startsWith(`${PATHS.STRIVER_ROOT}/`));
	}

	/**
	 * Finds a problem by its frontmatter id.
	 */
	getProblemById(id: string): TFile | null {
		return (
			this.getAllProblems().find(file => {
				const frontmatter =
					this.app.metadataCache.getFileCache(file)?.frontmatter;

				return String(frontmatter?.id ?? "") === id;
			}) ?? null
		);
	}

	/**
	 * Returns true if the given file belongs to the Striver sheet.
	 */
	isProblemFile(file: TFile): boolean {
		return file.path.startsWith(`${PATHS.STRIVER_ROOT}/`);
	}
}