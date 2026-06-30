import { App, TFile, MarkdownView } from "obsidian";

import { ProgressService } from "./ProgressService";
import { EventService } from "./EventService";

export class ProblemStatusService {

	constructor(private app: App) {}

	register() {

		this.app.workspace.on(
			"active-leaf-change",
			() => this.onActiveLeafChange()
		);

	}

	private onActiveLeafChange() {

		const file = this.getCurrentProblem();

		if (!file) {

			this.removeButton();
			return;

		}

		this.createButton(file);

	}

	private getCurrentProblem(): TFile | null {

		const file = this.app.workspace.getActiveFile();

		if (!file) return null;

		if (!file.path.startsWith("02 Striver A2Z Sheet/")) {

			return null;

		}

		return file;

	}

	private createButton(file: TFile) {
	
		this.removeButton();

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) return;

		const container = view.contentEl;

		const button = document.createElement("button");

		button.className = "dsa-os-solved-button";

		const progress = new ProgressService(this.app);

		const solved = progress
			.getSolvedProblems()
			.some(f => f.path === file.path);

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

		container.prepend(button);

	}

	private removeButton() {

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		if (!view) return;

		view.contentEl
			.querySelector(".dsa-os-solved-button")
			?.remove();

	}

	private async toggleSolved(file: TFile) {

		const progress = new ProgressService(this.app);

		await progress.toggleSolved(file);

		EventService.emit("progress-changed");

	}

}
