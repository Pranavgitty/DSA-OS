import { App, PluginSettingTab, Setting } from "obsidian";
import DSAOSPlugin from "./main";

export class DSAOSSettingTab extends PluginSettingTab {
	private readonly plugin: DSAOSPlugin;

	constructor(app: App, plugin: DSAOSPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "DSA-OS Settings",
		});

		new Setting(containerEl)
			.setName("Coming Soon")
			.setDesc(
				"Plugin settings will be added in a future release."
			);
	}
}