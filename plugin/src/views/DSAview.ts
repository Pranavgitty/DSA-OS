import DSAOSPlugin from "../main";
import { EventService } from "../services/EventService";

import {
	ItemView,
	WorkspaceLeaf,
} from "obsidian";

export const DSA_VIEW_TYPE =
	"dsa-os-view";

export class DSAView extends ItemView {

	constructor(
		leaf: WorkspaceLeaf,
		private plugin: DSAOSPlugin
	) {

		super(leaf);

	}

	private readonly refreshHandler =
		() => {

			this.onOpen();

		};

	getViewType(): string {

		return DSA_VIEW_TYPE;

	}

	getDisplayText(): string {

		return "DSA-OS";

	}

	getIcon(): string {

		return "brain";

	}

	private createProgressBar(
		parent: HTMLElement,
		percentage: number
	): void {

		const bar =
			parent.createDiv();

		bar.style.height = "8px";
		bar.style.width = "100%";
		bar.style.borderRadius = "999px";
		bar.style.backgroundColor =
			"var(--background-modifier-border)";
		bar.style.margin = "6px 0";

		const fill =
			bar.createDiv();

		fill.style.height = "100%";
		fill.style.width =
			`${percentage}%`;
		fill.style.borderRadius =
			"999px";
		fill.style.backgroundColor =
			"var(--interactive-accent)";

	}

	async onOpen() {

		const container =
			this.containerEl.children[1];

		if (
			!(
				container instanceof
				HTMLElement
			)
		) {

			return;

		}

		container.empty();

		const progress =
			this.plugin
				.getProgressService();

		const planner =
			this.plugin
				.getDailyPlannerService();

		await planner.initialize();

		const todaysPlan =
			planner.getTodaysPlan();

		const overall =
			progress.getOverallProgress();

		const topicProgress =
			progress.getTopicProgress();
					// ==================================================
		// Header
		// ==================================================

		container.createEl("h2", {
			text: "🧠 DSA-OS",
		});

		container.createEl("hr");

		// ==================================================
		// Today's Plan
		// ==================================================

		container.createEl("h3", {
			text: "🎯 Today's Plan",
		});

		if (todaysPlan.length === 0) {

			container.createEl("p", {
				text: "🎉 All problems completed!",
			});

		} else {

			for (const file of todaysPlan) {

				container.createEl("p", {
					text: `□ ${file.basename}`,
				});

			}

		}

		container.createEl("hr");

		// ==================================================
		// Overall Progress
		// ==================================================

		container.createEl("h3", {
			text: "📈 Overall Progress",
		});

		container.createEl("p", {
			text: `${overall.solved} / ${overall.total} Solved`,
		});

		container.createEl("p", {
			text: `${overall.percentage}% Complete`,
		});

		this.createProgressBar(
			container,
			overall.percentage
		);

		container.createEl("hr");

		// ==================================================
		// Topic Progress
		// ==================================================

		container.createEl("h3", {
			text: "📚 Topic Progress",
		});

		const sortedTopics =
			[...topicProgress.entries()].sort(
				(a, b) =>
					a[0].localeCompare(
						b[0]
					)
			);

		for (
			const [topic, data]
			of sortedTopics
		) {

			const percentage =
				data.total === 0
					? 0
					: Math.round(
							(
								data.solved /
								data.total
							) * 100
					  );

			container.createEl("h4", {
				text: topic,
			});

			this.createProgressBar(
				container,
				percentage
			);

			container.createEl("p", {
				text:
					`${data.solved} / ${data.total}`,
			});

		}

		container.createEl("hr");

		EventService.on(
			"progress-changed",
			this.refreshHandler
		);
			}

	async onClose() {

		EventService.off(
			"progress-changed",
			this.refreshHandler
		);

	}

}