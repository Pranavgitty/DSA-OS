import { App, TFile } from "obsidian";
import DSAOSPlugin from "../main";

export interface PlannerSession {

	date: string;

	roadmapIndex: number;

	dailyTarget: number;

	todaysPlan: string[];

	carryOver: string[];

}

export class SessionService {

	private session: PlannerSession;

	constructor(private plugin: DSAOSPlugin) {

		this.session = this.createDefaultSession();

	}

	private createDefaultSession(): PlannerSession {

		return {

			date: "",

			roadmapIndex: 0,

			dailyTarget: 5,

			todaysPlan: [],

			carryOver: [],

		};

	}

	getSession(): PlannerSession {

		return structuredClone(this.session);

	}

	setSession(session: PlannerSession): void {

		this.session = structuredClone(session);

	}

	resetSession(): void {

		this.session = this.createDefaultSession();

	}

	getDate(): string {

		return this.session.date;

	}

	setDate(date: string): void {

		this.session.date = date;

	}

	getRoadmapIndex(): number {

		return this.session.roadmapIndex;

	}

	setRoadmapIndex(index: number): void {

		this.session.roadmapIndex = Math.max(0, index);

	}

	incrementRoadmapIndex(count = 1): void {

		this.session.roadmapIndex += count;

	}

	getDailyTarget(): number {

		return this.session.dailyTarget;

	}

	setDailyTarget(target: number): void {

		this.session.dailyTarget = Math.max(1, target);

	}

	getTodaysPlanIds(): string[] {

		return [...this.session.todaysPlan];

	}

	setTodaysPlanIds(ids: string[]): void {

		this.session.todaysPlan = [...ids];

	}

	clearTodaysPlan(): void {

		this.session.todaysPlan = [];

	}

	addTodaysProblem(id: string): void {

		if (!this.session.todaysPlan.includes(id)) {

			this.session.todaysPlan.push(id);

		}

	}

	removeTodaysProblem(id: string): void {

		this.session.todaysPlan =
			this.session.todaysPlan.filter(
				problemId => problemId !== id
			);

	}

	getCarryOverIds(): string[] {

		return [...this.session.carryOver];

	}

	setCarryOverIds(ids: string[]): void {

		this.session.carryOver = [...ids];

	}

	clearCarryOver(): void {

		this.session.carryOver = [];

	}

	addCarryOver(id: string): void {

		if (!this.session.carryOver.includes(id)) {

			this.session.carryOver.push(id);

		}

	}

	removeCarryOver(id: string): void {

		this.session.carryOver =
			this.session.carryOver.filter(
				problemId => problemId !== id
			);

	}

	isCarryOverFrozen(): boolean {

		return (
			this.session.carryOver.length >
			Math.floor(this.session.dailyTarget / 2)
		);

	}

	isSessionComplete(
		isSolved: (id: string) => boolean
	): boolean {

		return this.session.todaysPlan.every(id =>
			isSolved(id)
		);

	}

	getRemainingProblemIds(
		isSolved: (id: string) => boolean
	): string[] {

		return this.session.todaysPlan.filter(
			id => !isSolved(id)
		);

	}

	getCompletedProblemIds(
		isSolved: (id: string) => boolean
	): string[] {

		return this.session.todaysPlan.filter(
			id => isSolved(id)
		);

	}

	getCompletionPercentage(
		isSolved: (id: string) => boolean
	): number {

		if (this.session.todaysPlan.length === 0) {

			return 0;

		}

		const completed =
			this.getCompletedProblemIds(isSolved).length;

		return Math.round(
			(completed / this.session.todaysPlan.length) * 100
		);

	}

	resolveFiles(
		files: TFile[]
	): TFile[] {

		const map = new Map<string, TFile>();

		for (const file of files) {

			const cache =
				this.plugin.app.metadataCache.getFileCache(file);

			const id = cache?.frontmatter?.id;

			if (id) {

				map.set(String(id), file);

			}

		}

		return this.session.todaysPlan
			.map(id => map.get(id))
			.filter(
				(file): file is TFile => file !== undefined
			);

	}

	startNewSession(
		date: string,
		roadmapIndex: number,
		problems: string[],
		carryOver: string[]
	): void {

		this.session = {

			date,

			roadmapIndex,

			dailyTarget: this.session.dailyTarget,

			todaysPlan: [...problems],

			carryOver: [...carryOver],

		};

	}

}