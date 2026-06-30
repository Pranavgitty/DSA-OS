import { App, TFile } from "obsidian";

import { VaultService } from "./VaultService";
import { ProgressService } from "./ProgressService";
import { SessionService } from "./SessionService";

const DEBUG_PLANNER = false;

const DEFAULT_TOPIC_ORDER = [
	"01 Arrays",
	"02 Binary Search",
	"03 Strings",
	"04 Linked List",
	"05 Recursion",
	"06 Bit Manipulation",
	"07 Stack & Queue",
	"08 Sliding Window",
	"09 Trees",
	"10 BST",
	"11 Heap",
	"12 Greedy",
	"13 Graphs",
	"14 Trie",
	"15 Dynamic Programming",
];

export class DailyPlannerService {

	constructor(
		private app: App,
		private vault: VaultService,
		private progress: ProgressService,
		private session: SessionService
	) {}

	public async initialize(): Promise<TFile[]> {

		const today = this.getToday();

		if (this.session.getDate() === today && this.session.getTodaysPlanIds().length > 0) {
			return this.getTodaysPlan();
		}

		await this.generateSession(today);
		return this.getTodaysPlan();
	}

	public getTodaysPlan(): TFile[] {
		const plan: TFile[] = [];

		for (const id of this.session.getTodaysPlanIds()) {
			const file = this.vault.getProblemById(id);
			if (file) plan.push(file);
		}

		return plan;
	}

	private async generateSession(date: string): Promise<void> {

		const roadmap = this.buildRoadmap();
		const firstUnsolved = this.findFirstUnsolvedIndex(roadmap);
		const carryOver = this.buildCarryOver();
		const dailyTarget = this.session.getDailyTarget();

		const todaysPlan: string[] = [...carryOver];

		if (carryOver.length <= Math.floor(dailyTarget / 2)) {
			this.fillRemainingProblems(todaysPlan, roadmap, firstUnsolved, dailyTarget);
		}

		if (DEBUG_PLANNER) {
			console.log("Roadmap:", roadmap.length);
			console.log("FirstUnsolved:", firstUnsolved);
			console.log("CarryOver:", carryOver);
			console.log("TodayPlan:", todaysPlan);
		}

		await this.session.startNewSession(
			date,
			todaysPlan,
			carryOver
		);
	}

	private buildRoadmap(): TFile[] {
		const all = this.vault.getAllProblems();
		const roadmap: TFile[] = [];

		for (const topic of DEFAULT_TOPIC_ORDER) {
			const filtered = all
				.filter(f => {
					const cache = this.app.metadataCache.getFileCache(f);
					return cache?.frontmatter?.topic === topic;
				})
				.sort((a, b) =>
					(this.getProblemId(a)).localeCompare(this.getProblemId(b), undefined, { numeric: true })
					);

			roadmap.push(...filtered);
		}

		return roadmap;
	}

	private findFirstUnsolvedIndex(roadmap: TFile[]): number {
		for (let i = 0; i < roadmap.length; i++) {
			const file = roadmap[i];
			if (!file) continue;

			if (!this.progress.isSolved(file)) {
				return i;
			}
		}

		return roadmap.length;
	}

	private buildCarryOver(): string[] {
		const carry: string[] = [];

		for (const id of this.session.getTodaysPlanIds()) {
			const file = this.vault.getProblemById(id);
			if (!file) continue;
			if (this.progress.isSolved(file)) continue;
			carry.push(id);
		}

		return carry;
	}

	private fillRemainingProblems(
		todaysPlan: string[],
		roadmap: TFile[],
		startIndex: number,
		dailyTarget: number
	): void {

		for (let i = startIndex; i < roadmap.length && todaysPlan.length < dailyTarget; i++) {

			const file = roadmap[i];
			if (!file) continue;

			const id = this.getProblemId(file);
			if (!id) continue;

			if (this.progress.isSolved(file)) continue;
			if (todaysPlan.includes(id)) continue;

			todaysPlan.push(id);
		}
	}

	private getProblemId(file: TFile): string {
		const cache = this.app.metadataCache.getFileCache(file);
		return String(cache?.frontmatter?.id ?? file.basename);
	}

	private getToday(): string {
		return new Date().toLocaleDateString("en-CA");
	}
}