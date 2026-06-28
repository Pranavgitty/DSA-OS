import { Notice, Plugin } from "obsidian";

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

            const today = new Date().toISOString().split("T")[0];

            await plugin.app.fileManager.processFrontMatter(file, (fm) => {

                if (fm.status === "Solved") {

                    fm.status = "Not Started";

                    delete fm.solvedOn;
                    delete fm.lastRevision;
                    delete fm.nextRevision;
                    delete fm.confidence;

                    new Notice("↩️ Marked as Not Started");

                } else {

                    fm.status = "Solved";

                    fm.solvedOn = today;
                    fm.lastRevision = today;

                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    fm.nextRevision = tomorrow.toISOString().split("T")[0];

                    fm.confidence = 1;

                    new Notice("✅ Problem Solved");
                }

            });

        }

    });

}
