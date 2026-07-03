export class ProgressBar {
	static render(
		parent: HTMLElement,
		percentage: number
	): HTMLDivElement {
		const bar = parent.createDiv({
			cls: "dsa-progress-bar",
		});

		const fill = bar.createDiv({
			cls: "dsa-progress-fill",
		});

		fill.style.width = `${percentage}%`;

		return bar;
	}
}