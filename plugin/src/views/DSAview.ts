import { ItemView, WorkspaceLeaf } from "obsidian";

import { ProgressService } from "../services/ProgressService";
import { EventService } from "../services/EventService";

export const DSA_VIEW_TYPE = "dsa-os-view";

export class DSAView extends ItemView {

	private readonly progressService = new ProgressService(this.app);

	private readonly refreshHandler = () => {
		this.render();
	};

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return DSA_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "DSA-OS";
	}

	getIcon(): string {
		return "brain";
	}

	async onOpen(): Promise<void> {
		EventService.on(
			"progress-changed",
			this.refreshHandler
		);

		this.render();
	}

	async onClose(): Promise<void> {
		EventService.off(
			"progress-changed",
			this.refreshHandler
		);
	}

	private render(): void {
		const container =
			this.containerEl.children[1] as HTMLElement | undefined;

		if (!container) {
			return;
		}

		container.empty();

		const progress =
			this.progressService.getOverallProgress();

		const topicProgress =
			this.progressService.getTopicProgress();

		container.createEl("h2", {
			text: "🧠 DSA-OS",
		});

		container.createEl("hr");

		container.createEl("h3", {
			text: "📈 Overall Progress",
		});

		container.createEl("p", {
			text: `${progress.solved} / ${progress.total} Solved`,
		});

		container.createEl("p", {
			text: `${progress.percentage}% Complete`,
		});

		this.createProgressBar(
			container,
			progress.percentage
		);

		container.createEl("hr");

		container.createEl("h3", {
			text: "📚 Topic Progress",
		});

		const sortedTopics =
			[...topicProgress.entries()].sort(
				(a, b) => a[0].localeCompare(b[0])
			);

		for (const [topic, data] of sortedTopics) {

			const percentage =
				data.total === 0
					? 0
					: Math.round(
							(data.solved / data.total) * 100
					  );

			container.createEl("h4", {
				text: topic,
			});

			this.createProgressBar(
				container,
				percentage
			);

			container.createEl("p", {
				text: `${data.solved} / ${data.total}`,
			});
		}
	}

	private createProgressBar(
		parent: HTMLElement,
		percentage: number
	): void {

		const bar = parent.createDiv();

		bar.style.height = "8px";
		bar.style.width = "100%";
		bar.style.borderRadius = "999px";
		bar.style.backgroundColor =
			"var(--background-modifier-border)";
		bar.style.margin = "6px 0";

		const fill = bar.createDiv();

		fill.style.height = "100%";
		fill.style.width = `${percentage}%`;
		fill.style.borderRadius = "999px";
		fill.style.backgroundColor =
			"var(--interactive-accent)";
	}
}