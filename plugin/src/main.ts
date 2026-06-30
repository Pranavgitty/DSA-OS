import { Plugin } from "obsidian";

import { ProblemStatusService } from "./services/ProblemStatusService";
import { SessionService } from "./services/SessionService";
import { ProgressService } from "./services/ProgressService";
import { VaultService } from "./services/VaultService";
import { DailyPlannerService } from "./services/DailyPlannerService";
import { UIService } from "./services/UIService";

import { registerToggleSolved } from "./commands/toggleSolved";

import { DSAView, DSA_VIEW_TYPE } from "./views/DSAview";

export default class DSAOSPlugin extends Plugin {

	private sessionService!: SessionService;

	private vaultService!: VaultService;

	private progressService!: ProgressService;

	private dailyPlannerService!: DailyPlannerService;

	async onload() {

		console.log("DSA-OS Loaded");

		// -----------------------------
		// Services
		// -----------------------------

		this.sessionService = new SessionService(this);

		await this.sessionService.initialize();

		this.vaultService = new VaultService(this.app);

		this.progressService = new ProgressService(this.app);

		this.dailyPlannerService =
			new DailyPlannerService(
				this.app,
				this.vaultService,
				this.progressService,
				this.sessionService
			);

		await this.dailyPlannerService.initialize();

		const problemStatus =
			new ProblemStatusService(this.app);

		const ui =
			new UIService(this.app);

		// Prevent unused variable warning.
		void ui;

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
			(leaf) => new DSAView(
				leaf,
			this
		)
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

				if (!leaf) {

					return;

				}

				await leaf.setViewState({
					type: DSA_VIEW_TYPE,
					active: true,
				});

				this.app.workspace.revealLeaf(leaf);

			}
		);

	}

	onunload() {}

	getSessionService(): SessionService {

		return this.sessionService;

	}

	getVaultService(): VaultService {

		return this.vaultService;

	}

	getProgressService(): ProgressService {

		return this.progressService;

	}

	getDailyPlannerService(): DailyPlannerService {

		return this.dailyPlannerService;

	}

}