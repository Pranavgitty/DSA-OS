import { OverallProgress } from "../../../services/ProgressService";
import { ProgressBar } from "../ProgressBar";

export class OverallProgressCard {
	static render(
		parent: HTMLElement,
		progress: OverallProgress
	): HTMLDivElement {
		const card = parent.createDiv({
			cls: "dsa-card",
		});

		card.createEl("div", {
			text: "Overall Progress",
			cls: "dsa-section-title",
		});

		const overview = card.createDiv({
			cls: "dsa-overview",
		});

		const solved = overview.createDiv({
			cls: "dsa-overview-item",
		});

		solved.createEl("div", {
			text: `${progress.solved} / ${progress.total}`,
			cls: "dsa-stat-value",
		});

		solved.createEl("div", {
			text: "Solved",
			cls: "dsa-stat-label",
		});

		const complete = overview.createDiv({
			cls: "dsa-overview-item dsa-overview-right",
		});

		complete.createEl("div", {
			text: `${progress.percentage}%`,
			cls: "dsa-stat-value",
		});

		complete.createEl("div", {
			text: "Complete",
			cls: "dsa-stat-label",
		});

		ProgressBar.render(card, progress.percentage);

		return card;
	}
}