import { App, Notice, TFile } from "obsidian";

import { RevisionService } from "./RevisionService";
import { EventService } from "./EventService";

export class ProblemToggleService {
	constructor(private readonly app: App) {}

	async toggle(file: TFile): Promise<void> {
		await this.app.fileManager.processFrontMatter(
			file,
			fm => {
				if (fm.status === "Solved") {
					fm.status = "Not Started";

					delete fm.solvedOn;
					delete fm.lastRevision;
					delete fm.nextRevision;
					delete fm.confidence;

					new Notice("↩️ Marked as Not Started");
					return;
				}

				const today = RevisionService.getToday();

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
		);

		EventService.emit("progress-changed");
	}
}