import { VaultService } from "../services/VaultService";

import {
	App,
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

		console.log(progress);

		container.createEl("h2", {
			text: "🧠 DSA-OS",
		});

		container.createEl("p", {
			text: "Welcome to DSA-OS",
		});

		container.createEl("hr");

		container.createEl("h3", {
			text: "Today's Queue",
		});

		container.createEl("p", {
			text: "Coming Soon...",
		});

		container.createEl("h3", {
			text: "Progress",
		});

		container.createEl("p", {
			text: `${progress.solved} / ${progress.total} solved`,
		});

		container.createEl("p", {
			text: `${progress.percentage}% Complete`,
		});
	}

	async onClose() {}
}
