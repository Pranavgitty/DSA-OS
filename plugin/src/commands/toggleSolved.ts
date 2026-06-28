import { Notice, Plugin } from "obsidian";
import { RevisionService } from "../services/RevisionService";

export function registerToggleSolved(plugin: Plugin) {

	plugin.addCommand({

		id: "toggle-problem-solved",

		name: "Toggle Problem Solved",

		callback: async () => {

			const file = plugin.app.workspace.getActiveFile();

			if (!file) {
				new Notice("No file open.");
				return;
			}

			await plugin.app.fileManager.processFrontMatter(file, (fm) => {

				if (fm.status === "Solved") {

					fm.status = "Not Started";

					delete fm.solvedOn;
					delete fm.lastRevision;
					delete fm.nextRevision;
					delete fm.confidence;

					new Notice("↩️ Marked as Not Started");

				} else {

					const today = new Date().toISOString().split("T")[0];

					const confidence = RevisionService.increaseConfidence(
						Number(fm.confidence ?? 0)
					);

					fm.status = "Solved";
					fm.confidence = confidence;

					fm.solvedOn = today;
					fm.lastRevision = today;

					fm.nextRevision =
						RevisionService.getNextRevisionDate(confidence);

					new Notice("✅ Problem Solved");

				}

			});

		}

	});

}
