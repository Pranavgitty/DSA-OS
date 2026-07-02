import { App, MarkdownView, TFile } from "obsidian";

import { ProgressService } from "./ProgressService";
import { EventService } from "./EventService";
import { VaultService } from "./VaultService";

export class ProblemStatusService {
	private readonly vault: VaultService;
	private readonly progress: ProgressService;

	constructor(private readonly app: App) {
		this.vault = new VaultService(app);
		this.progress = new ProgressService(app);
	}

	register(): void {
		this.app.workspace.on(
			"active-leaf-change",
			() => this.onActiveLeafChange()
		);
	}

	private onActiveLeafChange(): void {
		const file = this.getCurrentProblem();

		if (!file) {
			this.removeButton();
			return;
		}

		this.createButton(file);
	}

	private getCurrentProblem(): TFile | null {
		const file = this.app.workspace.getActiveFile();

		if (!file) {
			return null;
		}

		return this.vault.isProblemFile(file) ? file : null;
	}

	private createButton(file: TFile): void {
		this.removeButton();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) {
			return;
		}

		const button = document.createElement("button");
		button.className = "dsa-os-solved-button";

		const solved = this.progress
			.getSolvedProblems()
			.some(problem => problem.path === file.path);

		button.textContent = solved
			? "✅ Solved"
			: "⬜ Mark Solved";

		button.style.width = "100%";
		button.style.marginBottom = "12px";

		button.onclick = async () => {
			const wasSolved = button.textContent === "✅ Solved";

			await this.toggleSolved(file);

			button.textContent = wasSolved
				? "⬜ Mark Solved"
				: "✅ Solved";
		};

		view.contentEl.prepend(button);
	}

	private removeButton(): void {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) {
			return;
		}

		view.contentEl
			.querySelector(".dsa-os-solved-button")
			?.remove();
	}

	private async toggleSolved(file: TFile): Promise<void> {
		await this.progress.toggleSolved(file);

		EventService.emit("progress-changed");
	}
}