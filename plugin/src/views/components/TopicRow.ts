import { ProgressBar } from "./ProgressBar";

export class TopicRow {
	static render(
		parent: HTMLElement,
		title: string,
		solved: number,
		total: number,
		percentage: number
	): HTMLDivElement {
		const row = parent.createDiv({
			cls: "dsa-topic",
		});

		const header = row.createDiv({
			cls: "dsa-topic-header",
		});

		header.createEl("div", {
			text: title,
			cls: "dsa-topic-title",
		});

		header.createEl("div", {
			text: `${solved} / ${total}`,
			cls: "dsa-topic-meta",
		});

		ProgressBar.render(row, percentage);

		return row;
	}
}