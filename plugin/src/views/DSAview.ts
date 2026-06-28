import { VaultService } from "../services/VaultService";
import { RevisionQueueService } from "../services/RevisionQueueService";

import {
	ItemView,
	WorkspaceLeaf,
} from "obsidian";

export const DSA_VIEW_TYPE = "dsa-os-view";

export class DSAView extends ItemView {

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

	async onOpen() {

		const container = this.containerEl.children[1];

		container.empty();

		const vault = new VaultService(this.app);

		const progress = vault.getProgress();

		const topicProgress = vault.getTopicProgress();

		const revisionQueue = new RevisionQueueService(this.app);

		const todaysProblems = revisionQueue.getTodaysProblems();

		// ==========================
		// Header
		// ==========================

		container.createEl("h2", {
			text: "🧠 DSA-OS",
		});

		container.createEl("hr");

		// ==========================
		// Overall Progress
		// ==========================

		container.createEl("h3", {
			text: "📈 Overall Progress",
		});

		container.createEl("p", {
			text: `${progress.solved} / ${progress.total} Solved`,
		});

		container.createEl("p", {
			text: `${progress.percentage}% Complete`,
		});

		container.createEl("hr");

		// ==========================
		// Topic Progress
		// ==========================

		container.createEl("h3", {
			text: "📚 Topic Progress",
		});

		for (const [topic, data] of topicProgress) {

			const percentage =
				data.total === 0
					? 0
					: Math.round((data.solved / data.total) * 100);

			container.createEl("h4", {
				text: topic,
			});

			container.createEl("p", {
				text: `${data.solved} / ${data.total} (${percentage}%)`,
			});

		}

		container.createEl("hr");

		// ==========================
		// Today's Revision
		// ==========================

		container.createEl("h3", {
			text: `📅 Today's Revision (${todaysProblems.length})`,
		});

		if (todaysProblems.length === 0) {

			container.createEl("p", {
				text: "🎉 Nothing to revise today!",
			});

		} else {

			for (const file of todaysProblems) {

				container.createEl("p", {
					text: `□ ${file.basename}`,
				});

			}

		}

	}

	async onClose() {}

}
