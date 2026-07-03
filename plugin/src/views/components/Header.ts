export class Header {
	static render(parent: HTMLElement): HTMLDivElement {
		const header = parent.createDiv({
			cls: "dsa-header",
		});

		header.createEl("h1", {
			text: "DSA-OS",
			cls: "dsa-title",
		});

		header.createEl("p", {
			text: "Track your DSA journey",
			cls: "dsa-subtitle",
		});

		return header;
	}
}