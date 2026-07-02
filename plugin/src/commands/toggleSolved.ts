import { Notice, Plugin } from "obsidian";

import { ProblemToggleService } from "../services/ProblemToggleService";

export function registerToggleSolved(plugin: Plugin): void {
	const toggleService = new ProblemToggleService(plugin.app);

	plugin.addCommand({
		id: "toggle-problem-solved",
		name: "Toggle Problem Solved",

		callback: async () => {
			const file = plugin.app.workspace.getActiveFile();

			if (!file) {
				new Notice("No file open.");
				return;
			}

			await toggleService.toggle(file);
		},
	});
}