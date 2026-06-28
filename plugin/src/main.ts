import { Plugin } from "obsidian";

import { registerToggleSolved } from "./commands/toggleSolved";

export default class DSAOSPlugin extends Plugin {

    async onload() {

        console.log("DSA-OS Loaded");

        registerToggleSolved(this);

    }

    onunload() {}

}
