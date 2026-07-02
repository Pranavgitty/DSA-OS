import { Plugin } from "obsidian";

import { ProblemStatusService } from "./services/ProblemStatusService";

import { UIService } from "./services/UIService";

import { registerToggleSolved } from "./commands/toggleSolved";

import { DSAView, DSA_VIEW_TYPE } from "./views/DSAview";

export default class DSAOSPlugin extends Plugin {

	private getToday(): string {
		return this.getToday()?? "";
	}

	async onload() {

		console.log("DSA-OS Loaded");

		// -----------------------------
		// Services
		// -----------------------------


		const problemStatus = new ProblemStatusService(this.app);

		const ui = new UIService(this.app);

		// -----------------------------
		// Commands
		// -----------------------------

		registerToggleSolved(this);

		// -----------------------------
		// Background Services
		// -----------------------------

		problemStatus.register();

		// -----------------------------
		// Views
		// -----------------------------

		this.registerView(
			DSA_VIEW_TYPE,
			leaf => new DSAView(leaf)
		);

		// -----------------------------
		// Ribbon Icon
		// -----------------------------

		this.addRibbonIcon(
			"brain",
			"Open DSA-OS",
			async () => {

				const leaf =
					this.app.workspace.getRightLeaf(false);

				if (!leaf) return;

				await leaf.setViewState({
					type: DSA_VIEW_TYPE,
					active: true,
				});

				this.app.workspace.revealLeaf(leaf);

			}
		);

	}

	onunload() {}


}