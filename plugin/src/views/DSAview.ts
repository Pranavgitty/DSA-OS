import { ItemView, WorkspaceLeaf } from "obsidian";

import { ProgressService } from "../services/ProgressService";
import { EventService } from "../services/EventService";

import { Header } from "./components/Header";
import { OverallProgressCard } from "./components/cards/OverallProgressCard";
import { TopicProgressCard } from "./components/cards/TopicProgressCard";

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

		const root = container.createDiv({
			cls: "dsa-os",
		});

		const overallProgress =
			this.progressService.getOverallProgress();

		const topicProgress =
			this.progressService.getTopicProgress();

		Header.render(root);

		OverallProgressCard.render(
			root,
			overallProgress
		);

		TopicProgressCard.render(
			root,
			topicProgress
		);
	}
}