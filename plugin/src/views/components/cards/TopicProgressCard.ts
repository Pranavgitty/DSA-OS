import { TopicProgress } from "../../../services/ProgressService";
import { TopicRow } from "../TopicRow";

export class TopicProgressCard {
	static render(
		parent: HTMLElement,
		topicProgress: Map<string, TopicProgress>
	): HTMLDivElement {
		const card = parent.createDiv({
			cls: "dsa-card",
		});

		card.createEl("div", {
			text: "Topic Progress",
			cls: "dsa-section-title",
		});

		const sortedTopics = [...topicProgress.entries()].sort((a, b) =>
			a[0].localeCompare(b[0])
		);

		for (const [topic, data] of sortedTopics) {
			const percentage =
				data.total === 0
					? 0
					: Math.round((data.solved / data.total) * 100);

			TopicRow.render(
				card,
				topic,
				data.solved,
				data.total,
				percentage
			);
		}

		return card;
	}
}