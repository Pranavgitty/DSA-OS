import { App, MarkdownView, TFile } from "obsidian";

import { ProgressService } from "./ProgressService";
import { ProblemToggleService } from "./ProblemToggleService";
import { VaultService } from "./VaultService";

export class ProblemStatusService {
	private readonly vault: VaultService;
	private readonly progress: ProgressService;
	private readonly toggleService: ProblemToggleService;

	constructor(private readonly app: App) {
		this.vault = new VaultService(app);
		this.progress = new ProgressService(app);
		this.toggleService = new ProblemToggleService(app);
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

		return this.vault.isProblemFile(file)
			? file
			: null;
	}

	private createButton(file: TFile): void {
		this.removeButton();

		const view =
			this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) {
			return;
		}

		const button = document.createElement("button");

		button.className = "dsa-os-solved-button";

		const solved = this.progress.isSolved(file);

		button.textContent = solved
			? "✅ Solved"
			: "⬜ Mark Solved";

		button.style.width = "100%";
		button.style.marginBottom = "12px";

		button.onclick = async () => {
			await this.toggleSolved(file);

			button.textContent = this.progress.isSolved(file)
				? "✅ Solved"
				: "⬜ Mark Solved";
		};

		view.contentEl.prepend(button);
	}

	private removeButton(): void {
		const view =
			this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) {
			return;
		}

		view.contentEl
			.querySelector(".dsa-os-solved-button")
			?.remove();
	}

	private async toggleSolved(file: TFile): Promise<void> {
		await this.toggleService.toggle(file);
	}
}