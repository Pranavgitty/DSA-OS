import { Plugin } from "obsidian";

import { registerToggleSolved } from "./commands/toggleSolved";
import { DSAView, DSA_VIEW_TYPE } from "./views/DSAview";

export default class DSAOSPlugin extends Plugin {

	async onload() {

		console.log("DSA-OS Loaded");

		registerToggleSolved(this);

		this.registerView(
			DSA_VIEW_TYPE,
			(leaf) => new DSAView(leaf)
		);

		this.addRibbonIcon(
			"brain",
			"Open DSA-OS",
			async () => {

				const leaf = this.app.workspace.getRightLeaf(false);

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
